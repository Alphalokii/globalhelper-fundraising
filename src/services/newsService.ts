import axios from 'axios';

// NewsAPI.org configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo_key_fallback';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Humanitarian and global development related news sources
const HUMANITARIAN_SOURCES = [
  'bbc-news',
  'cnn',
  'reuters',
  'the-guardian-uk',
  'associated-press',
  'al-jazeera-english',
  'nbc-news',
  'abc-news',
  'cbs-news',
  'fox-news'
];

// Keywords for humanitarian and global impact news
const HUMANITARIAN_KEYWORDS = [
  'humanitarian',
  'disaster',
  'relief',
  'refugee',
  'crisis',
  'emergency',
  'fundraising',
  'donation',
  'charity',
  'global development',
  'climate change',
  'poverty',
  'healthcare',
  'education',
  'water',
  'food security',
  'conflict',
  'war',
  'peace',
  'sustainability',
  'aid'
];

// News Article interface for API responses
interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: {
    name: string;
    id: string;
  };
  author: string;
  category: string;
  summary: string;
  date: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}

class NewsService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = NEWS_API_KEY;
    this.baseUrl = NEWS_API_BASE_URL;
  }

  // Get humanitarian news from multiple sources
  async getHumanitarianNews(page: number = 1, pageSize: number = 20): Promise<NewsResponse> {
    console.log('Fetching real news with API key:', NEWS_API_KEY ? 'YES' : 'NO');
    
    // Check if we have a real API key
    if (!NEWS_API_KEY || NEWS_API_KEY === 'demo_key_fallback') {
      console.log('Using demo news - get API key from NewsAPI.org');
      return this.getFallbackNews();
    }

    try {
      // First try to get news from humanitarian sources
      const response = await axios.get(`${this.baseUrl}/top-headlines`, {
        params: {
          apiKey: this.apiKey,
          sources: HUMANITARIAN_SOURCES.join(','),
          page: page,
          pageSize: pageSize,
          category: 'general'
        }
      });

      console.log('NewsAPI response status:', response.status);
      console.log('Articles received:', response.data.articles?.length || 0);

      // Filter articles for humanitarian relevance
      const filteredArticles = this.filterHumanitarianArticles(response.data.articles);
      
      return {
        status: 'ok',
        totalResults: filteredArticles.length,
        articles: filteredArticles
      };
    } catch (error: any) {
      console.error('Error fetching humanitarian news:', error);
      
      // Check if it's an API key issue
      if (error.response?.status === 400) {
        console.log('API Key issue or rate limiting - using fallback news');
        return this.getFallbackNews();
      }
      
      // Fallback to general news with humanitarian keywords
      return this.getHumanitarianNewsByKeywords(page, pageSize);
    }
  }

  // Get news by humanitarian keywords
  async getHumanitarianNewsByKeywords(page: number = 1, pageSize: number = 20): Promise<NewsResponse> {
    try {
      const keywordString = HUMANITARIAN_KEYWORDS.join(' OR ');
      
      const response = await axios.get(`${this.baseUrl}/everything`, {
        params: {
          apiKey: this.apiKey,
          q: keywordString,
          page: page,
          pageSize: pageSize,
          sortBy: 'publishedAt',
          language: 'en'
        }
      });

      return {
        ...response.data,
        articles: this.transformArticles(response.data.articles)
      };
    } catch (error) {
      console.error('Error fetching news by keywords:', error);
      return this.getFallbackNews();
    }
  }

  // Get crypto news for fundraising platform
  async getCryptoNews(page: number = 1, pageSize: number = 10): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/everything`, {
        params: {
          apiKey: this.apiKey,
          q: 'cryptocurrency OR bitcoin OR ethereum OR blockchain OR crypto donation',
          page: page,
          pageSize: pageSize,
          sortBy: 'publishedAt',
          language: 'en',
          domains: 'coindesk.com,cointelegraph.com,decrypt.co,bitcoin.com'
        }
      });

      return {
        ...response.data,
        articles: this.transformArticles(response.data.articles)
      };
    } catch (error) {
      console.error('Error fetching crypto news:', error);
      return {
        status: 'ok',
        totalResults: 0,
        articles: []
      };
    }
  }

  // Get global impact news
  async getGlobalImpactNews(page: number = 1, pageSize: number = 15): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/everything`, {
        params: {
          apiKey: this.apiKey,
          q: 'global impact OR sustainable development OR climate action OR renewable energy OR clean water',
          page: page,
          pageSize: pageSize,
          sortBy: 'publishedAt',
          language: 'en'
        }
      });

      return {
        ...response.data,
        articles: this.transformArticles(response.data.articles)
      };
    } catch (error) {
      console.error('Error fetching global impact news:', error);
      return {
        status: 'ok',
        totalResults: 0,
        articles: []
      };
    }
  }

  // Filter articles for humanitarian relevance
  private filterHumanitarianArticles(articles: any[]): NewsItem[] {
    return articles.filter(article => {
      const title = (article.title || '').toLowerCase();
      const description = (article.description || '').toLowerCase();
      const content = (article.content || '').toLowerCase();
      
      const combinedText = `${title} ${description} ${content}`;
      
      return HUMANITARIAN_KEYWORDS.some(keyword => 
        combinedText.includes(keyword.toLowerCase())
      );
    }).map(article => this.transformArticle(article));
  }

  // Transform single article
  private transformArticle(article: any): NewsItem {
    return {
      id: article.url || Math.random().toString(36).substr(2, 9),
      title: article.title || 'No title available',
      description: article.description || article.title || 'No description available',
      content: article.content || article.description || 'No content available',
      url: article.url || '#',
      imageUrl: article.urlToImage || '/Clean water/160_UNI135099.webp',
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        name: article.source?.name || 'Unknown Source',
        id: article.source?.id || 'unknown'
      },
      author: article.author || 'Unknown Author',
      category: this.categorizeArticle(article),
      summary: article.description || article.title || 'No description available',
      date: article.publishedAt || new Date().toISOString()
    };
  }

  // Transform multiple articles
  private transformArticles(articles: any[]): NewsItem[] {
    return articles.map(article => this.transformArticle(article));
  }

  // Categorize article based on content
  private categorizeArticle(article: any): string {
    const title = (article.title || '').toLowerCase();
    const description = (article.description || '').toLowerCase();
    const content = (article.content || '').toLowerCase();
    const combinedText = `${title} ${description} ${content}`;

    if (combinedText.includes('crypto') || combinedText.includes('bitcoin') || combinedText.includes('blockchain')) {
      return 'crypto';
    } else if (combinedText.includes('disaster') || combinedText.includes('crisis') || combinedText.includes('emergency')) {
      return 'urgent';
    } else if (combinedText.includes('campaign') || combinedText.includes('fundraising') || combinedText.includes('donation')) {
      return 'campaign';
    } else if (combinedText.includes('global') || combinedText.includes('climate') || combinedText.includes('sustainability')) {
      return 'global';
    } else {
      return 'humanitarian';
    }
  }

  // Fallback news when API fails or no API key
  private getFallbackNews(): NewsResponse {
    const fallbackArticles: NewsItem[] = [
      {
        id: 'fallback-1',
        title: 'Iran-Israel War Escalates - Regional Crisis Deepens',
        description: 'Day 20 of conflict sees Iran retaliate with strikes on Israel and Qatar after Israel attacks key Iranian gas facility.',
        content: 'The Iran-Israel conflict has entered its 20th day with escalating tensions. Israel struck the South Pars gas field, prompting Iranian retaliation against energy infrastructure in Israel and Qatar. Oil prices surged to $115 per barrel before retreating. The UN is negotiating a humanitarian corridor through the Strait of Hormuz as 18,000+ civilians have been injured in ongoing strikes.',
        url: '/news',
        imageUrl: '/iran/gettyimages-2263875882-612x612.jpg',
        publishedAt: new Date().toISOString(),
        source: {
          name: 'GlobalHelper News',
          id: 'globalhelper'
        },
        author: 'GlobalHelper Team',
        category: 'urgent',
        summary: 'Iran-Israel conflict escalates with 18,000+ civilian casualties and global energy disruption.',
        date: new Date().toISOString()
      },
      {
        id: 'fallback-2',
        title: 'GlobalHelper Platform Continues to Make Impact',
        description: 'Our fundraising platform continues to connect donors with important causes worldwide.',
        content: 'GlobalHelper remains committed to facilitating meaningful connections between generous donors and critical humanitarian causes around the world.',
        url: '/news',
        imageUrl: '/Clean water/160_UNI135099.webp',
        publishedAt: new Date().toISOString(),
        source: {
          name: 'GlobalHelper',
          id: 'globalhelper'
        },
        author: 'GlobalHelper Team',
        category: 'campaign',
        summary: 'Our fundraising platform continues to connect donors with important causes worldwide.',
        date: new Date().toISOString()
      },
      {
        id: 'fallback-3',
        title: 'Bitcoin Donations Surge in 2026',
        description: 'Cryptocurrency donations to humanitarian causes have seen unprecedented growth this year.',
        content: 'The first quarter of 2026 has witnessed a remarkable increase in cryptocurrency donations to humanitarian causes globally. Bitcoin transactions have proven particularly effective for international aid.',
        url: '/news',
        imageUrl: '/Clean water/160_UNI135099.webp',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: {
          name: 'GlobalHelper',
          id: 'globalhelper'
        },
        author: 'Crypto News Desk',
        category: 'crypto',
        summary: 'Cryptocurrency donations to humanitarian causes have seen unprecedented growth this year.',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'fallback-3',
        title: 'Clean Water Project Reaches Milestone',
        description: 'Our flagship clean water initiative has successfully provided clean drinking water to thousands.',
        content: 'The GlobalHelper Clean Water Initiative has achieved a significant milestone, bringing sustainable clean water solutions to communities in need.',
        url: '/news',
        imageUrl: '/Clean water/June-15-2011_2011_GR_Photos.jpg',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: {
          name: 'GlobalHelper',
          id: 'globalhelper'
        },
        author: 'Impact Team',
        category: 'campaign',
        summary: 'Our flagship clean water initiative has successfully provided clean drinking water to thousands.',
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    return {
      status: 'ok',
      totalResults: fallbackArticles.length,
      articles: fallbackArticles
    };
  }
}

const newsServiceInstance = new NewsService();
export default newsServiceInstance;
