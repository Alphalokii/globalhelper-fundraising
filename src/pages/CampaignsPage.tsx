import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CryptoPayment from '../components/CryptoPayment';

interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  image: string;
  organizer: string;
  featured: boolean;
}

const CampaignsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const _categories = ['all', 'education', 'health', 'environment', 'disaster', 'community'];

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Clean Water Initiative',
      description: 'Bringing clean water to rural communities in need. Help us build wells and water purification systems.',
      category: 'environment',
      goal: 50000,
      raised: 45000,
      donors: 234,
      daysLeft: 15,
      image: '/Clean water/160_UNI135099.webp',
      organizer: 'Water for All',
      featured: true
    },
    {
      id: '2',
      title: 'Education for All',
      description: 'Providing quality education to underprivileged children worldwide. Every child deserves access to learning.',
      category: 'education',
      goal: 40000,
      raised: 30000,
      donors: 189,
      daysLeft: 30,
      image: '/Education for all/11.jpg',
      organizer: 'Education First',
      featured: true
    },
    {
      id: '3',
      title: 'Medical Aid Fund',
      description: 'Emergency medical support for families in crisis. Providing critical healthcare access.',
      category: 'health',
      goal: 100000,
      raised: 60000,
      donors: 412,
      daysLeft: 45,
      image: '/Medical Aid/doctors-hospitals.jpg',
      organizer: 'Healthcare Heroes',
      featured: true
    },
    {
      id: '4',
      title: 'Disaster Relief Fund',
      description: 'Immediate relief for victims of natural disasters. Food, shelter, and emergency supplies.',
      category: 'disaster',
      goal: 75000,
      raised: 35000,
      donors: 567,
      daysLeft: 20,
      image: '/Disaster relief/16Brazil-Mudslides-New-superJumbo.jpg',
      organizer: 'Rapid Response Team',
      featured: false
    },
    {
      id: '5',
      title: 'Community Garden Project',
      description: 'Creating sustainable community gardens to provide fresh food and teach agricultural skills.',
      category: 'community',
      goal: 25000,
      raised: 18000,
      donors: 98,
      daysLeft: 25,
      image: '/Community Garden/scenichudson_91769522_Medium.jpg',
      organizer: 'Green Communities',
      featured: false
    },
    {
      id: '6',
      title: 'Mental Health Support',
      description: 'Providing free mental health services and counseling to those in need.',
      category: 'health',
      goal: 35000,
      raised: 22000,
      donors: 145,
      daysLeft: 35,
      image: '/Mental Health/maninpsychotherapywithwoman-1440_0.jpg',
      organizer: 'Mind Matters',
      featured: false
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProgressPercentage = (raised: number, goal: number) => {
    return (raised / goal) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support a Campaign
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Browse through active campaigns and find causes that resonate with you. 
            Your donation can make a real difference in people's lives.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 11 14 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map(campaign => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Campaign Image */}
                <div className="h-48 relative">
                  <img 
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  {campaign.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold">
                    {campaign.category}
                  </div>
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{campaign.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>${campaign.raised.toLocaleString()} raised</span>
                      <span>{getProgressPercentage(campaign.raised, campaign.goal).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${getProgressPercentage(campaign.raised, campaign.goal)}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Goal: ${campaign.goal.toLocaleString()}</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  {/* Campaign Stats */}
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{campaign.donors} donors</span>
                    <span>by {campaign.organizer}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link 
                      to={`/campaign/${campaign.id}/gallery`}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-center"
                    >
                      View Gallery
                    </Link>
                    <Link 
                      to={`/campaign/${campaign.id}`}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowCryptoPayment(true);
                      }}
                      className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition text-center"
                    >
                      Donate Crypto
                    </button>
                    <Link 
                      to={`/donate?campaign=${campaign.id}`}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-center"
                    >
                      Donate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No campaigns found matching your criteria.</div>
            </div>
          )}
        </div>
      </section>

      {/* Crypto Payment Modal */}
      {showCryptoPayment && selectedCampaign && (
        <CryptoPayment
          amount={50}
          campaignName={selectedCampaign.title}
          onSuccess={(txId) => {
            console.log('Crypto payment successful:', txId);
            setShowCryptoPayment(false);
            setSelectedCampaign(null);
          }}
          onError={(error) => {
            console.error('Crypto payment error:', error);
            setShowCryptoPayment(false);
            setSelectedCampaign(null);
          }}
        />
      )}
    </div>
  );
};

export default CampaignsPage;
