import React, { useState, useEffect } from 'react';

const RevolutionaryHero: React.FC = () => {
  const [donationCount, setDonationCount] = useState(0);
  const [livesSaved, setLivesSaved] = useState(0);
  const [recentDonor, setRecentDonor] = useState({ name: 'Anonymous', amount: 0, time: 'Just now' });

  // Simulate live donation counter - someone donates every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDonationCount(prev => prev + Math.floor(Math.random() * 100) + 10);
      setLivesSaved(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // Simulate recent donations - every 9 seconds
  useEffect(() => {
    const donors = [
      { name: 'Sarah M.', amount: 50 },
      { name: 'John D.', amount: 100 },
      { name: 'Maria L.', amount: 25 },
      { name: 'Ahmed K.', amount: 75 },
      { name: 'Emma R.', amount: 150 },
      { name: 'David Chen', amount: 200 },
      { name: 'Priya S.', amount: 75 },
      { name: 'Michael B.', amount: 125 }
    ];

    const interval = setInterval(() => {
      const randomDonor = donors[Math.floor(Math.random() * donors.length)];
      setRecentDonor({
        name: randomDonor.name,
        amount: randomDonor.amount,
        time: 'Just now'
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/logo/background image/grok_image_1771510542443.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Powerful Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Every 60 Seconds,</span>
            <span className="block text-red-500">A Child Dies</span>
            <span className="block text-yellow-400">From Preventable Causes</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            You can stop this. Right now. Your donation saves lives today.
          </p>

          {/* Live Donation Counter */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white border-opacity-30 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  ${donationCount.toLocaleString()}
                </div>
                <div className="text-white text-opacity-90 text-lg">Donated Today</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {livesSaved.toLocaleString()}
                </div>
                <div className="text-white text-opacity-90 text-lg">Lives Saved This Week</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">
                  50,847
                </div>
                <div className="text-white text-opacity-90 text-lg">Active Donors</div>
              </div>
            </div>

            {/* Recent Donation Live Feed */}
            <div className="mt-6 pt-6 border-t border-white border-opacity-30">
              <div className="flex items-center justify-center gap-2 text-white">
                <span className="animate-pulse">🔴</span>
                <span className="text-lg">
                  <strong>{recentDonor.name}</strong> just donated ${recentDonor.amount} • {recentDonor.time}
                </span>
              </div>
            </div>
          </div>

          {/* Impact Visualization */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white border-opacity-30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Your Impact Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <div className="text-3xl mb-2">🍞</div>
                <div className="text-white font-bold text-xl mb-1">$25</div>
                <div className="text-white text-opacity-80">= 1 Week of Food for a Family</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <div className="text-3xl mb-2">💊</div>
                <div className="text-white font-bold text-xl mb-1">$50</div>
                <div className="text-white text-opacity-80">= Medical Supplies for 5 Children</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <div className="text-3xl mb-2">🏠</div>
                <div className="text-white font-bold text-xl mb-1">$100</div>
                <div className="text-white text-opacity-80">= Emergency Shelter for 2 Families</div>
              </div>
            </div>
          </div>

          {/* Urgent CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/donate"
              className="px-12 py-5 bg-red-600 text-white font-bold text-xl rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-2xl animate-pulse"
            >
              🚨 SAVE A LIFE NOW
            </a>
            <a
              href="/humanitarian-crises"
              className="px-12 py-5 bg-white bg-opacity-20 backdrop-blur-sm text-white font-bold text-xl rounded-xl hover:bg-opacity-30 transition border-2 border-white border-opacity-50"
            >
              📋 VIEW URGENT CRISES
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white text-opacity-80">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3zm-1 8.5L7.5 16.5 5 14V6l6 2.5z"/>
              </svg>
              <span className="font-semibold">UN Verified Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2l4-4m-6 4l-4-4m14-8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"/>
              </svg>
              <span className="font-semibold">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="font-semibold">Bank-Level Security</span>
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

export default RevolutionaryHero;
