import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import FuturisticHero from './components/FuturisticHero';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HumanitarianCrisesPage from './pages/HumanitarianCrisesPage';
import DonatePage from './pages/DonatePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <FuturisticHero />

      {/* Humanitarian Crises Alert */}
      <section className="bg-gradient-to-r from-red-600/20 to-orange-600/20 text-white py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              🚨 Urgent Humanitarian Crises
            </h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto text-gray-300">
              Millions need immediate help in Sudan, Palestine, Iran, Lebanon, Israel, and Ukraine. Your donation provides food, shelter, and medical care.
            </p>
            <a
              href="/humanitarian-crises"
              className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition transform hover:scale-105"
            >
              Help Save Lives
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
          <Route path="/donate" element={
            <>
              <Navigation currentPage="donate" />
              <DonatePage />
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
