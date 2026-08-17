import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import MobileMenu from './MobileMenu';
import AuthService from '../services/AuthService';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home' }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const user = AuthService.getCurrentUser();
      setIsLoggedIn(AuthService.isLoggedIn());
      setCurrentUser(user);
    };

    checkAuthStatus();
    
    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <>
      <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img
                src="/logo/grok_image_1771510505826.jpg"
                alt="GlobalHelper Logo"
                className="h-8 w-auto mr-2"
              />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">GlobalHelper</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
              <a
                href="/"
                className={`transition text-sm sm:text-base ${
                  currentPage === 'home' ? 'text-purple-400 font-medium' : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                Home
              </a>
              <a
                href="/humanitarian-crises"
                className={`transition text-sm sm:text-base ${
                  currentPage === 'humanitarian-crises' ? 'text-red-400 font-medium' : 'text-gray-300 hover:text-red-400'
                }`}
              >
                Humanitarian Crises
              </a>
              <a
                href="/about"
                className={`transition text-sm sm:text-base ${
                  currentPage === 'about' ? 'text-cyan-400 font-medium' : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                About
              </a>
              <a
                href="/contact"
                className={`transition text-sm sm:text-base ${
                  currentPage === 'contact' ? 'text-cyan-400 font-medium' : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                Contact
              </a>

              {isLoggedIn ? (
                <>
                  <a
                    href="/profile"
                    className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:inline">{currentUser?.name || 'User'}</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-purple-400 transition text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-300 hover:text-purple-400 transition text-sm sm:text-base"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="hidden sm:block bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition text-sm sm:text-base"
                  >
                    Sign Up
                  </button>
                </>
              )}

              <a
                href="/donate"
                className="relative group bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 sm:px-6 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition text-sm sm:text-base"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-40 group-hover:opacity-60 transition"></span>
                <span className="relative">Donate</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              {isLoggedIn && (
                <a
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </a>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-300 hover:text-purple-400 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
      />
    </>
  );
};

export default Navigation;
