import React, { useState } from 'react';

interface Donation {
  id: string;
  campaignTitle: string;
  amount: number;
  date: string;
  type: 'one-time' | 'monthly';
  status: 'completed' | 'pending';
}

interface Campaign {
  id: string;
  title: string;
  goal: number;
  raised: number;
  status: 'active' | 'completed';
  endDate: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donations' | 'campaigns' | 'settings'>('donations');

  // Mock data - in real app, this would come from API
  const donations: Donation[] = [
    {
      id: '1',
      campaignTitle: 'Clean Water Initiative',
      amount: 100,
      date: '2024-01-15',
      type: 'one-time',
      status: 'completed'
    },
    {
      id: '2',
      campaignTitle: 'Education for All',
      amount: 50,
      date: '2024-01-10',
      type: 'monthly',
      status: 'completed'
    },
    {
      id: '3',
      campaignTitle: 'Medical Aid Fund',
      amount: 75,
      date: '2024-01-05',
      type: 'one-time',
      status: 'completed'
    }
  ];

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Community Garden Project',
      goal: 25000,
      raised: 18000,
      status: 'active',
      endDate: '2024-03-01'
    }
  ];

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const monthlyDonations = donations.filter(d => d.type === 'monthly').reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-gray-600 mb-4">john.doe@example.com</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">${totalDonated}</div>
                  <div className="text-sm text-gray-600">Total Donated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">${monthlyDonations}/mo</div>
                  <div className="text-sm text-gray-600">Monthly Giving</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{donations.length}</div>
                  <div className="text-sm text-gray-600">Donations</div>
                </div>
              </div>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {(['donations', 'campaigns', 'settings'] as const).map(tab => (
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
            {activeTab === 'donations' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Donation History</h3>
                {donations.length > 0 ? (
                  <div className="space-y-4">
                    {donations.map(donation => (
                      <div key={donation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">{donation.campaignTitle}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>${donation.amount}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                donation.type === 'monthly' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {donation.type}
                              </span>
                              <span>{new Date(donation.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              donation.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {donation.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-lg mb-4">No donations yet</div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                      Make Your First Donation
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">My Campaigns</h3>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Start New Campaign
                  </button>
                </div>
                {campaigns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campaigns.map(campaign => (
                      <div key={campaign.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                        <h4 className="font-semibold text-lg mb-2">{campaign.title}</h4>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>${campaign.raised.toLocaleString()} raised</span>
                            <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{width: `${(campaign.raised / campaign.goal) * 100}%`}}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Goal: ${campaign.goal.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            campaign.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </span>
                          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Manage
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-lg mb-4">No campaigns started yet</div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                      Start Your First Campaign
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>Email updates about campaigns I support</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>Monthly donation receipts</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>Newsletter and campaign recommendations</span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-12 h-8 bg-blue-600 rounded mr-3"></div>
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-sm text-gray-600">Expires 12/25</div>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-700">Remove</button>
                      </div>
                      <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition">
                        Add Payment Method
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                      Save Changes
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
