import React, { useState } from 'react';

const HumanitarianCrisesPage: React.FC = () => {
  const [_selectedCategory, _setSelectedCategory] = useState('all');
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
      image: '/gaza war images/gaza-kids-scaled.jpg',
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

  const handleViewGallery = (crisisId: string) => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Humanitarian Crises
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Urgent relief efforts for communities affected by conflict and war
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">12.8M+</div>
                <div className="text-sm">People Displaced</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">$3.1M+</div>
                <div className="text-sm">Raised for Aid</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">61K+</div>
                <div className="text-sm">Active Donors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Crises
            </button>
            <button
              onClick={() => setSelectedCategory('sudan')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'sudan'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sudan
            </button>
            <button
              onClick={() => setSelectedCategory('palestine')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'palestine'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Palestine
            </button>
            <button
              onClick={() => setSelectedCategory('ukraine')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'ukraine'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ukraine
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCrises.map((crisis) => (
            <div key={crisis.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              {/* Campaign Header */}
              <div className="relative">
                <img 
                  src={crisis.image}
                  alt={crisis.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`${getUrgencyColor(crisis.urgency)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {getUrgencyBadge(crisis.urgency)}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{crisis.title}</h3>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {crisis.description}
                  </p>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{crisis.beneficiaries}</div>
                    <div className="text-xs text-gray-600">Beneficiaries</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{crisis.location}</div>
                    <div className="text-xs text-gray-600">Location</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>${crisis.raised.toLocaleString()} raised</span>
                    <span>{Math.round((crisis.raised / crisis.goal) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getUrgencyColor(crisis.urgency)}`}
                      style={{ width: `${Math.min((crisis.raised / crisis.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{crisis.donors.toLocaleString()} donors</span>
                    <span>Goal: ${crisis.goal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {crisis.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleViewGallery(crisis.id)}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    View All Images & Stories
                  </button>
                  <button
                    onClick={() => handleDonate(crisis.id)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Your Support Makes a Difference
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Every donation provides immediate relief to families affected by conflict
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0l-5.66 5.66a8 8 0 11-11.31 0l-5.66-5.66a8 8 0 1111.31 0l5.66 5.66a8 8 0 11-11.31 0l5.66-5.66z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Food</h3>
              <p className="text-indigo-100">
                $50 feeds a family of 5 for one week
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe Shelter</h3>
              <p className="text-indigo-100">
                $100 provides emergency shelter for 1 month
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2l4-4m6 2v10a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Medical Care</h3>
              <p className="text-indigo-100">
                $25 provides essential medical supplies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Every Dollar Counts
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of donors providing life-saving assistance to families affected by conflict
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/donate'}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Donate to All Crises
            </button>
            <button
              onClick={() => window.location.href = '/campaigns'}
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
            >
              Start a Fundraiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanitarianCrisesPage;
