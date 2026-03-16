import React from 'react';
import Navigation from '../components/Navigation';
import NewsSection from '../components/NewsSection';
import AINewsInsights from '../components/AINewsInsights';
import GlobalAIInsights from '../components/GlobalAIInsights';

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="news" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Latest News & Updates
        </h1>
        
        {/* GlobalAI Nexus Intelligence Section */}
        <GlobalAIInsights />
        
        {/* Grok AI Insights Section */}
        <AINewsInsights />
        
        {/* Regular News Section */}
        <NewsSection />
      </div>
      
      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            2026 GlobalHelper. All rights reserved. Powered by GlobalAI Nexus Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
