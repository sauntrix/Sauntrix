import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Twitter, Instagram, Music, Mail, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Footer = () => {
  const { footerContent, siteSettings } = useContent();
  const { getAsset } = useContent();
  const currentYear = new Date().getFullYear();

  // Get dynamic logo
  const logoAsset = getAsset('site_logo');

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/discography', label: 'Discography' },
    { path: '/lore', label: 'Lore Codex' },
    { path: '/videos', label: 'Videos' },
    { path: '/community', label: 'Fan Community' },
    { path: '/contact', label: 'Contact' }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Twitter': return Twitter;
      case 'Instagram': return Instagram;
      case 'Music': return Music;
      case 'Mail': return Mail;
      default: return Star;
    }
  };

  const getIconColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'hover:text-blue-400';
      case 'instagram': return 'hover:text-pink-400';
      case 'tiktok': return 'hover:text-red-400';
      case 'email': return 'hover:text-purple-400';
      default: return 'hover:text-gray-300';
    }
  };

  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/50 mt-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Link to="/" className="flex items-center space-x-3 group mb-4">
                <div className="relative">
                  {logoAsset?.url ? (
                    logoAsset.url.startsWith('data:image/svg+xml') ? (
                      <img 
                        src={logoAsset.url} 
                        alt={logoAsset.alt_text || 'SAUNTRIX Logo'} 
                        className="w-10 h-10 group-hover:animate-pulse" 
                      />
                    ) : (
                      <img 
                        src={logoAsset.url} 
                        alt={logoAsset.alt_text || 'SAUNTRIX Logo'} 
                        className="w-10 h-10 rounded group-hover:animate-pulse" 
                      />
                    )
                  ) : (
                    <Star className="w-10 h-10 text-yellow-400 group-hover:animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg group-hover:bg-yellow-400/40 transition-all duration-300"></div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">
                  SAUNTRIX
                </span>
              </Link>
              <p className="text-gray-300 text-lg mb-4 font-medium">
                {footerContent.tagline}
              </p>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {footerContent.description}
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4">Follow SAUNTRIX</h4>
              <div className="flex space-x-4">
                {footerContent.socialLinks.map((social, index) => {
                  const IconComponent = getIconComponent(social.icon);
                  return (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gray-800/50 backdrop-blur-lg rounded-full border border-gray-600/50 flex items-center justify-center text-gray-400 ${getIconColor(social.platform)} transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20`}
                    title={social.platform}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* AUREA Community */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">AUREA Community</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Gold AUREA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Violet AUREA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">Crimson AUREA</span>
                </div>
                <Link
                  to="/community"
                  className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-700/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all duration-300 text-sm"
                >
                  Join Community
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} {footerContent.copyrightText}</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
            
            <div className="text-gray-500 text-sm">
              Managed by DESSIN MUSIC GROUP
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <span className="text-gray-500">
                {footerContent.madeWithText}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500"></div>
    </footer>
  );
};

export default Footer;