import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getAsset } = useContent();

  // Get dynamic logo
  const logoAsset = getAsset('site_logo');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/discography', label: 'Discography' },
    { path: '/lore', label: 'Lore Codex' },
    { path: '/videos', label: 'Videos' },
    { path: '/community', label: 'Fan Community' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              {logoAsset?.url ? (
                logoAsset.url.startsWith('data:image/svg+xml') ? (
                  <img 
                    src={logoAsset.url} 
                    alt={logoAsset.alt_text || 'SAUNTRIX Logo'} 
                    className="w-8 h-8 group-hover:animate-pulse" 
                  />
                ) : (
                  <img 
                    src={logoAsset.url} 
                    alt={logoAsset.alt_text || 'SAUNTRIX Logo'} 
                    className="w-8 h-8 rounded group-hover:animate-pulse" 
                  />
                )
              ) : (
                <Star className="w-8 h-8 text-yellow-400 group-hover:animate-pulse" />
              )}
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg group-hover:bg-yellow-400/40 transition-all duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">
              SAUNTRIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white group ${
                  location.pathname === item.path ? 'text-white' : 'text-gray-300'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 transform transition-all duration-300 ${
                  location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-gray-800/95 backdrop-blur-lg rounded-lg"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-white hover:bg-gray-700/50 rounded ${
                      location.pathname === item.path ? 'text-white bg-gray-700/30' : 'text-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;