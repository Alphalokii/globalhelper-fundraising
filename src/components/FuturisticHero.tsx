import React, { useState, useEffect } from 'react';

const FuturisticHero: React.FC = () => {
  const [donationCount, setDonationCount] = useState(0);
  const [livesSaved, setLivesSaved] = useState(0);
  const [recentDonor, setRecentDonor] = useState({ name: 'Anonymous', amount: 0, time: 'Just now' });

  // Simulate live donation counter - someone donates every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDonationCount(prev => prev + Math.floor(Math.random() * 100) + 10);
      setLivesSaved(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Simulate recent donations - every 27 seconds
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
    }, 27000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Futuristic Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-white font-semibold tracking-wide">LIVE IMPACT TRACKING</span>
          </div>

          {/* Powerful Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Every 45 Seconds,
            </span>
            <span className="block bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              A Life is Saved
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Powered by AI-driven humanitarian intelligence. Your donation creates real-time impact.
          </p>

          {/* Futuristic Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  ${donationCount.toLocaleString()}
                </div>
                <div className="text-gray-400 text-lg tracking-wide">DONATED TODAY</div>
                <div className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm">
                  <span className="animate-pulse">●</span>
                  <span>Live Updates</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  {livesSaved.toLocaleString()}
                </div>
                <div className="text-gray-400 text-lg tracking-wide">LIVES SAVED</div>
                <div className="mt-4 text-purple-400 text-sm">This Week</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  50,847
                </div>
                <div className="text-gray-400 text-lg tracking-wide">GLOBAL DONORS</div>
                <div className="mt-4 text-cyan-400 text-sm">Active Now</div>
              </div>
            </div>
          </div>

          {/* Recent Donation Live Feed */}
          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-center gap-3 text-white">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-lg font-light">
                  <strong className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {recentDonor.name}
                  </strong>{' '}
                  just donated{' '}
                  <strong className="text-green-400">${recentDonor.amount}</strong> • {recentDonor.time}
                </span>
              </div>
            </div>
          </div>

          {/* Impact Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition">
                <div className="text-4xl mb-3">🍞</div>
                <div className="text-white font-bold text-2xl mb-2">$25</div>
                <div className="text-gray-400 text-sm">= 1 Week of Food</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition">
                <div className="text-4xl mb-3">💊</div>
                <div className="text-white font-bold text-2xl mb-2">$50</div>
                <div className="text-gray-400 text-sm">= Medical Supplies (5)</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition">
                <div className="text-4xl mb-3">🏠</div>
                <div className="text-white font-bold text-2xl mb-2">$100</div>
                <div className="text-gray-400 text-sm">= Shelter (2 Families)</div>
              </div>
            </div>
          </div>

          {/* Futuristic CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="/donate"
              className="group relative px-12 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-xl rounded-2xl hover:from-red-700 hover:to-pink-700 transition transform hover:scale-105 shadow-2xl"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></span>
              <span className="relative flex items-center gap-3">
                <span className="animate-pulse">🚨</span>
                SAVE A LIFE NOW
              </span>
            </a>
            <a
              href="/humanitarian-crises"
              className="group relative px-12 py-5 bg-slate-900/80 backdrop-blur-xl text-white font-bold text-xl rounded-2xl border border-white/20 hover:border-white/40 transition transform hover:scale-105"
            >
              <span className="relative flex items-center gap-3">
                <span>📋</span>
                VIEW CRISES
              </span>
            </a>
          </div>

          {/* Futuristic Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition"></div>
                <svg className="relative w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 1.657 3.343 3 5v6c0 1.657 3.343 3 5v6l9-4 9-4V5c0-1.657-3.343-3-5-3zm-1 8.5L7.5 16.5 5 14V6l6 2.5z"/>
                </svg>
              </div>
              <span className="font-semibold group-hover:text-white transition">UN Verified</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-60 transition"></div>
                <svg className="relative w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2l4-4m-6 4l-4-4m14-8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"/>
                </svg>
              </div>
              <span className="font-semibold group-hover:text-white transition">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition"></div>
                <svg className="relative w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="font-semibold group-hover:text-white transition">Bank-Level Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40C120 20 240 60 360 40C480 20 600 60 720 40C840 20 960 60 1080 40C1200 20 1320 60 1440 40V120H0V40Z" fill="rgba(255,255,255,0.05)"/>
        </svg>
      </div>
    </div>
  );
};

export default FuturisticHero;
