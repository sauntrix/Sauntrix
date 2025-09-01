import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Music, Video, Users, FileText, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminDiscography from '../components/admin/AdminDiscography';
import AdminVideos from '../components/admin/AdminVideos';
import AdminCommunity from '../components/admin/AdminCommunity';
import AdminContent from '../components/admin/AdminContent';
import AdminAssets from '../components/admin/AdminAssets';

const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('discography');

  const tabs = [
    { id: 'discography', label: 'Discography', icon: Music },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'content', label: 'Site Content', icon: FileText },
    { id: 'assets', label: 'Assets & Images', icon: Globe }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'discography':
        return <AdminDiscography />;
      case 'videos':
        return <AdminVideos />;
      case 'community':
        return <AdminCommunity />;
      case 'content':
        return <AdminContent />;
      case 'assets':
        return <AdminAssets />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-white flex items-center">
              <Settings className="w-8 h-8 mr-3 text-purple-400" />
              Admin Panel
            </h1>
            <p className="text-gray-400 mt-2">Manage SAUNTRIX content and community</p>
          </motion.div>

          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 mb-8"
        >
          <div className="flex flex-wrap border-b border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8"
        >
          {renderContent()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Admin;