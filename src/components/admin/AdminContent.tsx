import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Edit, X, Globe, FileText, Trash2, Check, Plus, ExternalLink, Home, Users, Music, Video, Scroll, Mail } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AdminContent = () => {
  const { 
    footerContent, 
    siteSettings, 
    pageContent,
    updateFooterContent, 
    updateSiteSettings,
    updatePageContent,
    getPageContent
  } = useContent();
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedFooter, setEditedFooter] = useState(footerContent);
  const [editedSettings, setEditedSettings] = useState(siteSettings);
  const [editedPageContent, setEditedPageContent] = useState<any>({});
  const [selectedPage, setSelectedPage] = useState('home');

  const pages = [
    { id: 'home', name: 'Home Page', icon: Home },
    { id: 'about', name: 'About Page', icon: Users },
    { id: 'lore', name: 'Lore Codex', icon: Scroll },
    { id: 'videos', name: 'Videos Page', icon: Video },
    { id: 'community', name: 'Fan Community', icon: Users },
    { id: 'contact', name: 'Contact Page', icon: Mail },
    { id: 'discography', name: 'Discography', icon: Music }
  ];

  const getPageSections = (pageName: string) => {
    switch (pageName) {
      case 'home':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'subtitle', 'description', 'primaryButton', 'secondaryButton'] },
          { key: 'characters_intro', name: 'Characters Introduction', fields: ['title', 'description'] },
          { key: 'cta', name: 'Call to Action', fields: ['title', 'description', 'buttonText', 'buttonLink'] }
        ];
      case 'about':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'description', 'extendedDescription'] },
          { key: 'characters_section', name: 'Characters Section', fields: ['title', 'description'] },
          { key: 'mission', name: 'Mission Section', fields: ['title', 'description1', 'description2'] }
        ];
      case 'lore':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'description'] },
          { key: 'origin', name: 'Origin Story', fields: ['title', 'description1', 'description2'] },
          { key: 'lumia_arc', name: 'Lumia\'s Arc', fields: ['title', 'description1', 'description2', 'quote'] },
          { key: 'kira_arc', name: 'Kira\'s Arc', fields: ['title', 'description1', 'description2', 'quote'] },
          { key: 'riven_arc', name: 'Riven\'s Arc', fields: ['title', 'description1', 'description2', 'quote'] },
          { key: 'unity', name: 'Unity Section', fields: ['title', 'description1', 'description2'] }
        ];
      case 'videos':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'description'] },
          { key: 'featured_section', name: 'Featured Section', fields: ['title'] },
          { key: 'playlist_section', name: 'Playlist Section', fields: ['title', 'description'] }
        ];
      case 'community':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'description'] },
          { key: 'fan_wall', name: 'Fan Wall', fields: ['title', 'placeholder', 'moderationNote'] },
          { key: 'ranks', name: 'AUREA Ranks', fields: ['title', 'gold', 'violet', 'crimson'] }
        ];
      case 'contact':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'description'] },
          { key: 'form_section', name: 'Contact Form', fields: ['title', 'namePlaceholder', 'emailPlaceholder', 'messagePlaceholder', 'submitText'] },
          { key: 'business_contact', name: 'Business Contact', fields: ['title', 'email'] },
          { key: 'social_section', name: 'Social Section', fields: ['title'] },
          { key: 'response_time', name: 'Response Time', fields: ['title', 'description'] }
        ];
      case 'discography':
        return [
          { key: 'hero', name: 'Hero Section', fields: ['title', 'description'] }
        ];
      default:
        return [];
    }
  };

  const handleSaveSettings = () => {
    updateSiteSettings(editedSettings);
    setIsEditing(null);
  };

  const handleSaveFooter = () => {
    updateFooterContent(editedFooter);
    setIsEditing(null);
  };

  const handleSavePageContent = async (pageName: string, sectionKey: string) => {
    const content = editedPageContent[`${pageName}_${sectionKey}`];
    if (content) {
      await updatePageContent(pageName, sectionKey, content);
      setIsEditing(null);
      setEditedPageContent({});
    }
  };

  const startEditPageContent = (pageName: string, sectionKey: string) => {
    const content = getPageContent(pageName, sectionKey);
    setEditedPageContent({
      [`${pageName}_${sectionKey}`]: content || {}
    });
    setIsEditing(`${pageName}_${sectionKey}`);
  };

  const updateEditedPageContent = (pageName: string, sectionKey: string, field: string, value: any) => {
    const key = `${pageName}_${sectionKey}`;
    setEditedPageContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const handleAddSocialLink = () => {
    const newLink = {
      id: Date.now().toString(),
      platform: '',
      url: '',
      icon: 'ExternalLink'
    };
    setEditedFooter({
      ...editedFooter,
      socialLinks: [...editedFooter.socialLinks, newLink]
    });
  };

  const handleUpdateSocialLink = (id: string, field: string, value: string) => {
    setEditedFooter({
      ...editedFooter,
      socialLinks: editedFooter.socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    });
  };

  const handleRemoveSocialLink = (id: string) => {
    setEditedFooter({
      ...editedFooter,
      socialLinks: editedFooter.socialLinks.filter(link => link.id !== id)
    });
  };

  const iconOptions = [
    'Twitter', 'Instagram', 'Music', 'Mail', 'ExternalLink', 'Globe', 'Youtube', 'Facebook'
  ];

  const renderFieldInput = (pageName: string, sectionKey: string, field: string, value: any) => {
    const key = `${pageName}_${sectionKey}`;
    
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">{field}</label>
          {Object.entries(value).map(([subField, subValue]) => (
            <div key={subField} className="ml-4">
              <label className="block text-xs text-gray-400 mb-1">{subField}</label>
              <input
                type="text"
                value={typeof subValue === 'string' ? subValue : JSON.stringify(subValue)}
                onChange={(e) => {
                  const newValue = { ...value, [subField]: e.target.value };
                  updateEditedPageContent(pageName, sectionKey, field, newValue);
                }}
                className="w-full px-3 py-2 bg-gray-600/50 border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          ))}
        </div>
      );
    }

    if (field.includes('description') || field.includes('Description') || field === 'quote') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">{field}</label>
          <textarea
            value={value || ''}
            onChange={(e) => updateEditedPageContent(pageName, sectionKey, field, e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
          />
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{field}</label>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => updateEditedPageContent(pageName, sectionKey, field, e.target.value)}
          className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
        />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Content Management</h2>

      {/* Page Content Management */}
      <div className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-400" />
          Page Content Management
        </h3>

        {/* Page Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Select Page to Edit</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-300 ${
                  selectedPage === page.id
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                    : 'bg-gray-600/30 text-gray-400 border-gray-500/30 hover:border-gray-400/50'
                }`}
              >
                <page.icon className="w-5 h-5 mb-1" />
                <span className="text-xs text-center">{page.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Page Sections */}
        <div className="space-y-6">
          {getPageSections(selectedPage).map((section) => {
            const sectionContent = getPageContent(selectedPage, section.key);
            const editKey = `${selectedPage}_${section.key}`;
            const isEditingSection = isEditing === editKey;

            return (
              <div key={section.key} className="bg-gray-600/30 rounded-lg border border-gray-500/30 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{section.name}</h4>
                  {isEditingSection ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSavePageContent(selectedPage, section.key)}
                        disabled={loading}
                        className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          setEditedPageContent({});
                        }}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditPageContent(selectedPage, section.key)}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {isEditingSection ? (
                  <div className="space-y-4">
                    {section.fields.map((field) => {
                      const currentValue = editedPageContent[editKey]?.[field] || sectionContent?.[field];
                      return (
                        <div key={field}>
                          {renderFieldInput(selectedPage, section.key, field, currentValue)}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {section.fields.map((field) => {
                      const value = sectionContent?.[field];
                      return (
                        <div key={field}>
                          <span className="text-gray-400 text-sm">{field}:</span>
                          <p className="text-white">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : (value || 'Not set')}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Globe className="w-5 h-5 mr-2 text-purple-400" />
            Site Settings
          </h3>
          {isEditing === 'settings' ? (
            <div className="flex gap-2">
              <button
                onClick={handleSaveSettings}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(null);
                  setEditedSettings(siteSettings);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing('settings')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {isEditing === 'settings' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site Title</label>
              <input
                type="text"
                value={editedSettings.siteTitle}
                onChange={(e) => setEditedSettings({ ...editedSettings, siteTitle: e.target.value })}
                className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
              <textarea
                value={editedSettings.metaDescription}
                onChange={(e) => setEditedSettings({ ...editedSettings, metaDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
              <input
                type="email"
                value={editedSettings.contactEmail}
                onChange={(e) => setEditedSettings({ ...editedSettings, contactEmail: e.target.value })}
                className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-sm">Title:</span>
              <p className="text-white">{siteSettings.siteTitle}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Description:</span>
              <p className="text-white">{siteSettings.metaDescription}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Contact:</span>
              <p className="text-white">{siteSettings.contactEmail}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Content Management */}
      <div className="bg-gray-700/50 rounded-xl border border-gray-600/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-400" />
            Footer Content
          </h3>
          {isEditing === 'footer' ? (
            <div className="flex gap-2">
              <button
                onClick={handleSaveFooter}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(null);
                  setEditedFooter(footerContent);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing('footer')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {isEditing === 'footer' ? (
          <div className="space-y-6">
            {/* Basic Footer Content */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                <input
                  type="text"
                  value={editedFooter.tagline}
                  onChange={(e) => setEditedFooter({ ...editedFooter, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editedFooter.description}
                  onChange={(e) => setEditedFooter({ ...editedFooter, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={editedFooter.copyrightText}
                  onChange={(e) => setEditedFooter({ ...editedFooter, copyrightText: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Made With Text</label>
                <input
                  type="text"
                  value={editedFooter.madeWithText}
                  onChange={(e) => setEditedFooter({ ...editedFooter, madeWithText: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">Social Media Links</label>
                <button
                  onClick={handleAddSocialLink}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all duration-300 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Link</span>
                </button>
              </div>
              <div className="space-y-3">
                {editedFooter.socialLinks.map((link, index) => (
                  <div key={link.id} className="flex gap-3 p-3 bg-gray-600/30 rounded-lg border border-gray-500/30">
                    <select
                      value={link.icon}
                      onChange={(e) => handleUpdateSocialLink(link.id, 'icon', e.target.value)}
                      className="px-3 py-2 bg-gray-600/50 border border-gray-500/50 rounded text-white focus:outline-none focus:border-purple-500/50"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Platform name"
                      value={link.platform}
                      onChange={(e) => handleUpdateSocialLink(link.id, 'platform', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => handleUpdateSocialLink(link.id, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    />
                    <button
                      onClick={() => handleRemoveSocialLink(link.id)}
                      className="px-3 py-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Footer Content Display */}
            <div className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Tagline:</span>
                <p className="text-white">{footerContent.tagline}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Description:</span>
                <p className="text-white">{footerContent.description}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Copyright:</span>
                <p className="text-white">{footerContent.copyrightText}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Made With Text:</span>
                <p className="text-white">{footerContent.madeWithText}</p>
              </div>
            </div>

            {/* Social Links Display */}
            <div>
              <span className="text-gray-400 text-sm block mb-3">Social Media Links:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {footerContent.socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center space-x-3 p-3 bg-gray-600/30 rounded-lg border border-gray-500/30">
                    <span className="text-purple-400 font-medium">{link.platform}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span className="text-sm truncate">{link.url}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;