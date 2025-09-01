import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ExternalLink } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AdminDiscography = () => {
  const { discography, addDiscographyItem, updateDiscographyItem, removeDiscographyItem, loading } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover: '',
    release_date: '',
    streaming_links: [{ platform: '', url: '' }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return; // Prevent double submission
    
    // Validate form data
    if (!formData.title.trim() || !formData.description.trim() || !formData.cover.trim() || !formData.release_date) {
      alert('Please fill in all required fields');
      return;
    }

    // Filter out empty streaming links
    const validStreamingLinks = formData.streaming_links.filter(
      link => link.platform.trim() && link.url.trim()
    );

    const submissionData = {
      ...formData,
      streaming_links: validStreamingLinks.length > 0 ? validStreamingLinks : [{ platform: 'Spotify', url: '#' }]
    };

    try {
      if (editingId) {
        await updateDiscographyItem(editingId, submissionData);
        setEditingId(null);
      } else {
        await addDiscographyItem(submissionData);
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
      cover: '',
      release_date: '',
      streaming_links: [{ platform: '', url: '' }]
    });
  };

  const startEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description,
      cover: item.cover,
      release_date: item.release_date,
      streaming_links: item.streaming_links || [{ platform: '', url: '' }]
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const addStreamingLink = () => {
    setFormData({
      ...formData,
      streaming_links: [...formData.streaming_links, { platform: '', url: '' }]
    });
  };

  const updateStreamingLink = (index: number, field: string, value: string) => {
    const updatedLinks = formData.streaming_links.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    );
    setFormData({ ...formData, streaming_links: updatedLinks });
  };

  const removeStreamingLink = (index: number) => {
    if (formData.streaming_links.length <= 1) return;
    setFormData({
      ...formData,
      streaming_links: formData.streaming_links.filter((_, i) => i !== index)
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await removeDiscographyItem(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-400">Loading discography...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Discography</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Add Album</span>
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
            {editingId ? 'Edit Album' : 'Add New Album'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Album Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
              <input
                type="date"
                value={formData.release_date}
                onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                required
                className="px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            
            <input
              type="url"
              placeholder="Cover Image URL"
              value={formData.cover}
              onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            />
            
            <textarea
              placeholder="Album Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
            />

            {/* Streaming Links */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-medium">Streaming Links</label>
                <button
                  type="button"
                  onClick={addStreamingLink}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Link
                </button>
              </div>
              {formData.streaming_links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g., Spotify)"
                    value={link.platform}
                    onChange={(e) => updateStreamingLink(index, 'platform', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => updateStreamingLink(index, 'url', e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                  />
                  {formData.streaming_links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStreamingLink(index)}
                      className="px-3 py-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Add'} Album</span>
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

      {/* Albums List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discography.map((album, index) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-4 hover:border-purple-500/50 transition-colors duration-300"
          >
            <img
              src={album.cover}
              alt={album.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-white mb-2">{album.title}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{album.description}</p>
            <p className="text-gray-300 text-sm mb-4">Released: {album.release_date}</p>
            
            {/* Streaming Links */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {album.streaming_links?.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs hover:bg-purple-500/30 transition-colors duration-300"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(album)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-all duration-300 text-sm"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(album.id, album.title)}
                className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-all duration-300 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDiscography;