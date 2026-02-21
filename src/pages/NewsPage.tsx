import React from 'react';
import Navigation from '../components/Navigation';
import NewsSection from '../components/NewsSection';

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <NewsSection 
        title="All News & Updates"
        showAll={true}
      />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About GlobalHelper</h3>
              <p className="text-gray-300">
                Connecting donors with causes that matter most through innovative cryptocurrency fundraising.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/campaigns" className="text-gray-300 hover:text-white transition-colors">Campaigns</a></li>
                <li><a href="/donate" className="text-gray-300 hover:text-white transition-colors">Donate</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><button type="button" className="text-gray-300 hover:text-white transition-colors text-left">Humanitarian</button></li>
                <li><button type="button" className="text-gray-300 hover:text-white transition-colors text-left">Education</button></li>
                <li><button type="button" className="text-gray-300 hover:text-white transition-colors text-left">Healthcare</button></li>
                <li><button type="button" className="text-gray-300 hover:text-white transition-colors text-left">Environment</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: info@globalhelper.org</li>
                <li>Phone: +1-555-GLOBAL</li>
                <li>Hours: 24/7 Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 GlobalHelper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
