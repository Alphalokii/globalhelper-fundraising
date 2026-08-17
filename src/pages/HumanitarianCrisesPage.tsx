import React, { useState } from 'react';

const HumanitarianCrisesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [_donationAmount, _setDonationAmount] = useState('');

  const crises = [
    // Sudan Civil War
    {
      id: 'sudan-crisis',
      title: 'Sudan Civil War Emergency',
      category: 'sudan',
      image: '/sudan war images/AFP__20251103__82WB4CQ__v3__HighRes__TopshotSudanConflictRefugees-1762447780.jpg',
      description: 'Millions displaced as conflict rages across Sudan. Families need urgent food, shelter, and medical care.',
      raised: 125000,
      goal: 500000,
      donors: 3421,
      urgency: 'critical',
      location: 'Sudan',
      beneficiaries: '2.5M+ displaced civilians',
      dateStarted: 'April 2023',
      tags: ['Emergency Relief', 'Food Security', 'Shelter', 'Medical Aid'],
      updates: [
        { date: '2024-02-15', title: 'Emergency Food Distribution in Darfur', content: 'Reached 50,000 families with essential food supplies.' },
        { date: '2024-02-10', title: 'Mobile Clinics Operational', content: '3 new medical clinics serving displaced communities.' },
        { date: '2024-02-05', title: 'Shelter Camp Expansion', content: 'Added capacity for 10,000 more displaced families.' }
      ]
    },
    // Palestine/Gaza Conflict
    {
      id: 'palestine-crisis',
      title: 'Palestine & Gaza Humanitarian Crisis',
      category: 'palestine',
      image: '/palestine/gettyimages-2225332050-612x612.jpg',
      description: 'Civilians in Gaza face catastrophic conditions. Urgent need for food, water, medical supplies, and shelter.',
      raised: 890000,
      goal: 2000000,
      donors: 12567,
      urgency: 'critical',
      location: 'Gaza Strip & West Bank',
      beneficiaries: '2.3M+ affected civilians',
      dateStarted: 'October 2023',
      tags: ['Emergency Relief', 'Medical Emergency', 'Food Crisis', 'Water Security', 'Shelter'],
      updates: [
        { date: '2024-02-18', title: 'Emergency Medical Supplies Delivered', content: 'Critical medical equipment and supplies reached hospitals in Gaza.' },
        { date: '2024-02-14', title: 'Clean Water Initiative', content: 'Providing clean drinking water to 100,000+ displaced families.' },
        { date: '2024-02-10', title: 'Food Distribution Centers', content: '12 new distribution centers serving hot meals daily.' },
        { date: '2024-02-08', title: 'Temporary Shelter Program', content: 'Emergency shelters housing 25,000+ displaced civilians.' }
      ]
    },
    // Iran-Israel War Crisis
    {
      id: 'iran-israel-crisis',
      title: 'Iran-Israel War Emergency',
      category: 'iran',
      image: '/iran/gettyimages-2263875882-612x612.jpg',
      description: 'Escalating conflict between Iran and Israel threatens regional stability. Critical need for civilian protection, medical aid, and emergency relief.',
      raised: 450000,
      goal: 1500000,
      donors: 8934,
      urgency: 'critical',
      location: 'Iran, Israel, Middle East',
      beneficiaries: '18,000+ injured civilians, millions at risk',
      dateStarted: 'March 2026',
      tags: ['War Emergency', 'Medical Crisis', 'Regional Conflict', 'Civilian Protection', 'Energy Security'],
      updates: [
        { date: '2026-03-21', title: 'Emergency Medical Response', content: 'Field hospitals established to treat 18,000+ injured civilians.' },
        { date: '2026-03-20', title: 'Strait of Hormuz Humanitarian Corridor', content: 'UN negotiating safe passage for civilian vessels and aid shipments.' },
        { date: '2026-03-19', title: 'Energy Infrastructure Protection', content: 'Emergency teams working to protect civilian energy facilities from attacks.' },
        { date: '2026-03-18', title: 'Refugee Camp Preparation', content: 'Setting up emergency shelters for displaced families in border regions.' }
      ]
    },
    // Lebanon Crisis
    {
      id: 'lebanon-crisis',
      title: 'Lebanon Humanitarian Emergency',
      category: 'lebanon',
      image: '/lebanon/gettyimages-2241116757-612x612.jpg',
      description: 'Lebanon faces severe humanitarian crisis with economic collapse, food shortages, and refugee influx from regional conflicts.',
      raised: 280000,
      goal: 1000000,
      donors: 5672,
      urgency: 'critical',
      location: 'Lebanon',
      beneficiaries: '3M+ affected civilians including refugees',
      dateStarted: 'October 2019',
      tags: ['Economic Crisis', 'Food Security', 'Refugee Support', 'Medical Aid', 'Infrastructure'],
      updates: [
        { date: '2026-03-21', title: 'Emergency Food Distribution', content: 'Reaching 100,000+ families with essential food supplies amid economic collapse.' },
        { date: '2026-03-18', title: 'Medical Supply Shortages', content: 'Hospitals reporting critical shortages of medicine and equipment.' },
        { date: '2026-03-15', title: 'Refugee Camp Support', content: 'Expanding capacity for Syrian and Palestinian refugees in overcrowded camps.' },
        { date: '2026-03-12', title: 'Infrastructure Repair', content: 'Emergency repairs to water and electricity systems in affected areas.' }
      ]
    },
    // Israel Crisis
    {
      id: 'israel-crisis',
      title: 'Israel Emergency Relief Fund',
      category: 'israel',
      image: '/israel/gettyimages-2229695065-612x612.jpg',
      description: 'Israel faces emergency situation with ongoing conflict, civilian casualties, and critical need for medical and psychological support.',
      raised: 680000,
      goal: 2000000,
      donors: 9845,
      urgency: 'high',
      location: 'Israel',
      beneficiaries: '9M+ affected civilians',
      dateStarted: 'October 2023',
      tags: ['Emergency Relief', 'Medical Support', 'Psychological Aid', 'Civilian Protection', 'Infrastructure'],
      updates: [
        { date: '2026-03-21', title: 'Emergency Medical Response', content: 'Field hospitals treating thousands of injured civilians from ongoing attacks.' },
        { date: '2026-03-19', title: 'Psychological Support Services', content: 'Expanded mental health services for trauma-affected populations.' },
        { date: '2026-03-17', title: 'Civilian Shelter Programs', content: 'Emergency shelters established for displaced families in conflict zones.' },
        { date: '2026-03-15', title: 'Infrastructure Protection', content: 'Teams working to protect civilian infrastructure from damage.' }
      ]
    },
    // Russia-Ukraine War
    {
      id: 'ukraine-crisis',
      title: 'Ukraine War Relief Fund',
      category: 'ukraine',
      image: '/ukraine war images/1000 days of Russia war on Ukraine 05.jpg',
      description: 'Ongoing conflict has displaced millions. Families need shelter, food, medical care, and winter supplies.',
      raised: 2100000,
      goal: 3000000,
      donors: 45892,
      urgency: 'high',
      location: 'Ukraine & Border Regions',
      beneficiaries: '8M+ affected civilians',
      dateStarted: 'February 2022',
      tags: ['War Relief', 'Refugee Support', 'Winter Supplies', 'Medical Aid', 'Education'],
      updates: [
        { date: '2024-02-16', title: 'Winter Heating Program', content: 'Providing heating and warm clothing to 200,000+ families.' },
        { date: '2024-02-12', title: 'School Reconstruction', content: 'Rebuilding 15 destroyed schools in eastern regions.' },
        { date: '2024-02-08', title: 'Refugee Support Centers', content: '5 new centers offering comprehensive aid to displaced families.' },
        { date: '2024-02-05', title: 'Medical Equipment Delivery', content: 'Advanced medical equipment sent to frontline hospitals.' }
      ]
    }
  ];

  const filteredCrises = selectedCategory === 'all' 
    ? crises 
    : crises.filter(crisis => crisis.category === selectedCategory);

  const handleDonate = (crisisId: string) => {
    // Navigate to donation page with crisis pre-selected
    window.location.href = `/donate?campaign=${crisisId}`;
  };

  const _handleViewGallery = (crisisId: string) => {
    window.location.href = `/campaign/${crisisId}/gallery`;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'CRITICAL EMERGENCY';
      case 'high': return 'HIGH PRIORITY';
      case 'medium': return 'URGENT';
      default: return 'ACTIVE';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-white font-semibold tracking-wide">LIVE CRISIS TRACKING</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Humanitarian Crises
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
            Urgent relief efforts for communities affected by conflict and war
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">15.8M+</div>
                <div className="text-gray-400 text-sm">People Affected</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">$4.5M+</div>
                <div className="text-gray-400 text-sm">Raised for Aid</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">82K+</div>
                <div className="text-gray-400 text-sm">Active Donors</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">6</div>
                <div className="text-gray-400 text-sm">Active Crises</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 mb-12 sticky top-20 z-30">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              All Crises
            </button>
            <button
              onClick={() => setSelectedCategory('sudan')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'sudan'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              Sudan
            </button>
            <button
              onClick={() => setSelectedCategory('palestine')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'palestine'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              Palestine
            </button>
            <button
              onClick={() => setSelectedCategory('iran')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'iran'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              Iran
            </button>
            <button
              onClick={() => setSelectedCategory('israel')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'israel'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              Israel
            </button>
            <button
              onClick={() => setSelectedCategory('lebanon')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'lebanon'
                  ? 'bg-gradient-to-r from-yellow-500 to-lime-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              Lebanon
            </button>
            <button
              onClick={() => setSelectedCategory('ukraine')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'ukraine'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
              }`}
            >
              Ukraine
            </button>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCrises.map((crisis) => (
              <div key={crisis.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition">
                  {/* Campaign Header */}
                  <div className="relative">
                    <img
                      src={crisis.image}
                      alt={crisis.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`${getUrgencyColor(crisis.urgency)} text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-opacity-80`}>
                      {getUrgencyBadge(crisis.urgency)}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{crisis.title}</h3>
                  </div>
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {crisis.description}
                    </p>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-white/10">
                      <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{crisis.beneficiaries}</div>
                      <div className="text-xs text-gray-400">Beneficiaries</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-white/10">
                      <div className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{crisis.location}</div>
                      <div className="text-xs text-gray-400">Location</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>${crisis.raised.toLocaleString()} raised</span>
                      <span>{Math.round((crisis.raised / crisis.goal) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getUrgencyColor(crisis.urgency)}`}
                        style={{ width: `${Math.min((crisis.raised / crisis.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>{crisis.donors.toLocaleString()} donors</span>
                      <span>Goal: ${crisis.goal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {crisis.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-slate-800/50 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleDonate(crisis.id)}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default HumanitarianCrisesPage;
