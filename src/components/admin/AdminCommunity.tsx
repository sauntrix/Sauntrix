import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Image, Trash2, Check, X } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AdminCommunity = () => {
  const { 
    communityPosts, 
    fanart, 
    updateCommunityPostStatus, 
    removeCommunityPost,
    updateFanartStatus,
    removeFanart,
    loading 
  } = useContent();

  const handleMessageAction = async (messageId: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this message?')) {
          await removeCommunityPost(messageId);
        }
      } else {
        await updateCommunityPostStatus(messageId, action === 'approve' ? 'approved' : 'rejected');
      }
    } catch (error) {
      console.error('Error handling message action:', error);
    }
  };

  const handleFanartAction = async (artId: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this fanart?')) {
          await removeFanart(artId);
        }
      } else {
        await updateFanartStatus(artId, action === 'approve' ? 'approved' : 'rejected');
      }
    } catch (error) {
      console.error('Error handling fanart action:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'rejected':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-400">Loading community data...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Community Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fan Wall Moderation */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
            Fan Wall Messages ({communityPosts.length})
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {communityPosts.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700/50 rounded-lg border border-gray-600/50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{msg.user_name}</span>
                    <span className={`px-2 py-1 rounded text-xs capitalize ${msg.rank === 'gold' ? 'text-yellow-400' : msg.rank === 'violet' ? 'text-purple-400' : 'text-red-400'}`}>
                      {msg.rank}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(msg.status)}`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{msg.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{getTimeAgo(msg.created_at)}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleMessageAction(msg.id, 'approve')}
                      disabled={msg.status === 'approved'}
                      className="p-1 text-green-400 hover:text-green-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Approve message"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleMessageAction(msg.id, 'reject')}
                      disabled={msg.status === 'rejected'}
                      className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Reject message"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleMessageAction(msg.id, 'delete')}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {communityPosts.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No community posts yet
              </div>
            )}
          </div>
        </div>

        {/* Fan Gallery Moderation */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2 text-purple-400" />
            Fan Gallery ({fanart.length})
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {fanart.map((art, index) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-700/50 rounded-lg border border-gray-600/50 p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={art.image_url}
                    alt={art.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{art.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(art.status)}`}>
                        {art.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">by {art.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{getTimeAgo(art.created_at)}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleFanartAction(art.id, 'approve')}
                          disabled={art.status === 'approved'}
                          className="p-1 text-green-400 hover:text-green-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Approve fanart"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleFanartAction(art.id, 'reject')}
                          disabled={art.status === 'rejected'}
                          className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Reject fanart"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleFanartAction(art.id, 'delete')}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                          title="Delete fanart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {fanart.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No fanart submissions yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-6 text-center hover:bg-yellow-400/20 transition-all duration-300"
        >
          <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <motion.div 
            key={`gold-${communityPosts.filter(m => m.rank === 'gold').length}`}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {communityPosts.filter(m => m.rank === 'gold').length + 1247}
          </motion.div>
          <div className="text-yellow-400 font-medium">Gold AUREA Members</div>
          <div className="text-gray-400 text-sm mt-1">
            {communityPosts.filter(m => m.rank === 'gold' && m.status === 'approved').length} active posts
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 text-center hover:bg-purple-500/20 transition-all duration-300"
        >
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <motion.div 
            key={`violet-${communityPosts.filter(m => m.rank === 'violet').length}`}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {communityPosts.filter(m => m.rank === 'violet').length + 3892}
          </motion.div>
          <div className="text-purple-400 font-medium">Violet AUREA Members</div>
          <div className="text-gray-400 text-sm mt-1">
            {communityPosts.filter(m => m.rank === 'violet' && m.status === 'approved').length} active posts
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center hover:bg-red-500/20 transition-all duration-300"
        >
          <Users className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <motion.div 
            key={`crimson-${communityPosts.filter(m => m.rank === 'crimson').length}`}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {communityPosts.filter(m => m.rank === 'crimson').length + 8156}
          </motion.div>
          <div className="text-red-400 font-medium">Crimson AUREA Members</div>
          <div className="text-gray-400 text-sm mt-1">
            {communityPosts.filter(m => m.rank === 'crimson' && m.status === 'approved').length} active posts
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCommunity;