/*
  # SAUNTRIX Database Schema

  1. New Tables
    - `discography`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `cover` (text, image URL)
      - `release_date` (date)
      - `streaming_links` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `url` (text)
      - `thumbnail` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `community_posts`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `message` (text)
      - `rank` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    
    - `fanart`
      - `id` (uuid, primary key)
      - `title` (text)
      - `artist` (text)
      - `image_url` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access and authenticated admin write access

  3. Real-time
    - Enable real-time subscriptions for all tables
*/

-- Discography table
CREATE TABLE IF NOT EXISTS discography (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  cover text NOT NULL,
  release_date date NOT NULL,
  streaming_links jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  thumbnail text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  message text NOT NULL,
  rank text NOT NULL DEFAULT 'crimson',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Fanart table
CREATE TABLE IF NOT EXISTS fanart (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE discography ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fanart ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Public can read discography"
  ON discography
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read approved community posts"
  ON community_posts
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Public can read approved fanart"
  ON fanart
  FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Public can read site settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

-- Policies for authenticated users (admins)
CREATE POLICY "Authenticated users can manage discography"
  ON discography
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage videos"
  ON videos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage community posts"
  ON community_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage fanart"
  ON fanart
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for public to insert community posts and fanart
CREATE POLICY "Public can insert community posts"
  ON community_posts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can insert fanart"
  ON fanart
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert initial data
INSERT INTO discography (title, description, cover, release_date, streaming_links) VALUES
('Stronger Together', 'Our debut single celebrating empowerment and unity. A powerful anthem that launched SAUNTRIX into the hearts of fans worldwide.', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', '2024-01-15', '[{"platform": "Spotify", "url": "#"}, {"platform": "Apple Music", "url": "#"}, {"platform": "YouTube Music", "url": "#"}]'),
('Golden', 'A triumphant track about rising from hardships and finding your inner light. Lumia''s vocals shine brightest in this emotional journey.', 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg', '2024-03-22', '[{"platform": "Spotify", "url": "#"}, {"platform": "Apple Music", "url": "#"}]'),
('No Limits', 'An explosive anthem about breaking boundaries and defying expectations. Features Kira''s most powerful rap verses to date.', 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg', '2024-06-10', '[{"platform": "Spotify", "url": "#"}, {"platform": "Apple Music", "url": "#"}, {"platform": "SoundCloud", "url": "#"}]'),
('Untouchable', 'A fierce declaration of resilience and inner strength. Riven''s choreography reaches new heights in this powerful performance.', 'https://images.pexels.com/photos/1190295/pexels-photo-1190295.jpeg', '2024-09-05', '[{"platform": "Spotify", "url": "#"}, {"platform": "YouTube Music", "url": "#"}]'),
('Starlight Path', 'A hopeful ballad about destiny and following your dreams. The perfect harmony of all three voices creates magic.', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', '2024-12-18', '[{"platform": "Spotify", "url": "#"}, {"platform": "Apple Music", "url": "#"}, {"platform": "YouTube Music", "url": "#"}, {"platform": "SoundCloud", "url": "#"}]');

INSERT INTO videos (title, description, url, thumbnail) VALUES
('Stronger Together', 'Our debut music video showcasing the birth of SAUNTRIX and the power of unity.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'),
('Golden', 'A visual journey through Lumia''s transformation from doubt to radiant confidence.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg'),
('No Limits', 'An explosive visual feast featuring Kira''s electric energy and boundary-breaking spirit.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'),
('Untouchable', 'Riven''s fierce choreography takes center stage in this powerful display of resilience.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/1190295/pexels-photo-1190295.jpeg'),
('Starlight Path', 'A cinematic ballad showcasing the trio''s perfect harmony and shared destiny.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg');

INSERT INTO community_posts (user_name, message, rank, status) VALUES
('StarGazer_Luna', 'SAUNTRIX saved my life with their music! Forever grateful 💛', 'gold', 'approved'),
('ElectricKira_Fan', 'Kira''s rap in "No Limits" gives me chills every time! 💜', 'violet', 'approved'),
('CrimsonFlame88', 'Riven''s dance moves are absolutely fire! Can''t wait for the next comeback! 🔥', 'crimson', 'approved');

INSERT INTO fanart (title, artist, image_url, status) VALUES
('SAUNTRIX Trinity', 'ArtisticFan_123', 'https://images.pexels.com/photos/1074746/pexels-photo-1074746.jpeg', 'approved'),
('Lumia Portrait', 'GoldenLight_Artist', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 'approved');

INSERT INTO site_settings (key, value) VALUES
('footer_content', '{
  "tagline": "Stronger Together, Shining Forever",
  "description": "A virtual K-pop trio blending anime fantasy with idol artistry. Three guardians united by destiny to inspire fans worldwide through music and stories.",
  "socialLinks": [
    {"id": "1", "platform": "Twitter", "url": "https://twitter.com/sauntrix", "icon": "Twitter"},
    {"id": "2", "platform": "Instagram", "url": "https://instagram.com/sauntrix", "icon": "Instagram"},
    {"id": "3", "platform": "TikTok", "url": "https://tiktok.com/@sauntrix", "icon": "Music"},
    {"id": "4", "platform": "Email", "url": "mailto:contact@sauntrix.com", "icon": "Mail"}
  ],
  "copyrightText": "SAUNTRIX. All rights reserved.",
  "madeWithText": "Made with ❤️ for AUREA"
}'),
('site_settings', '{
  "siteTitle": "SAUNTRIX - Stronger Together, Shining Forever",
  "metaDescription": "SAUNTRIX - Virtual K-pop trio blending anime fantasy with idol artistry. Lumia, Kira, and Riven unite to inspire fans worldwide.",
  "contactEmail": "contact@sauntrix.com"
}');

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_discography_updated_at BEFORE UPDATE ON discography FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();