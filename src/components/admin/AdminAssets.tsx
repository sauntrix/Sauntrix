import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Plus, Edit, Trash2, Save, X, Upload, Star, Users, Globe } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AdminAssets = () => {
  const { siteAssets, updateAsset, addAsset, removeAsset, loading } = useContent();
  const [isAdding, setIsAdding] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    asset_key: '',
    asset_type: 'image',
    url: '',
    alt_text: '',
    metadata: {}
  });

  const assetCategories = [
    {
      id: 'branding',
      name: 'Branding & Logo',
      icon: Star,
      assets: ['site_logo', 'favicon', 'og_image']
    },
    {
      id: 'characters',
      name: 'Character Images',
      icon: Users,
      assets: ['lumia_character', 'kira_character', 'riven_character']
    },
    {
      id: 'backgrounds',
      name: 'Backgrounds & Banners',
      icon: Image,
      assets: ['hero_background', 'about_background', 'lore_background']
    },
    {
      id: 'general',
      name: 'General Assets',
      icon: Globe,
      assets: []
    }
  ];

  const assetTypes = [
    'image',
    'logo',
    'icon',
    'background',
    'character_image',
    'social_media',
    'banner'
  ];

  const getAssetsByCategory = (categoryAssets: string[]) => {
    if (categoryAssets.length === 0) {
      // For general category, show assets not in other categories
      const categorizedKeys = assetCategories
        .filter(cat => cat.id !== 'general')
        .flatMap(cat => cat.assets);
      return siteAssets.filter(asset => !categorizedKeys.includes(asset.asset_key));
    }
    return siteAssets.filter(asset => categoryAssets.includes(asset.asset_key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return; // Prevent double submission
    
    if (!formData.asset_key.trim() || !formData.url.trim()) {
      alert('Please fill in asset key and URL');
      return;
    }

    try {
      if (editingKey) {
        await updateAsset(editingKey, formData.url, formData.alt_text, formData.metadata);
        setEditingKey(null);
      } else {
        await addAsset({
          asset_key: formData.asset_key,
          asset_type: formData.asset_type,
          url: formData.url,
          alt_text: formData.alt_text,
          metadata: formData.metadata
        });
        setIsAdding(false);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      asset_key: '',
      asset_type: 'image',
      url: '',
      alt_text: '',
      metadata: {}
    });
  };

  const startEdit = (asset: any) => {
    setFormData({
      asset_key: asset.asset_key,
      asset_type: asset.asset_type,
      url: asset.url,
      alt_text: asset.alt_text,
      metadata: asset.metadata || {}
    });
    setEditingKey(asset.asset_key);
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingKey(null);
    resetForm();
  };

  const handleDelete = async (assetKey: string) => {
    if (window.confirm(`Are you sure you want to delete the asset "${assetKey}"?`)) {
      await removeAsset(assetKey);
    }
  };

  const getAssetPreview = (asset: any) => {
    if (asset.url.startsWith('data:image/svg+xml')) {
      return (
        <div className="w-full h-24 bg-gray-600 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xs">SVG Icon</span>
        </div>
      );
    }
    return (
      <img
        src={asset.url}
        alt={asset.alt_text}
        className="w-full h-24 object-cover rounded-lg"
        onError={(e) => {
          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3Mjg4IiBmb250LXNpemU9IjEyIj5JbWFnZSBFcnJvcjwvdGV4dD48L3N2Zz4=';
        }}
      />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-400">Loading assets...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Asset Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
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
            {editingKey ? 'Edit Asset' : 'Add New Asset'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Asset Key (e.g., site_logo)"
                value={formData.asset_key}
                onChange={(e) => setFormData({ ...formData, asset_key: e.target.value })}
                required
                disabled={!!editingKey}
                className="px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
              />
              <select
                value={formData.asset_type}
                onChange={(e) => setFormData({ ...formData, asset_type: e.target.value })}
                className="px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              >
                {assetTypes.map(type => (
                  <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
            
            <input
              type="url"
              placeholder="Asset URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            />
            
            <input
              type="text"
              placeholder="Alt Text (for accessibility)"
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <Save className="w-4 h-4" />
                <span>{editingKey ? 'Update' : 'Add'} Asset</span>
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

      {/* Asset Categories */}
      <div className="space-y-8">
        {assetCategories.map((category) => {
          const categoryAssets = getAssetsByCategory(category.assets);
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <category.icon className="w-5 h-5 mr-2 text-purple-400" />
                {category.name}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryAssets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-600/50 rounded-lg border border-gray-500/50 p-4 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="mb-3">
                      {getAssetPreview(asset)}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm truncate">{asset.asset_key}</h4>
                      <p className="text-gray-400 text-xs">{asset.asset_type}</p>
                      {asset.alt_text && (
                        <p className="text-gray-300 text-xs line-clamp-2">{asset.alt_text}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEdit(asset)}
                        className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-all duration-300 text-xs"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(asset.asset_key)}
                        className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-all duration-300 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-all duration-300 text-xs"
                      >
                        <Upload className="w-3 h-3" />
                        <span>View</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
                
                {categoryAssets.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-400">
                    No assets in this category yet
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Asset Upload Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20 p-6"
      >
        <h4 className="text-lg font-semibold text-white mb-3">Asset Management Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h5 className="text-purple-400 font-medium mb-2">Recommended Image Sizes:</h5>
            <ul className="space-y-1 text-xs">
              <li>• Logo: 200x200px (SVG preferred)</li>
              <li>• Character Images: 800x800px</li>
              <li>• Backgrounds: 1920x1080px</li>
              <li>• Social Media: 1200x630px</li>
            </ul>
          </div>
          <div>
            <h5 className="text-purple-400 font-medium mb-2">Asset Key Naming:</h5>
            <ul className="space-y-1 text-xs">
              <li>• Use lowercase with underscores</li>
              <li>• Be descriptive: "lumia_character"</li>
              <li>• Avoid spaces and special characters</li>
              <li>• Keep keys unique and memorable</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAssets;