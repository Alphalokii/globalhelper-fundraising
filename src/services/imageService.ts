/**
 * Image Service for fetching real humanitarian crisis images
 * Integrates with multiple sources: Unsplash, Pexels, Pixabay
 * Premium sources (Reuters, AP, Getty) can be added with proper licensing
 */

// API Keys (add your keys in .env file)
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || '';
const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY || '';
const PIXABAY_API_KEY = process.env.REACT_APP_PIXABAY_API_KEY || '';

export interface ImageSource {
  source: string;
  url: string;
  credit: string;
  description?: string;
}

export interface CrisisImageQuery {
  crisis: string;
  location: string;
  category: string;
  keywords: string[];
}

class ImageService {
  private unsplashBaseUrl = 'https://api.unsplash.com';
  private pexelsBaseUrl = 'https://api.pexels.com/v1';
  private pixabayBaseUrl = 'https://pixabay.com/api';

  /**
   * Fetch images from Unsplash (Free tier available)
   */
  async fetchFromUnsplash(query: string, perPage: number = 10): Promise<ImageSource[]> {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn('Unsplash API key not configured');
      return [];
    }

    try {
      const response = await fetch(
        `${this.unsplashBaseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        }
      );

      const data = await response.json();

      return data.results.map((photo: any) => ({
        source: 'Unsplash',
        url: photo.urls.regular,
        credit: `Photo by ${photo.user.name}`,
        description: photo.description || photo.alt_description
      }));
    } catch (error) {
      console.error('Unsplash API error:', error);
      return [];
    }
  }

  /**
   * Fetch images from Pexels (Free tier available)
   */
  async fetchFromPexels(query: string, perPage: number = 10): Promise<ImageSource[]> {
    if (!PEXELS_API_KEY) {
      console.warn('Pexels API key not configured');
      return [];
    }

    try {
      const response = await fetch(
        `${this.pexelsBaseUrl}/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
        {
          headers: {
            'Authorization': PEXELS_API_KEY
          }
        }
      );

      const data = await response.json();

      return data.photos.map((photo: any) => ({
        source: 'Pexels',
        url: photo.src.large,
        credit: `Photo by ${photo.photographer}`,
        description: photo.alt
      }));
    } catch (error) {
      console.error('Pexels API error:', error);
      return [];
    }
  }

  /**
   * Fetch images from Pixabay (Free tier available)
   */
  async fetchFromPixabay(query: string, perPage: number = 10): Promise<ImageSource[]> {
    if (!PIXABAY_API_KEY) {
      console.warn('Pixabay API key not configured');
      return [];
    }

    try {
      const response = await fetch(
        `${this.pixabayBaseUrl}/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}`
      );

      const data = await response.json();

      return data.hits.map((photo: any) => ({
        source: 'Pixabay',
        url: photo.largeImageURL,
        credit: `Photo by ${photo.user}`,
        description: photo.tags
      }));
    } catch (error) {
      console.error('Pixabay API error:', error);
      return [];
    }
  }

  /**
   * Fetch from Reuters (Commercial - requires license)
   * This is a placeholder for future implementation with proper licensing
   */
  async fetchFromReuters(_query: string): Promise<ImageSource[]> {
    console.warn('Reuters API requires commercial license - not implemented');
    // Future implementation with proper Reuters API integration
    return [];
  }

  /**
   * Fetch from AP Images (Commercial - requires license)
   * This is a placeholder for future implementation with proper licensing
   */
  async fetchFromAP(_query: string): Promise<ImageSource[]> {
    console.warn('AP Images API requires commercial license - not implemented');
    // Future implementation with proper AP Images API integration
    return [];
  }

  /**
   * Main method to fetch crisis images from multiple sources
   * Tries free sources first, then falls back to cached images
   */
  async fetchCrisisImages(crisisQuery: CrisisImageQuery): Promise<ImageSource[]> {
    const { crisis, location, category, keywords } = crisisQuery;

    // Build search query
    const searchTerms = [
      crisis,
      location,
      category,
      ...keywords
    ].join(' ');

    // Try all free sources in parallel
    const [unsplashImages, pexelsImages, pixabayImages] = await Promise.all([
      this.fetchFromUnsplash(searchTerms, 5),
      this.fetchFromPexels(searchTerms, 5),
      this.fetchFromPixabay(searchTerms, 5)
    ]);

    // Combine and deduplicate results
    const allImages = [
      ...unsplashImages,
      ...pexelsImages,
      ...pixabayImages
    ];

    // Remove duplicates based on URL
    const uniqueImages = this.deduplicateImages(allImages);

    return uniqueImages.slice(0, 10); // Return top 10 images
  }

  /**
   * Remove duplicate images based on URL
   */
  private deduplicateImages(images: ImageSource[]): ImageSource[] {
    const seen = new Set();
    return images.filter(image => {
      if (seen.has(image.url)) {
        return false;
      }
      seen.add(image.url);
      return true;
    });
  }

  /**
   * Get cached image for a crisis (fallback if APIs fail)
   */
  getCachedImage(crisisId: string): string | null {
    const cachedImages: Record<string, string> = {
      'sudan-crisis': '/sudan war images/AFP__20251103__82WB4CQ__v3__HighRes__TopshotSudanConflictRefugees-1762447780.jpg',
      'palestine-crisis': '/palestine/gettyimages-2225332050-612x612.jpg',
      'iran-israel-crisis': '/iran/gettyimages-2263875882-612x612.jpg',
      'lebanon-crisis': '/lebanon/gettyimages-2241116757-612x612.jpg',
      'israel-crisis': '/israel/gettyimages-2229695065-612x612.jpg',
      'ukraine-crisis': '/ukraine war images/1000 days of Russia war on Ukraine 05.jpg'
    };

    return cachedImages[crisisId] || null;
  }
}

export const imageService = new ImageService();
