import React, { useState, useEffect } from 'react';

interface WarCrisis {
  id: string;
  title: string;
  location: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  urgency: 'critical' | 'high' | 'medium';
  beneficiaries: string;
  dateStarted: string;
  latestUpdate: string;
  image: string;
  tags: string[];
}

const WarDonationSection: React.FC = () => {
  const [selectedCrisis, setSelectedCrisis] = useState<string>('all');
  const [donationAmount, setDonationAmount] = useState<string>('50');
  const [realTimeUpdates, setRealTimeUpdates] = useState<string[]>([]);

  const warCrises: WarCrisis[] = [
    {
      id: 'gaza-crisis',
      title: 'Gaza Humanitarian Emergency',
      location: 'Gaza Strip & West Bank',
      description: 'Catastrophic humanitarian crisis with severe food, water, and medical shortages. Civilians face extreme conditions.',
      raised: 890000,
      goal: 2000000,
      donors: 12567,
      urgency: 'critical',
      beneficiaries: '2.3M+ affected civilians',
      dateStarted: 'October 2023',
      latestUpdate: 'UN reports critical medical supply shortages - 24 hours ago',
      image: '/gaza war images/gaza-kids-scaled.jpg',
      tags: ['Emergency Relief', 'Medical Crisis', 'Food Security', 'Water Emergency']
    },
    {
      id: 'sudan-crisis',
      title: 'Sudan Civil War Emergency',
      location: 'Sudan (Darfur, Khartoum)',
      description: 'Intense conflict displaces millions. Families need urgent food, shelter, and medical care.',
      raised: 125000,
      goal: 500000,
      donors: 3421,
      urgency: 'critical',
      beneficiaries: '2.5M+ displaced civilians',
      dateStarted: 'April 2023',
      latestUpdate: 'Refugee crisis intensifies - 2 hours ago',
      image: '/sudan war images/AFP__20251103__82WB4CQ__v3__HighRes__TopshotSudanConflictRefugees-1762447780.jpg',
      tags: ['Emergency Relief', 'Food Security', 'Shelter', 'Medical Aid']
    },
    {
      id: 'ukraine-crisis',
      title: 'Ukraine War Relief',
      location: 'Ukraine & Border Regions',
      description: 'Ongoing war affects millions. Critical need for shelter, food, medical care, and winter supplies.',
      raised: 2100000,
      goal: 3000000,
      donors: 45892,
      urgency: 'high',
      beneficiaries: '8M+ affected civilians',
      dateStarted: 'February 2022',
      latestUpdate: 'Winter emergency response expanded - 6 hours ago',
      image: '/ukraine war images/1000 days of Russia war on Ukraine 05.jpg',
      tags: ['War Relief', 'Refugee Support', 'Winter Supplies', 'Medical Aid']
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const updates = [
      '🚨 BREAKING: UN Security Council emergency session on Gaza crisis',
      '📊 Global donation surge detected for war relief efforts',
      '🏥 Medical emergency declared in Sudan refugee camps',
      '❄️ Winter crisis deepening in Ukraine - urgent heating needed',
      '💰 Cryptocurrency donations for war relief hit record levels'
    ];
    
    setRealTimeUpdates(updates);
    
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setRealTimeUpdates(prev => {
        const newUpdate = `📰 Latest update: ${new Date().toLocaleTimeString()} - Humanitarian situation evolving`;
        return [newUpdate, ...prev.slice(0, 4)];
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredCrises = selectedCrisis === 'all' 
    ? warCrises 
    : warCrises.filter(crisis => crisis.id === selectedCrisis);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-black';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const handleDonate = (crisisId: string) => {
    const crisis = warCrises.find(c => c.id === crisisId);
    if (crisis) {
      window.location.href = `/donate?campaign=${crisisId}&amount=${donationAmount}`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-lg p-6 mb-8 border border-red-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">🚨</span>
          War Zone Emergency Relief
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-sm text-red-600 font-semibold">LIVE UPDATES</span>
        </div>
      </div>

      {/* Real-time Updates Ticker */}
      <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-semibold">📰 LIVE UPDATES:</span>
        </div>
        <div className="space-y-1">
          {realTimeUpdates.map((update, index) => (
            <div key={index} className="text-sm text-red-800 flex items-center gap-2">
              <span className="text-red-500">•</span>
              {update}
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedCrisis('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedCrisis === 'all' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Crises
        </button>
        {warCrises.map(crisis => (
          <button
            key={crisis.id}
            onClick={() => setSelectedCrisis(crisis.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedCrisis === crisis.id 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {crisis.location}
          </button>
        ))}
      </div>

      {/* Donation Amount Selector */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Quick Donation Amount:
        </label>
        <div className="flex gap-2 mb-3">
          {['25', '50', '100', '250', '500'].map(amount => (
            <button
              key={amount}
              onClick={() => setDonationAmount(amount)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                donationAmount === amount
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Custom amount"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Crisis Cards */}
      <div className="space-y-6">
        {filteredCrises.map(crisis => (
          <div key={crisis.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{crisis.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(crisis.urgency)}`}>
                    {crisis.urgency.toUpperCase()} EMERGENCY
                  </span>
                  <span className="text-sm text-gray-500">
                    📍 {crisis.location}
                  </span>
                  <span className="text-sm text-gray-500">
                    👥 {crisis.beneficiaries}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{crisis.description}</p>
                <div className="text-sm text-red-600 font-semibold mb-3">
                  📰 {crisis.latestUpdate}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>${crisis.raised.toLocaleString()} raised</span>
                <span>${crisis.goal.toLocaleString()} goal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(crisis.raised, crisis.goal)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{crisis.donors.toLocaleString()} donors</span>
                <span>{getProgressPercentage(crisis.raised, crisis.goal).toFixed(1)}% complete</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {crisis.tags.map((tag, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleDonate(crisis.id)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex-1"
              >
                🚨 Donate ${donationAmount} Now
              </button>
              <button
                onClick={() => window.location.href = `/campaign/${crisis.id}/gallery`}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                📸 View Gallery
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="mt-6 bg-red-100 border border-red-300 rounded-lg p-4">
        <h4 className="font-bold text-red-800 mb-2">🆘 Emergency Information</h4>
        <p className="text-red-700 text-sm">
          For immediate assistance or media inquiries about these crises, 
          contact our emergency response team 24/7.
        </p>
      </div>
    </div>
  );
};

export default WarDonationSection;
