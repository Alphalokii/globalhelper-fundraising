import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import newsService from '../services/newsService';

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

interface NewsSectionProps {
  title?: string;
  showAll?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title = "Latest News & Updates", showAll = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  const [newsItems, _setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        
        switch (selectedCategory) {
          case 'crypto':
            response = await newsService.getCryptoNews(1, showAll ? 20 : 6);
            break;
          case 'global':
            response = await newsService.getGlobalImpactNews(1, showAll ? 20 : 6);
            break;
          case 'humanitarian':
          case 'urgent':
          case 'campaign':
            response = await newsService.getHumanitarianNews(1, showAll ? 20 : 6);
            break;
          default:
            response = await newsService.getHumanitarianNews(1, showAll ? 20 : 6);
            break;
        }
        
        if (response.status === 'ok') {
          // Transform NewsArticle to NewsItem format
          const transformedItems = response.articles.map(article => ({
            id: article.id,
            title: article.title,
            description: article.description,
            content: article.content,
            url: article.url,
            imageUrl: article.imageUrl,
            publishedAt: article.publishedAt,
            source: article.source,
            author: article.author,
            category: article.category,
            summary: article.description, // Use description as summary
            date: article.publishedAt // Use publishedAt as date
          }));
          _setNewsItems(transformedItems);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, showAll]);

  const categories = ['all', 'humanitarian', 'crypto', 'campaign', 'urgent', 'global'];
  
  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(news => news.category === selectedCategory);

  const handleReadMore = (newsId: string) => {
    setExpandedNews(expandedNews === newsId ? null : newsId);
  };

  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 3);

  // Loading state
  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Loading latest news from trusted sources...
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load News
              </h3>
              <p className="text-red-600 mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, campaigns, and impact stories from around the world.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category === 'all' ? 'All News' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map(news => (
            <div key={news.id}>
              <NewsCard 
                news={news} 
                onReadMore={handleReadMore}
              />
              
              {/* Expanded Content */}
              {expandedNews === news.id && (
                <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {news.content}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Published on {new Date(news.publishedAt).toLocaleDateString()} by {news.author}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && newsItems.length > 3 && (
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              View All News ({newsItems.length} articles)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
