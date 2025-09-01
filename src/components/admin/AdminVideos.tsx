import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ExternalLink } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AdminVideos = () => {
  const { videos, addVideo, updateVideo, removeVideo, loading } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return; // Prevent double submission
    
    // Validate form data
    if (!formData.title.trim() || !formData.description.trim() || !formData.url.trim() || !formData.thumbnail.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(formData.url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    try {
      if (editingId) {
        await updateVideo(editingId, formData);
        setEditingId(null);
      } else {
        await addVideo(formData);
        setIsAdding(false);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail: ''
    });
  };

  const startEdit = (video: any) => {
    setFormData({
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail
    });
    setEditingId(video.id);
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await removeVideo(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-400">Loading videos...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Videos</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Add Video</span>
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            {editingId ? 'Edit Video' : 'Add New Video'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Video Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
              <input
                type="url"
                placeholder="YouTube URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                className="px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            
            <input
              type="url"
              placeholder="Thumbnail Image URL"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            />
            
            <textarea
              placeholder="Video Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Add'} Video</span>
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Videos List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-4 hover:border-purple-500/50 transition-colors duration-300"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => startEdit(video)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-all duration-300 text-sm"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(video.id, video.title)}
                className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-all duration-300 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-all duration-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminVideos;