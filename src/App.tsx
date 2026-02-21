import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HumanitarianCrisesPage from './pages/HumanitarianCrisesPage';
import CampaignGalleryPage from './pages/CampaignGalleryPage';
import DonatePage from './pages/DonatePage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Humanitarian Crises Alert */}
      <section className="bg-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              🚨 Urgent Humanitarian Crises
            </h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Millions need immediate help in Sudan, Palestine, and Ukraine. Your donation provides food, shelter, and medical care.
            </p>
            <a
              href="/humanitarian-crises"
              className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Help Save Lives
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4l-4-4m6 2v10a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Campaigns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sudan Crisis Campaign */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img 
                  src="/sudan war images/AFP__20251103__82WB4CQ__v3__HighRes__TopshotSudanConflictRefugees-1762447780.jpg"
                  alt="Sudan Civil War Emergency"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  CRITICAL
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sudan Civil War Emergency</h3>
                <p className="text-gray-600 mb-4">2.5M+ displaced civilians need urgent food, shelter, and medical care.</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>$125,000 raised</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">3,421 donors</span>
                  <div className="space-y-2">
                    <a 
                      href="/campaign/sudan-crisis/gallery"
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition block text-center"
                    >
                      View Gallery
                    </a>
                    <a 
                      href="/humanitarian-crises"
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition block text-center"
                    >
                      Donate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Palestine/Gaza Crisis Campaign */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img 
                  src="/gaza war images/gaza-kids-scaled.jpg"
                  alt="Palestine & Gaza Humanitarian Crisis"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  CRITICAL
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Palestine & Gaza Crisis</h3>
                <p className="text-gray-600 mb-4">2.3M+ affected civilians need food, water, medical supplies, and shelter.</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>$890,000 raised</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">12,567 donors</span>
                  <div className="space-y-2">
                    <a 
                      href="/campaign/palestine-crisis/gallery"
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition block text-center"
                    >
                      View Gallery
                    </a>
                    <a 
                      href="/humanitarian-crises"
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition block text-center"
                    >
                      Donate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ukraine War Relief Campaign */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img 
                  src="/ukraine war images/1000 days of Russia war on Ukraine 05.jpg"
                  alt="Ukraine War Relief Fund"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  HIGH PRIORITY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ukraine War Relief</h3>
                <p className="text-gray-600 mb-4">8M+ affected civilians need shelter, food, medical care, and winter supplies.</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>$2.1M raised</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">45,892 donors</span>
                  <div className="space-y-2">
                    <a 
                      href="/campaign/ukraine-crisis/gallery"
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition block text-center"
                    >
                      View Gallery
                    </a>
                    <a 
                      href="/humanitarian-crises"
                      className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition block text-center"
                    >
                      Donate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1532629345432-5038c356dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Medical Aid Fund"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Urgent
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Aid Fund</h3>
                <p className="text-gray-600 mb-4">Emergency medical support for families in crisis.</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>$80,000 raised</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">2,156 donors</span>
                  <a 
                    href="/campaign/3"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="/campaigns"
              className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              View All Campaigns
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4l-4-4m6 2v10a2 2 0 002 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={
            <>
              <Navigation currentPage="home" />
              <HomePage />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navigation currentPage="about" />
              <AboutPage />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navigation currentPage="contact" />
              <ContactPage />
            </>
          } />
          <Route path="/humanitarian-crises" element={
            <>
              <Navigation currentPage="humanitarian-crises" />
              <HumanitarianCrisesPage />
            </>
          } />
          <Route path="/campaign/:campaignId/gallery" element={
            <>
              <Navigation currentPage="campaign-gallery" />
              <CampaignGalleryPage />
            </>
          } />
          <Route path="/donate" element={
            <>
              <Navigation currentPage="donate" />
              <DonatePage />
            </>
          } />
          <Route path="/campaigns" element={
            <>
              <Navigation currentPage="campaigns" />
              <CampaignsPage />
            </>
          } />
          <Route path="/campaign/:id" element={
            <>
              <Navigation currentPage="campaigns" />
              <CampaignDetailPage />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Navigation currentPage="profile" />
              <ProfilePage />
            </>
          } />
          <Route path="/admin" element={
            <>
              <Navigation currentPage="admin" />
              <AdminDashboard />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
