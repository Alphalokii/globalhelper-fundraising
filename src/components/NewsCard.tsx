import React from 'react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl?: string;
}

interface NewsCardProps {
  news: NewsItem;
  onReadMore: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onReadMore }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'humanitarian': 'bg-red-100 text-red-800',
      'crypto': 'bg-blue-100 text-blue-800',
      'global': 'bg-green-100 text-green-800',
      'campaign': 'bg-purple-100 text-purple-800',
      'urgent': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {news.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
            {news.category.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(news.date).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {news.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {news.author}
          </span>
          
          <button
            onClick={() => onReadMore(news.id)}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
