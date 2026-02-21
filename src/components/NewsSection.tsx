import React, { useState } from 'react';
import NewsCard from './NewsCard';

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

interface NewsSectionProps {
  title?: string;
  showAll?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title = "Latest News & Updates", showAll = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  // Sample news data - in real app, this would come from API/database
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'GlobalHelper Launches Major Sudan Relief Campaign',
      summary: 'In response to the ongoing humanitarian crisis in Sudan, GlobalHelper has announced an emergency fundraising campaign to provide critical aid to displaced families.',
      content: 'GlobalHelper is launching an urgent campaign to support millions affected by the Sudan conflict. The campaign aims to provide food, medical supplies, and shelter to internally displaced persons. Crypto donations are being accepted in Bitcoin and USDT to ensure immediate fund transfer.',
      category: 'humanitarian',
      date: '2026-02-21',
      author: 'GlobalHelper Team',
      imageUrl: '/sudan war images/AFP__20251103__82WB4CQ__v3__HighRes__TopshotSudanConflictRefugees-1762447780.jpg'
    },
    {
      id: '2',
      title: 'Bitcoin Donations Surge 150% in Q1 2026',
      summary: 'Cryptocurrency donations to humanitarian causes have seen unprecedented growth, with Bitcoin leading the way in transparent, cross-border aid delivery.',
      content: 'The first quarter of 2026 has witnessed a remarkable 150% increase in cryptocurrency donations to humanitarian causes globally. Bitcoin transactions have proven particularly effective for international aid, eliminating traditional banking delays and ensuring funds reach beneficiaries quickly.',
      category: 'crypto',
      date: '2026-02-20',
      author: 'Crypto News Desk',
      imageUrl: '/Clean water/160_UNI135099.webp'
    },
    {
      id: '3',
      title: 'Clean Water Project Reaches 50,000 People milestone',
      summary: 'Our flagship clean water initiative has successfully provided clean drinking water to over 50,000 people across 5 countries in just 6 months.',
      content: 'The GlobalHelper Clean Water Initiative has achieved a significant milestone, bringing sustainable clean water solutions to communities in need. The project combines modern filtration technology with local training to ensure long-term success.',
      category: 'campaign',
      date: '2026-02-19',
      author: 'Impact Team',
      imageUrl: '/Clean water/June-15-2011_2011_GR_Photos.jpg'
    },
    {
      id: '4',
      title: 'Urgent: Gaza Medical Aid Needed',
      summary: 'Critical medical supplies are urgently needed in Gaza as healthcare facilities struggle to meet overwhelming demand.',
      content: 'Healthcare facilities in Gaza are facing critical shortages of medical supplies and equipment. GlobalHelper is coordinating with international partners to deliver emergency medical aid through our crypto-powered donation platform.',
      category: 'urgent',
      date: '2026-02-18',
      author: 'Emergency Response',
      imageUrl: '/gaza war images/'
    },
    {
      id: '5',
      title: 'Global Fundraising Platform Wins Innovation Award',
      summary: 'GlobalHelper recognized for revolutionizing cross-border charitable giving through cryptocurrency integration and transparent fund tracking.',
      content: 'GlobalHelper has been honored with the 2026 Global Innovation Award for its groundbreaking approach to international fundraising. The platform\'s use of cryptocurrency for instant, transparent donations has set new standards in the humanitarian sector.',
      category: 'global',
      date: '2026-02-17',
      author: 'Awards Committee',
      imageUrl: '/logo/GlobalHelper_logo.png'
    }
  ]);

  const categories = ['all', 'humanitarian', 'crypto', 'campaign', 'urgent', 'global'];
  
  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(news => news.category === selectedCategory);

  const handleReadMore = (newsId: string) => {
    setExpandedNews(expandedNews === newsId ? null : newsId);
  };

  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 3);

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
                        Published on {new Date(news.date).toLocaleDateString()} by {news.author}
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
