import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Running in offline mode.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface DiscographyItem {
  id: string;
  title: string;
  description: string;
  cover: string;
  release_date: string;
  streaming_links: { platform: string; url: string }[];
  created_at: string;
  updated_at: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityPost {
  id: string;
  user_name: string;
  message: string;
  rank: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface FanartItem {
  id: string;
  title: string;
  artist: string;
  image_url: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_name: string;
  section_key: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export interface SiteAsset {
  id: string;
  asset_key: string;
  asset_type: string;
  url: string;
  alt_text: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}