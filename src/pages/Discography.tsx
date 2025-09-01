import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Calendar } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Discography = () => {
  const { discography, loading, getPageContent } = useContent();

  // Get dynamic content
  const heroContent = getPageContent('discography', 'hero') || {
    title: 'Discography',
    description: 'Journey through our musical evolution, from debut to destiny'
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading discography...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">{heroContent.title}</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {heroContent.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {discography.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Album Art */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
                  
                  {/* Hover Play Button */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {album.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {album.releaseDate}
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {album.description}
                  </p>

                  {/* Streaming Links */}
                  <div className="flex flex-wrap gap-2">
                    {album.streaming_links?.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium hover:bg-purple-500/30 transition-colors duration-300"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-purple-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Discography;