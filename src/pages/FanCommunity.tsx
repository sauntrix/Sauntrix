import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Star, Crown, Upload, Users } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const FanCommunity = () => {
  const { communityPosts, fanart, addCommunityPost, addFanart, loading, getPageContent } = useContent();
  const [newMessage, setNewMessage] = useState('');
  const [selectedRank, setSelectedRank] = useState('crimson');
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Get dynamic content
  const heroContent = getPageContent('community', 'hero') || {
    title: 'AUREA Community',
    description: 'Connect with fellow fans, share your passion, and earn your place in the AUREA hierarchy'
  };
  
  const fanWallContent = getPageContent('community', 'fan_wall') || {
    title: 'Fan Wall',
    placeholder: 'Share your thoughts with AUREA...',
    moderationNote: 'Your message will be reviewed by moderators before appearing on the wall.'
  };
  
  const ranksContent = getPageContent('community', 'ranks') || {
    title: 'AUREA Ranks',
    gold: { name: 'Gold AUREA', description: 'VIP Members' },
    violet: { name: 'Violet AUREA', description: 'Active Members' },
    crimson: { name: 'Crimson AUREA', description: 'New Members' }
  };

  // Filter approved posts for display
  const approvedPosts = communityPosts.filter(post => post.status === 'approved');
  const approvedFanart = fanart.filter(art => art.status === 'approved');

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return; // Prevent double submission
    
    if (newMessage.trim() && userName.trim()) {
      try {
        await addCommunityPost({
          user_name: userName,
          message: newMessage,
          rank: selectedRank,
          status: 'pending' // Will be moderated by admin
        });
        setNewMessage('');
        setUserName('');
        setShowNameInput(false);
      } catch (error) {
        console.error('Error posting message:', error);
      }
    } else if (!showNameInput) {
      setShowNameInput(true);
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'gold':
        return <Star className="w-4 h-4 text-yellow-400" />;
      case 'violet':
        return <Crown className="w-4 h-4 text-purple-400" />;
      case 'crimson':
        return <Heart className="w-4 h-4 text-red-400" />;
      default:
        return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

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
              {heroContent.title.includes('AUREA') ? (
                <>
                  <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">AUREA</span> {heroContent.title.split('AUREA')[1]}
                </>
              ) : (
                <span className="bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent">{heroContent.title}</span>
              )}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {heroContent.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Fan Wall */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-400" />
                  {fanWallContent.title}
                </h2>

                {/* Post Form */}
                <form onSubmit={handleSubmitMessage} className="mb-8 space-y-4">
                  {showNameInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        placeholder="Your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                        required
                      />
                      <select
                        value={selectedRank}
                        onChange={(e) => setSelectedRank(e.target.value)}
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors duration-300 appearance-none"
                      >
                        <option value="crimson" className="bg-gray-800">🔥 Crimson AUREA - New Members (Free)</option>
                        <option value="violet" className="bg-gray-800">⚡ Violet AUREA - Active Members</option>
                        <option value="gold" className="bg-gray-800">⭐ Gold AUREA - VIP Members</option>
                      </select>
                    </motion.div>
                  )}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={fanWallContent.placeholder}
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors duration-300"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        'Post'
                      )}
                    </motion.button>
                  </div>
                  {showNameInput && (
                    <p className="text-gray-400 text-sm">
                      {fanWallContent.moderationNote}
                    </p>
                  )}
                </form>

                {/* Messages */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {approvedPosts.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-gray-600/50 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            msg.rank === 'gold' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                            msg.rank === 'violet' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {getRankIcon(msg.rank)}
                            <span className="ml-1">
                              {msg.rank === 'gold' ? 'Gold AUREA' : 
                               msg.rank === 'violet' ? 'Violet AUREA' : 
                               'Crimson AUREA'}
                            </span>
                          </span>
                          <span className="font-semibold text-white">{msg.user_name}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{getTimeAgo(msg.created_at)}</span>
                      </div>
                      <p className="text-gray-300">{msg.message}</p>
                    </motion.div>
                  ))}
                  {approvedPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No messages yet. Be the first to share your thoughts!
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AUREA Ranks */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">{ranksContent.title}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20 hover:bg-yellow-400/20 transition-colors duration-300">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-yellow-400 font-semibold">{ranksContent.gold?.name || 'Gold AUREA'}</div>
                      <div className="text-gray-400 text-sm">{ranksContent.gold?.description || 'VIP Members - Premium features & exclusive content'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors duration-300">
                    <Crown className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-purple-400 font-semibold">{ranksContent.violet?.name || 'Violet AUREA'}</div>
                      <div className="text-gray-400 text-sm">{ranksContent.violet?.description || 'Active Members - Regular participants & supporters'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors duration-300">
                    <Heart className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-red-400 font-semibold">{ranksContent.crimson?.name || 'Crimson AUREA'}</div>
                      <div className="text-gray-400 text-sm">{ranksContent.crimson?.description || 'New Members - Welcome to the AUREA family!'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fan Gallery */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-purple-400" />
                  Fan Gallery
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {approvedFanart.slice(0, 4).map((art) => (
                    <div key={art.id} className="aspect-square rounded-lg overflow-hidden border border-gray-600/50">
                      <img
                        src={art.image_url}
                        alt={art.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                  {[...Array(Math.max(0, 4 - approvedFanart.length))].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-gray-700 rounded-lg border border-gray-600/50 flex items-center justify-center group hover:border-purple-500/50 transition-colors duration-300">
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    const title = prompt('Fanart title:');
                    const artist = prompt('Your artist name:');
                    const imageUrl = prompt('Image URL:');
                    
                    if (title && artist && imageUrl) {
                      addFanart({
                        title,
                        artist,
                        image_url: imageUrl,
                        status: 'pending'
                      });
                    }
                  }}
                  className="w-full py-2 bg-gradient-to-r from-purple-500/20 to-purple-700/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                >
                  Submit Fanart
                </button>
                <p className="text-gray-400 text-xs mt-2 text-center">
                  Moderated by admin • SFW content only
                </p>
              </motion.div>

              {/* Live Stats */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Live Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Messages:</span>
                    <span className="text-white font-semibold">{communityPosts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Approved:</span>
                    <span className="text-green-400 font-semibold">{approvedPosts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Fanart Pieces:</span>
                    <span className="text-purple-400 font-semibold">{approvedFanart.length}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FanCommunity;