/**
 * Dynamic Crisis Image Component
 * Fetches real humanitarian crisis images from multiple sources
 * Falls back to cached images if APIs fail
 */

import React, { useState, useEffect } from 'react';
import { imageService, CrisisImageQuery } from '../services/imageService';

interface DynamicCrisisImageProps {
  crisisId: string;
  crisis: string;
  location: string;
  category: string;
  keywords: string[];
  alt: string;
  className?: string;
}

const DynamicCrisisImage: React.FC<DynamicCrisisImageProps> = ({
  crisisId,
  crisis,
  location,
  category,
  keywords,
  alt,
  className = ''
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSource, setImageSource] = useState<string>('');
  const [imageCredit, setImageCredit] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      setError(false);

      // Try to fetch dynamic images
      const query: CrisisImageQuery = {
        crisis,
        location,
        category,
        keywords
      };

      try {
        const images = await imageService.fetchCrisisImages(query);

        if (images.length > 0) {
          // Use first image from API
          setImageUrl(images[0].url);
          setImageSource(images[0].source);
          setImageCredit(images[0].credit);
        } else {
          // Fall back to cached image
          const cachedImage = imageService.getCachedImage(crisisId);
          if (cachedImage) {
            setImageUrl(cachedImage);
            setImageSource('Cached');
            setImageCredit('Local storage');
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error('Error fetching crisis image:', err);
        // Fall back to cached image
        const cachedImage = imageService.getCachedImage(crisisId);
        if (cachedImage) {
          setImageUrl(cachedImage);
          setImageSource('Cached');
          setImageCredit('Local storage');
        } else {
          setError(true);
        }
      }

      setLoading(false);
    };

    fetchImage();
  }, [crisisId, crisis, location, category, keywords]);

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Loading image...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-gray-300 ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-500">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onError={() => {
          // If image fails to load, try cached version
          const cachedImage = imageService.getCachedImage(crisisId);
          if (cachedImage) {
            setImageUrl(cachedImage);
            setImageSource('Cached');
            setImageCredit('Local storage');
          } else {
            setError(true);
          }
        }}
      />
      {imageSource && imageSource !== 'Cached' && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
          <span className="font-semibold">{imageSource}</span>
          {imageCredit && <span className="ml-2">• {imageCredit}</span>}
        </div>
      )}
    </div>
  );
};

export default DynamicCrisisImage;
