import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DonationForm from '../components/DonationForm';
import SocialShare from '../components/SocialShare';

interface Campaign {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  image: string;
  organizer: string;
  organizerBio: string;
  updates: Array<{
    id: string;
    date: string;
    title: string;
    content: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'about' | 'updates' | 'faqs'>('about');

  // Mock campaign data - in real app, this would come from API
  const campaign: Campaign = {
    id: id || '1',
    title: 'Clean Water Initiative',
    description: 'Bringing clean water to rural communities in need.',
    fullDescription: `
      The Clean Water Initiative is dedicated to providing sustainable access to clean, safe drinking water 
      for rural communities that currently lack this basic necessity. With over 2 billion people worldwide 
      lacking access to safe water, our mission is more critical than ever.
      
      Your donation will help us:
      • Build and maintain water wells in underserved communities
      • Install water purification systems in schools and medical facilities
      • Train local community members on water system maintenance
      • Provide water quality testing and monitoring
      • Educate communities on proper sanitation and hygiene practices
      
      Every $25 provides one person with clean water for an entire year. Join us in making 
      a lasting impact on communities' health, education, and economic opportunities.
    `,
    category: 'environment',
    goal: 50000,
    raised: 45000,
    donors: 234,
    daysLeft: 15,
    image: 'water',
    organizer: 'Water for All Foundation',
    organizerBio: 'A non-profit organization dedicated to providing clean water access worldwide since 2010.',
    updates: [
      {
        id: '1',
        date: '2024-01-15',
        title: 'Well Installation Complete in Village A',
        content: 'We successfully installed a new well serving over 500 people in Village A. The community is thrilled with having access to clean water just steps from their homes.'
      },
      {
        id: '2',
        date: '2024-01-10',
        title: 'Phase 1 Progress Update',
        content: 'Thanks to your generous donations, we\'ve completed 60% of our initial goal. Three communities now have access to clean water, and we\'re on track to complete two more installations this month.'
      },
      {
        id: '3',
        date: '2024-01-01',
        title: 'Happy New Year Update',
        content: 'Happy New Year! We\'re kicking off 2024 with renewed energy to bring clean water to even more communities. Thank you for your continued support!'
      }
    ],
    faqs: [
      {
        question: 'How is my donation used?',
        answer: '90% of donations go directly to water projects, 7% to administrative costs, and 3% to fundraising. We\'re committed to transparency and maximizing impact.'
      },
      {
        question: 'How long does it take to install a well?',
        answer: 'Typically 2-3 weeks from start to finish, depending on geological conditions and community preparation.'
      },
      {
        question: 'Can I visit the projects?',
        answer: 'Yes! We organize annual donor trips to visit completed projects. Contact us for more information about upcoming trips.'
      },
      {
        question: 'How do you ensure sustainability?',
        answer: 'We train local community members on maintenance, establish water committees, and provide ongoing support and monitoring for at least 5 years.'
      }
    ]
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getImageGradient = (type: string) => {
    const gradients = {
      water: 'from-blue-400 to-blue-600',
      education: 'from-green-400 to-green-600',
      medical: 'from-red-400 to-red-600',
      disaster: 'from-orange-400 to-orange-600',
      community: 'from-purple-400 to-purple-600',
      health: 'from-pink-400 to-pink-600'
    };
    return gradients[type as keyof typeof gradients] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Campaign Header */}
      <section className="relative">
        <div className={`h-64 bg-gradient-to-r ${getImageGradient(campaign.image)} relative`}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <div className="text-sm font-medium mb-2">{campaign.category}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-xl">by {campaign.organizer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Stats */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                ${campaign.raised.toLocaleString()}
              </div>
              <div className="text-gray-600">raised of ${campaign.goal.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {getProgressPercentage(campaign.raised, campaign.goal).toFixed(0)}%
              </div>
              <div className="text-gray-600">funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {campaign.donors}
              </div>
              <div className="text-gray-600">donors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {campaign.daysLeft}
              </div>
              <div className="text-gray-600">days left</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300" 
                style={{width: `${getProgressPercentage(campaign.raised, campaign.goal)}%`}}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Campaign Details */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  {(['about', 'updates', 'faqs'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 px-6 font-medium transition capitalize ${
                        activeTab === tab
                          ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'about' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">About this Campaign</h3>
                        <div className="prose max-w-none">
                          {campaign.fullDescription.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-3">About the Organizer</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">{campaign.organizer}</h5>
                          <p className="text-gray-700">{campaign.organizerBio}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'updates' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold mb-4">Campaign Updates</h3>
                      {campaign.updates.map(update => (
                        <div key={update.id} className="border-b pb-4 last:border-b-0">
                          <div className="text-sm text-gray-500 mb-2">
                            {new Date(update.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h4 className="text-lg font-semibold mb-2">{update.title}</h4>
                          <p className="text-gray-700">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'faqs' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                      {campaign.faqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Donation Form */}
            <div>
              <DonationForm campaignId={campaign.id} campaignName={campaign.title} />
              
              {/* Share Campaign */}
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Share this Campaign</h3>
                <div className="space-y-3">
                  <SocialShare 
                    url={`/campaign/${campaign.id}`}
                    title={campaign.title}
                    description={campaign.description}
                    campaignId={campaign.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignDetailPage;
