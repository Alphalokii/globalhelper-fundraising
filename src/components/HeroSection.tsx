import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/logo/background image/grok_image_1771510542443.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block">Make a Difference</span>
            <span className="block text-yellow-300">Today</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Join thousands of donors supporting life-changing causes around the world
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <div className="text-4xl font-bold text-white mb-2">$2.5M+</div>
              <div className="text-white text-opacity-90">Funds Raised</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <div className="text-4xl font-bold text-white mb-2">15,000+</div>
              <div className="text-white text-opacity-90">Active Campaigns</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white text-opacity-90">Global Donors</div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/donate"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
            >
              🚀 Start Donating
            </a>
            <a
              href="/campaigns"
              className="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-opacity-30 transition border border-white border-opacity-30"
            >
              📋 Browse Campaigns
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white text-opacity-80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3zm-1 8.5L7.5 16.5 5 14V6l6 2.5z"/>
              </svg>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2l4-4m-6 4l-4-4m14-8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"/>
              </svg>
              <span>Global Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2l4-4m-6 4l-4-4m14-8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"/>
              </svg>
              <span>100% Transparent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40C120 20 240 60 360 40C480 20 600 60 720 40C840 20 960 60 1080 40C1200 20 1320 60 1440 40V120H0V40Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
