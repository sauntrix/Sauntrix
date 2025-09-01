import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, DiscographyItem, VideoItem, CommunityPost, FanartItem, PageContent, SiteAsset } from '../lib/supabase';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface FooterContent {
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  copyrightText: string;
  madeWithText: string;
}

interface SiteSettingsType {
  siteTitle: string;
  metaDescription: string;
  contactEmail: string;
}

interface ContentContextType {
  discography: DiscographyItem[];
  videos: VideoItem[];
  communityPosts: CommunityPost[];
  fanart: FanartItem[];
  siteAssets: SiteAsset[];
  pageContent: Record<string, Record<string, any>>;
  footerContent: FooterContent;
  siteSettings: SiteSettingsType;
  loading: boolean;
  // Discography methods
  addDiscographyItem: (item: Omit<DiscographyItem, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateDiscographyItem: (id: string, item: Partial<DiscographyItem>) => Promise<void>;
  removeDiscographyItem: (id: string) => Promise<void>;
  // Video methods
  addVideo: (video: Omit<VideoItem, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateVideo: (id: string, video: Partial<VideoItem>) => Promise<void>;
  removeVideo: (id: string) => Promise<void>;
  // Community methods
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'created_at'>) => Promise<void>;
  updateCommunityPostStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  removeCommunityPost: (id: string) => Promise<void>;
  // Fanart methods
  addFanart: (fanart: Omit<FanartItem, 'id' | 'created_at'>) => Promise<void>;
  updateFanartStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  removeFanart: (id: string) => Promise<void>;
  // Settings methods
  updateFooterContent: (content: Partial<FooterContent>) => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettingsType>) => Promise<void>;
  // Page content methods
  updatePageContent: (pageName: string, sectionKey: string, content: any) => Promise<void>;
  getPageContent: (pageName: string, sectionKey: string) => any;
  // Asset methods
  updateAsset: (assetKey: string, url: string, altText?: string, metadata?: any) => Promise<void>;
  getAsset: (assetKey: string) => SiteAsset | null;
  addAsset: (asset: Omit<SiteAsset, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  removeAsset: (assetKey: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [discography, setDiscography] = useState<DiscographyItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [fanart, setFanart] = useState<FanartItem[]>([]);
  const [siteAssets, setSiteAssets] = useState<SiteAsset[]>([]);
  const [pageContent, setPageContent] = useState<Record<string, Record<string, any>>>({});
  const [loading, setLoading] = useState(true);
  
  const [footerContent, setFooterContent] = useState<FooterContent>({
    tagline: 'Stronger Together, Shining Forever',
    description: 'A virtual K-pop trio blending anime fantasy with idol artistry. Three guardians united by destiny to inspire fans worldwide through music and stories.',
    socialLinks: [
      { id: '1', platform: 'Twitter', url: 'https://twitter.com/sauntrix', icon: 'Twitter' },
      { id: '2', platform: 'Instagram', url: 'https://instagram.com/sauntrix', icon: 'Instagram' },
      { id: '3', platform: 'TikTok', url: 'https://tiktok.com/@sauntrix', icon: 'Music' },
      { id: '4', platform: 'Email', url: 'mailto:contact@sauntrix.com', icon: 'Mail' }
    ],
    copyrightText: 'SAUNTRIX. All rights reserved.',
    madeWithText: 'Made with ❤️ for AUREA'
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettingsType>({
    siteTitle: 'SAUNTRIX - Stronger Together, Shining Forever',
    metaDescription: 'SAUNTRIX - Virtual K-pop trio blending anime fantasy with idol artistry. Lumia, Kira, and Riven unite to inspire fans worldwide.',
    contactEmail: 'contact@sauntrix.com'
  });

  // Load initial data
  useEffect(() => {
    const initializeData = async () => {
      await loadAllData();
      const cleanup = setupRealtimeSubscriptions();
      
      // Return cleanup function
      return cleanup;
    };

    let cleanup: (() => void) | undefined;
    
    initializeData().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is properly configured
      if (!supabase) {
        console.warn('Supabase not configured, using fallback data');
        setLoading(false);
        return;
      }

      // Test Supabase connection first
      try {
        await supabase.from('discography').select('count', { count: 'exact', head: true });
      } catch (connectionError) {
        console.warn('Supabase connection failed, using fallback data:', connectionError);
        setLoading(false);
        return;
      }

      // Load all data in parallel
      const dataPromises = [
        supabase.from('discography').select('*').order('release_date', { ascending: false }).then(res => ({ type: 'discography', data: res })),
        supabase.from('videos').select('*').order('created_at', { ascending: false }).then(res => ({ type: 'videos', data: res })),
        supabase.from('community_posts').select('*').order('created_at', { ascending: false }).then(res => ({ type: 'community', data: res })),
        supabase.from('fanart').select('*').order('created_at', { ascending: false }).then(res => ({ type: 'fanart', data: res })),
        supabase.from('site_assets').select('*').order('asset_key').then(res => ({ type: 'assets', data: res })),
        supabase.from('site_settings').select('*').then(res => ({ type: 'settings', data: res })),
        supabase.from('page_content').select('*').then(res => ({ type: 'pageContent', data: res }))
      ];

      const results = await Promise.allSettled(dataPromises);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { type, data } = result.value;
          if (data.error) {
            console.warn(`Error loading ${type}:`, data.error);
            return;
          }
          
          switch (type) {
            case 'discography':
              if (data.data) setDiscography(data.data);
              break;
            case 'videos':
              if (data.data) setVideos(data.data);
              break;
            case 'community':
              if (data.data) setCommunityPosts(data.data);
              break;
            case 'fanart':
              if (data.data) setFanart(data.data);
              break;
            case 'assets':
              if (data.data) setSiteAssets(data.data);
              break;
            case 'settings':
              if (data.data && data.data.length > 0) {
                data.data.forEach(setting => {
                  if (setting.key === 'footer_content') {
                    setFooterContent(setting.value);
                  } else if (setting.key === 'site_settings') {
                    setSiteSettings(setting.value);
                  }
                });
              }
              break;
            case 'pageContent':
              if (data.data) {
                const contentMap: Record<string, Record<string, any>> = {};
                data.data.forEach((item: PageContent) => {
                  if (!contentMap[item.page_name]) {
                    contentMap[item.page_name] = {};
                  }
                  contentMap[item.page_name][item.section_key] = item.content;
                });
                setPageContent(contentMap);
              }
              break;
          }
        } else {
          console.warn('Failed to load data:', result.reason);
        }
      });

    } catch (error: any) {
      console.error('Error loading data:', error);
      // Continue with default data instead of breaking the app
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!supabase) return;

    const subscriptions: any[] = [];

    // Subscribe to discography changes
    const discographySubscription = supabase
      .channel('discography_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'discography' }, (payload) => {
        console.log('Discography change:', payload);
        if (payload.eventType === 'INSERT') {
          setDiscography(prev => [payload.new as DiscographyItem, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setDiscography(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new as DiscographyItem : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setDiscography(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();
    subscriptions.push(discographySubscription);

    // Subscribe to videos changes
    const videosSubscription = supabase
      .channel('videos_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, (payload) => {
        console.log('Videos change:', payload);
        if (payload.eventType === 'INSERT') {
          setVideos(prev => [payload.new as VideoItem, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setVideos(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new as VideoItem : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setVideos(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();
    subscriptions.push(videosSubscription);

    // Subscribe to community posts changes
    const communitySubscription = supabase
      .channel('community_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, (payload) => {
        console.log('Community change:', payload);
        if (payload.eventType === 'INSERT') {
          setCommunityPosts(prev => [payload.new as CommunityPost, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setCommunityPosts(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new as CommunityPost : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setCommunityPosts(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();
    subscriptions.push(communitySubscription);

    // Subscribe to fanart changes
    const fanartSubscription = supabase
      .channel('fanart_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fanart' }, (payload) => {
        console.log('Fanart change:', payload);
        if (payload.eventType === 'INSERT') {
          setFanart(prev => [payload.new as FanartItem, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setFanart(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new as FanartItem : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setFanart(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();
    subscriptions.push(fanartSubscription);

    // Subscribe to site settings changes
    const settingsSubscription = supabase
      .channel('settings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
        console.log('Settings change:', payload);
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          const setting = payload.new;
          if (setting.key === 'footer_content') {
            setFooterContent(setting.value);
          } else if (setting.key === 'site_settings') {
            setSiteSettings(setting.value);
          }
        }
      })
      .subscribe();
    subscriptions.push(settingsSubscription);

    // Subscribe to site assets changes
    const assetsSubscription = supabase
      .channel('assets_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_assets' }, (payload) => {
        console.log('Assets change:', payload);
        if (payload.eventType === 'INSERT') {
          setSiteAssets(prev => [...prev, payload.new as SiteAsset]);
        } else if (payload.eventType === 'UPDATE') {
          setSiteAssets(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new as SiteAsset : item
          ));
        } else if (payload.eventType === 'DELETE') {
          setSiteAssets(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();
    subscriptions.push(assetsSubscription);

    // Subscribe to page content changes
    const pageContentSubscription = supabase
      .channel('page_content_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_content' }, (payload) => {
        console.log('Page content change:', payload);
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const item = payload.new as PageContent;
          setPageContent(prev => ({
            ...prev,
            [item.page_name]: {
              ...prev[item.page_name],
              [item.section_key]: item.content
            }
          }));
        } else if (payload.eventType === 'DELETE') {
          const item = payload.old as PageContent;
          setPageContent(prev => {
            const newContent = { ...prev };
            if (newContent[item.page_name]) {
              delete newContent[item.page_name][item.section_key];
            }
            return newContent;
          });
        }
      })
      .subscribe();
    subscriptions.push(pageContentSubscription);

    // Return cleanup function
    return () => {
      subscriptions.forEach(subscription => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        }
      });
    };
  };

  // Page content methods
  const updatePageContent = async (pageName: string, sectionKey: string, content: any) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      setLoading(true);
      const { error } = await supabase
        .from('page_content')
        .upsert({ 
          page_name: pageName, 
          section_key: sectionKey, 
          content 
        }, { 
          onConflict: 'page_name,section_key' 
        });
      
      if (error) throw error;
      
      // Update local state
      setPageContent(prev => ({
        ...prev,
        [pageName]: {
          ...prev[pageName],
          [sectionKey]: content
        }
      }));
      
      showNotification('Content updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating page content:', error);
      showNotification('Failed to update content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPageContent = (pageName: string, sectionKey: string) => {
    return pageContent[pageName]?.[sectionKey] || null;
  };

  // Asset methods
  const updateAsset = async (assetKey: string, url: string, altText?: string, metadata?: any) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      setLoading(true);
      const { error } = await supabase
        .from('site_assets')
        .upsert({ 
          asset_key: assetKey, 
          url, 
          alt_text: altText || '',
          metadata: metadata || {}
        }, { 
          onConflict: 'asset_key' 
        });
      
      if (error) throw error;
      
      // Update local state immediately
      setSiteAssets(prev => {
        const existing = prev.find(asset => asset.asset_key === assetKey);
        if (existing) {
          return prev.map(asset => 
            asset.asset_key === assetKey 
              ? { ...asset, url, alt_text: altText || '', metadata: metadata || {} }
              : asset
          );
        } else {
          return [...prev, {
            id: Date.now().toString(),
            asset_key: assetKey,
            asset_type: 'image',
            url,
            alt_text: altText || '',
            metadata: metadata || {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }];
        }
      });
      
      showNotification('Asset updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating asset:', error);
      showNotification('Failed to update asset', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getAsset = (assetKey: string): SiteAsset | null => {
    return siteAssets.find(asset => asset.asset_key === assetKey) || null;
  };

  const addAsset = async (asset: Omit<SiteAsset, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('site_assets')
        .insert([asset]);
      
      if (error) throw error;
      showNotification('Asset added successfully!', 'success');
    } catch (error) {
      console.error('Error adding asset:', error);
      showNotification('Failed to add asset', 'error');
    }
  };

  const removeAsset = async (assetKey: string) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('site_assets')
        .delete()
        .eq('asset_key', assetKey);
      
      if (error) throw error;
      showNotification('Asset deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting asset:', error);
      showNotification('Failed to delete asset', 'error');
    }
  };

  // Discography methods
  const addDiscographyItem = async (item: Omit<DiscographyItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      setLoading(true);
      const { error } = await supabase
        .from('discography')
        .insert([item]);
      
      if (error) throw error;
      showNotification('Album added successfully!', 'success');
    } catch (error) {
      console.error('Error adding discography item:', error);
      showNotification('Failed to add album', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateDiscographyItem = async (id: string, item: Partial<DiscographyItem>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      setLoading(true);
      const { error } = await supabase
        .from('discography')
        .update(item)
        .eq('id', id);
      
      if (error) throw error;
      showNotification('Album updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating discography item:', error);
      showNotification('Failed to update album', 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeDiscographyItem = async (id: string) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('discography')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      showNotification('Album deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting discography item:', error);
      showNotification('Failed to delete album', 'error');
    }
  };

  // Video methods
  const addVideo = async (video: Omit<VideoItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      setLoading(true);
      const { error } = await supabase
        .from('videos')
        .insert([video]);
      
      if (error) throw error;
      showNotification('Video added successfully!', 'success');
    } catch (error) {
      console.error('Error adding video:', error);
      showNotification('Failed to add video', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateVideo = async (id: string, video: Partial<VideoItem>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('videos')
        .update(video)
        .eq('id', id);
      
      if (error) throw error;
      showNotification('Video updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating video:', error);
      showNotification('Failed to update video', 'error');
    }
  };

  const removeVideo = async (id: string) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      showNotification('Video deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting video:', error);
      showNotification('Failed to delete video', 'error');
    }
  };

  // Community methods
  const addCommunityPost = async (post: Omit<CommunityPost, 'id' | 'created_at'>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('community_posts')
        .insert([post]);
      
      if (error) throw error;
      showNotification('Message posted successfully!', 'success');
    } catch (error) {
      console.error('Error adding community post:', error);
      showNotification('Failed to post message', 'error');
    }
  };

  const updateCommunityPostStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('community_posts')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      showNotification(`Message ${status} successfully!`, 'success');
    } catch (error) {
      console.error('Error updating community post:', error);
      showNotification('Failed to update message status', 'error');
    }
  };

  const removeCommunityPost = async (id: string) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      showNotification('Message deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting community post:', error);
      showNotification('Failed to delete message', 'error');
    }
  };

  // Fanart methods
  const addFanart = async (fanartItem: Omit<FanartItem, 'id' | 'created_at'>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('fanart')
        .insert([fanartItem]);
      
      if (error) throw error;
      showNotification('Fanart submitted successfully!', 'success');
    } catch (error) {
      console.error('Error adding fanart:', error);
      showNotification('Failed to submit fanart', 'error');
    }
  };

  const updateFanartStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('fanart')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      showNotification(`Fanart ${status} successfully!`, 'success');
    } catch (error) {
      console.error('Error updating fanart:', error);
      showNotification('Failed to update fanart status', 'error');
    }
  };

  const removeFanart = async (id: string) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const { error } = await supabase
        .from('fanart')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      showNotification('Fanart deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting fanart:', error);
      showNotification('Failed to delete fanart', 'error');
    }
  };

  // Settings methods
  const updateFooterContent = async (content: Partial<FooterContent>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const updatedContent = { ...footerContent, ...content };
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'footer_content', value: updatedContent }, { onConflict: 'key' });
      
      if (error) throw error;
      setFooterContent(updatedContent);
      showNotification('Footer content updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating footer content:', error);
      showNotification('Failed to update footer content', 'error');
    }
  };

  const updateSiteSettings = async (settings: Partial<SiteSettingsType>) => {
    try {
      if (!supabase) throw new Error('Database not available');
      
      const updatedSettings = { ...siteSettings, ...settings };
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'site_settings', value: updatedSettings }, { onConflict: 'key' });
      
      if (error) throw error;
      setSiteSettings(updatedSettings);
      showNotification('Site settings updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating site settings:', error);
      showNotification('Failed to update site settings', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    });
    
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30';
    notification.className = `notification-toast fixed top-24 right-4 ${bgColor} border rounded-lg p-3 z-50 backdrop-blur-lg transition-all duration-300 transform translate-x-0`;
    notification.textContent = message;
    
    // Add slide-in animation
    notification.style.transform = 'translateX(100%)';
    document.body.appendChild(notification);
    
    // Trigger slide-in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-remove with slide-out
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2700);
  };

  return (
    <ContentContext.Provider value={{
      discography,
      videos,
      communityPosts,
      fanart,
      siteAssets,
      pageContent,
      footerContent,
      siteSettings,
      loading,
      addDiscographyItem,
      updateDiscographyItem,
      removeDiscographyItem,
      addVideo,
      updateVideo,
      removeVideo,
      addCommunityPost,
      updateCommunityPostStatus,
      removeCommunityPost,
      addFanart,
      updateFanartStatus,
      removeFanart,
      updateFooterContent,
      updateSiteSettings,
      updatePageContent,
      getPageContent,
      updateAsset,
      getAsset,
      addAsset,
      removeAsset
    }}>
      {children}
    </ContentContext.Provider>
  );
};