import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CampaignGalleryPage: React.FC = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Campaign data with all images and messages
  const campaigns = {
    // Humanitarian Crises
    'sudan-crisis': {
      title: 'Sudan Civil War Emergency',
      category: 'sudan',
      images: [
        {
          src: '/sudan war images/AFP__20251103__82WB4CQ__v3__HighRes__TopshotSudanConflictRefugees-1762447780.jpg',
          title: 'Refugee Families Seeking Safety',
          message: 'Families flee their homes with nothing but hope. Your donation provides emergency shelter and essential supplies.',
          impact: 'Every $50 provides shelter for one family for a month'
        },
        {
          src: '/sudan war images/2023-10-26T125539Z_2064271085_RC2VG2A7P6O8_RTRMADP_3_SUDAN-POLITICS-1-1.jpg',
          title: 'Displaced Children in Need',
          message: 'Innocent children caught in conflict. Your help provides food, medical care, and education supplies.',
          impact: 'Every $25 feeds a child for one week'
        },
        {
          src: '/sudan war images/f049553_6a1df969325f443894592d7c3d752581-0-d361c80e287b427abf3173aa1b9470df.jpg',
          title: 'Emergency Medical Aid',
          message: 'Critical medical supplies needed urgently. Your donation saves lives through emergency healthcare access.',
          impact: 'Every $100 provides medical supplies for 10 families'
        }
      ],
      stats: {
        raised: 125000,
        goal: 500000,
        donors: 3421,
        beneficiaries: '2.5M+ displaced civilians',
        location: 'Sudan',
        urgency: 'critical'
      }
    },
    'palestine-crisis': {
      title: 'Palestine & Gaza Humanitarian Crisis',
      category: 'palestine',
      images: [
        {
          src: '/gaza war images/gaza-kids-scaled.jpg',
          title: 'Children of Gaza',
          message: 'Young faces filled with fear but also hope. Your donation provides food, clean water, and safe spaces for children to play and learn.',
          impact: 'Every $30 provides clean water for a family for one month'
        },
        {
          src: '/gaza war images/Gaza-Famine-Food-Aid.jpg',
          title: 'Food Distribution Lines',
          message: 'Families wait hours for basic food supplies. Your help ensures no one goes hungry in this crisis.',
          impact: 'Every $50 feeds a family of five for one week'
        },
        {
          src: '/gaza war images/2736.jpg',
          title: 'Destroyed Homes and Lives',
          message: 'Homes reduced to rubble, lives forever changed. Your donation provides emergency shelter and rebuilding assistance.',
          impact: 'Every $75 provides temporary shelter for one family'
        },
        {
          src: '/gaza war images/afp_68f7efb6b550-1761079222.jpg',
          title: 'Medical Emergency',
          message: 'Hospitals overwhelmed, medical supplies scarce. Your donation provides life-saving medical equipment and care.',
          impact: 'Every $100 provides emergency medical supplies'
        }
      ],
      stats: {
        raised: 890000,
        goal: 2000000,
        donors: 12567,
        beneficiaries: '2.3M+ affected civilians',
        location: 'Gaza Strip & West Bank',
        urgency: 'critical'
      }
    },
    'ukraine-crisis': {
      title: 'Ukraine War Relief Fund',
      category: 'ukraine',
      images: [
        {
          src: '/ukraine war images/1000 days of Russia war on Ukraine 05.jpg',
          title: '1000 Days of Conflict',
          message: 'Over 1000 days of war have displaced millions. Your continued support provides hope and essential supplies.',
          impact: 'Every $50 provides winter supplies for one family'
        },
        {
          src: '/ukraine war images/image1170x530cropped.jpg',
          title: 'Winter Crisis',
          message: 'Freezing temperatures threaten vulnerable families. Your donation provides heating, warm clothing, and winter essentials.',
          impact: 'Every $100 provides heating for one family all winter'
        },
        {
          src: '/ukraine war images/e7a3c2b5c182ad59aa4af96692c213ca.jpg',
          title: 'Refugee Children',
          message: 'Children displaced from their homes and schools. Your help provides education, safety, and childhood normalcy.',
          impact: 'Every $40 provides school supplies for one child'
        }
      ],
      stats: {
        raised: 2100000,
        goal: 3000000,
        donors: 45892,
        beneficiaries: '8M+ affected civilians',
        location: 'Ukraine & Border Regions',
        urgency: 'high'
      }
    },

    // NEW: Medical Aid Campaign
    'medical-aid-fund': {
      title: 'Medical Aid Fund',
      category: 'medical',
      images: [
        {
          src: '/Medical Aid/doctors-hospitals.jpg',
          title: 'Healthcare Heroes',
          message: 'Dedicated doctors and nurses saving lives every day. Your donation provides critical medical care to those who cannot afford it.',
          impact: 'Every $100 provides medical supplies for 10 patients'
        },
        {
          src: '/Medical Aid/-1x-1.webp',
          title: 'Emergency Medical Response',
          message: 'Rapid medical teams responding to emergencies. Your support saves lives in critical moments when every second counts.',
          impact: 'Every $50 funds emergency medical response for one family'
        }
      ],
      stats: {
        raised: 60000,
        goal: 100000,
        donors: 412,
        beneficiaries: '5,000+ patients served',
        location: 'Multiple Regions',
        urgency: 'high'
      }
    },

    // NEW: Clean Water Campaign
    'clean-water-initiative': {
      title: 'Clean Water Initiative',
      category: 'water',
      images: [
        {
          src: '/Clean water/160_UNI135099.webp',
          title: 'Clean Water for Life',
          message: 'Children celebrating clean water access for first time. Your donation builds wells and water systems that transform communities.',
          impact: 'Every $100 provides clean water for 50 people'
        },
        {
          src: '/Clean water/June-15-2011_2011_GR_Photos.jpg',
          title: 'Water Changes Everything',
          message: 'Communities thriving with sustainable water sources. Clean water means health, education, and hope for future.',
          impact: 'Every $50 provides water filters for one family'
        }
      ],
      stats: {
        raised: 45000,
        goal: 50000,
        donors: 234,
        beneficiaries: '50,000+ people served',
        location: 'Rural Communities',
        urgency: 'high'
      }
    },

    // NEW: Education Campaign
    'education-for-all': {
      title: 'Education for All',
      category: 'education',
      images: [
        {
          src: '/Education for all/11.jpg',
          title: 'Bright Futures Begin Here',
          message: 'Children excited to learn in new classrooms. Your donation provides books, supplies, and hope for a better future.',
          impact: 'Every $50 provides school supplies for 5 children'
        },
        {
          src: '/Education for all/school1--621x414.jpg',
          title: 'Education Breaks Barriers',
          message: 'Students overcoming challenges through education. Learning opens doors to opportunities and breaks cycles of poverty.',
          impact: 'Every $100 supports one student for one year'
        },
        {
          src: '/Education for all/61012f5537cd49d8b662bf6934a9bb11_18.jpeg',
          title: 'Teachers Changing Lives',
          message: 'Dedicated teachers shaping young minds. Your support helps educators provide quality education in underserved areas.',
          impact: 'Every $75 provides teaching materials for one classroom'
        }
      ],
      stats: {
        raised: 30000,
        goal: 40000,
        donors: 189,
        beneficiaries: '2,000+ students educated',
        location: 'Developing Countries',
        urgency: 'high'
      }
    },

    // NEW: Disaster Relief Campaign
    'disaster-relief-fund': {
      title: 'Disaster Relief Fund',
      category: 'disaster',
      images: [
        {
          src: '/Disaster relief/16Brazil-Mudslides-New-superJumbo.jpg',
          title: 'Hope After Devastation',
          message: 'Communities rebuilding after natural disasters. Your donation provides shelter, food, and hope when all seems lost.',
          impact: 'Every $200 helps rebuild one family home'
        },
        {
          src: '/Disaster relief/60292_142839_996015.jpg',
          title: 'Emergency Response Heroes',
          message: 'First responders saving lives in critical moments. Your support enables rapid deployment of emergency supplies and teams.',
          impact: 'Every $100 provides emergency supplies for 10 families'
        }
      ],
      stats: {
        raised: 35000,
        goal: 75000,
        donors: 567,
        beneficiaries: '10,000+ disaster survivors helped',
        location: 'Global Response',
        urgency: 'critical'
      }
    },

    // NEW: Community Garden Campaign
    'community-garden-project': {
      title: 'Community Garden Project',
      category: 'food',
      images: [
        {
          src: '/Community Garden/scenichudson_91769522_Medium.jpg',
          title: 'Growing Hope Together',
          message: 'Families working together in community gardens. Your donation creates sustainable food sources and strengthens community bonds.',
          impact: 'Every $75 feeds a family for one month'
        }
      ],
      stats: {
        raised: 18000,
        goal: 25000,
        donors: 98,
        beneficiaries: '1,000+ families fed',
        location: 'Local Communities',
        urgency: 'medium'
      }
    },

    // NEW: Mental Health Campaign
    'mental-health-support': {
      title: 'Mental Health Support',
      category: 'health',
      images: [
        {
          src: '/Mental Health/maninpsychotherapywithwoman-1440_0.jpg',
          title: 'Healing Minds, Changing Lives',
          message: 'Professional counselors providing hope and healing. Your donation makes mental health care accessible to those who need it most.',
          impact: 'Every $50 provides one counseling session'
        },
        {
          src: '/Mental Health/Understanding-Mental-Health-as-a-Public-Health-Issue.jpg',
          title: 'Breaking the Stigma',
          message: 'Communities embracing mental health awareness. Your support helps create safe spaces for healing and recovery.',
          impact: 'Every $100 provides mental health resources for 20 people'
        }
      ],
      stats: {
        raised: 22000,
        goal: 35000,
        donors: 145,
        beneficiaries: '500+ people receiving care',
        location: 'Multiple Communities',
        urgency: 'high'
      }
    }
  };

  const campaign = campaigns[campaignId as keyof typeof campaigns];

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <button
            onClick={() => navigate('/campaigns')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      default: return 'bg-blue-600';
    }
  };

  const handleDonate = () => {
    navigate(`/donate?campaign=${campaignId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${getUrgencyColor(campaign.stats.urgency)} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{campaign.title}</h1>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">${campaign.stats.raised.toLocaleString()}</div>
                <div className="text-sm opacity-90">Raised</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{campaign.stats.donors.toLocaleString()}</div>
                <div className="text-sm opacity-90">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{campaign.stats.beneficiaries}</div>
                <div className="text-sm opacity-90">People Helped</div>
              </div>
            </div>
            <button
              onClick={handleDonate}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>${campaign.stats.raised.toLocaleString()} raised</span>
            <span>{Math.round((campaign.stats.raised / campaign.stats.goal) * 100)}% of ${campaign.stats.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`${getUrgencyColor(campaign.stats.urgency)} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min((campaign.stats.raised / campaign.stats.goal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          See the Impact • Every Photo Tells a Story
        </h2>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center mb-8 space-x-4">
          {campaign.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                selectedImage === index 
                  ? 'border-indigo-600 shadow-lg' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Large Image */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={campaign.images[selectedImage].src}
                alt={campaign.images[selectedImage].title}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {campaign.images[selectedImage].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {campaign.images[selectedImage].message}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Message */}
          <div className="space-y-6">
            {/* Impact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h3>
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                <p className="text-indigo-900 font-semibold text-lg">
                  {campaign.images[selectedImage].impact}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className={`${getUrgencyColor(campaign.stats.urgency)} text-white rounded-xl p-6`}>
              <h3 className="text-xl font-bold mb-4">Take Action Now</h3>
              <p className="mb-6 text-lg">
                Every donation makes a real difference. Your support provides immediate relief to families affected by this crisis.
              </p>
              <button
                onClick={handleDonate}
                className="w-full bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Donate to Save Lives
              </button>
            </div>

            {/* Share Options */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Share This Campaign</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Facebook
                </button>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition">
                  Twitter
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  WhatsApp
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
            disabled={selectedImage === 0}
            className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <div className="text-center">
            <span className="text-gray-600">
              Image {selectedImage + 1} of {campaign.images.length}
            </span>
          </div>
          
          <button
            onClick={() => setSelectedImage(Math.min(campaign.images.length - 1, selectedImage + 1))}
            disabled={selectedImage === campaign.images.length - 1}
            className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Back to Campaigns */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <button
            onClick={() => navigate('/campaigns')}
            className="inline-flex items-center bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Campaigns
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignGalleryPage;
