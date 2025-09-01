import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Videos = () => {
  const { videos, loading, getPageContent } = useContent();
  const [selectedVideo, setSelectedVideo] = useState(videos[0] || null);

  // Get dynamic content
  const heroContent = getPageContent('videos', 'hero') || {
    title: 'Videos',
    description: 'Experience our visual journey through music and storytelling'
  };
  
  const featuredSection = getPageContent('videos', 'featured_section') || {
    title: 'Featured Music Video'
  };
  
  const playlistSection = getPageContent('videos', 'playlist_section') || {
    title: 'Music Video Playlist',
    description: 'Each member brings their unique essence and power to create perfect harmony'
  };

  React.useEffect(() => {
    if (videos.length > 0 && !selectedVideo) {
      setSelectedVideo(videos[0]);
    }
  }, [videos, selectedVideo]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (!selectedVideo && videos.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No videos available yet.</p>
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

          {/* Featured Video */}
          {selectedVideo && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 hover:border-purple-500/50 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">{featuredSection.title}</h2>
              <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden group">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(selectedVideo.url, '_blank')}
                    className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <Play className="w-10 h-10 ml-1" />
                  </motion.button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-400">{selectedVideo.description}</p>
              </div>
            </div>
            {videos.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No videos available yet. Check back soon for new content!
              </div>
            )}
          </motion.div>
          )}

          {/* Video Playlist */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">{playlistSection.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedVideo(video)}
                  className={`group cursor-pointer bg-gray-800/80 backdrop-blur-lg rounded-xl border transition-all duration-300 overflow-hidden ${
                    selectedVideo.id === video.id 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                      : 'border-gray-700/50 hover:border-purple-500/50'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(video.url, '_blank');
                        }}
                        className="w-8 h-8 bg-black/50 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {video.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Videos;