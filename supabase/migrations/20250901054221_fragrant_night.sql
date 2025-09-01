/*
  # Add comprehensive page content management

  1. New Tables
    - `page_content`
      - `id` (uuid, primary key)
      - `page_name` (text, unique) - identifies which page (home, about, lore, etc.)
      - `section_key` (text) - identifies which section of the page
      - `content` (jsonb) - flexible content storage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `page_content` table
    - Add policy for authenticated users to manage content
    - Add policy for public users to read content

  3. Initial Data
    - Populate with default content for all pages
*/

-- Create page_content table
CREATE TABLE IF NOT EXISTS page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name text NOT NULL,
  section_key text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_name, section_key)
);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can manage page content"
  ON page_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read page content"
  ON page_content
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_page_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_page_content_updated_at();

-- Insert default content for all pages
INSERT INTO page_content (page_name, section_key, content) VALUES
-- Home page content
('home', 'hero', '{
  "title": "SAUNTRIX",
  "subtitle": "Stronger Together, Shining Forever",
  "description": "Virtual K-pop trio blending anime fantasy with idol artistry",
  "primaryButton": {"text": "🎵 Watch Latest MV", "link": "/videos"},
  "secondaryButton": {"text": "🌠 Join AUREA", "link": "/community"}
}'),
('home', 'characters_intro', '{
  "title": "Meet the Trio",
  "description": "Three souls united by destiny, each wielding their unique aura to inspire and protect"
}'),
('home', 'cta', '{
  "title": "Ready to Join the AUREA?",
  "description": "Discover the lore, experience the music, and become part of our growing community",
  "buttonText": "Learn More About Us",
  "buttonLink": "/about"
}'),

-- About page content
('about', 'hero', '{
  "title": "About SAUNTRIX",
  "description": "SAUNTRIX is a virtual K-pop–inspired trio that blends anime fantasy with idol artistry. Each member represents a fundamental force of inspiration: light, spark, and fire — united to inspire fans worldwide through their music and stories.",
  "extendedDescription": "Born from the convergence of dreams and destiny, these three guardians transcend the boundaries between the virtual and real worlds, bringing hope, courage, and unity to all who follow their journey."
}'),
('about', 'characters_section', '{
  "title": "The Trinity",
  "description": "Each member brings their unique essence and power to create perfect harmony"
}'),
('about', 'mission', '{
  "title": "Our Mission",
  "description1": "To bridge the gap between fantasy and reality, bringing the magic of anime storytelling into the world of K-pop. Through our music, performances, and interactive experiences, we aim to create a community where fans can escape, dream, and find strength.",
  "description2": "SAUNTRIX represents the power of unity in diversity, showing that when different energies come together with a common purpose, they can create something truly extraordinary."
}'),

-- Lore Codex content
('lore', 'hero', '{
  "title": "Lore Codex",
  "description": "Dive deep into the mystical world of SAUNTRIX, where destiny intertwines with music, and three souls unite to protect both the virtual and real realms."
}'),
('lore', 'origin', '{
  "title": "The Origin",
  "description1": "In a realm where digital dreams converge with ancient prophecies, three guardians were chosen by destiny itself. SAUNTRIX emerged not just as performers, but as protectors of the bridge between worlds—fusing the artistry of idols with the courage of demon hunters.",
  "description2": "When the harmony between the virtual and physical realms began to fracture, threatening to plunge both into eternal darkness, three souls with extraordinary gifts were awakened. United by an unbreakable bond and driven by a shared purpose, they became SAUNTRIX—the trinity of light, spark, and fire."
}'),
('lore', 'lumia_arc', '{
  "title": "Lumias Radiance",
  "description1": "Once consumed by self-doubt and fear of inadequacy, Lumia struggled to find her voice in a world that seemed to demand perfection. Her golden aura flickered weakly, barely visible to those around her.",
  "description2": "Through trials of faith and moments of profound connection with her future sisters, Lumia discovered that true leadership comes not from being flawless, but from lifting others up. Her light now burns as a beacon of hope, guiding lost souls home.",
  "quote": "I learned that being a leader means being the light others need, even when your own path seems dark."
}'),
('lore', 'kira_arc', '{
  "title": "Kiras Lightning",
  "description1": "Dismissed and underestimated by those who couldnt see past her playful exterior, Kira harbored a storm of potential waiting to be unleashed. Her violet aura crackled with untamed energy.",
  "description2": "When the moment of truth arrived, Kiras true power erupted like lightning splitting the sky. She learned that being underestimated was her greatest weapon, allowing her to strike when least expected. Now fearless and bold, she brings electric chaos to every performance.",
  "quote": "They thought I was just noise. I showed them I was the thunder that shakes the world."
}'),
('lore', 'riven_arc', '{
  "title": "Rivens Inferno",
  "description1": "Forged in the crucible of hardship, Riven endured losses that would have broken lesser spirits. Her crimson aura was born from pain, tempered by resilience, and refined by an unbreakable will.",
  "description2": "Every setback became fuel for her inner fire. Riven discovered that true strength isnt about never falling—its about rising each time with greater intensity. Her passionate performances now inspire others to burn brighter in the face of adversity.",
  "quote": "The flames that tried to consume me only made me stronger. Now I burn for all who need light in the darkness."
}'),
('lore', 'unity', '{
  "title": "The Trinity United",
  "description1": "When light, spark, and fire converge, they create something greater than the sum of their parts. SAUNTRIX represents the perfect harmony of complementary forces—each members strength covering anothers vulnerability, each story enhancing the collective narrative.",
  "description2": "Together, they stand as guardians of inspiration, protectors of dreams, and champions of those who dare to shine in a world that often demands conformity. Their music is their weapon, their unity is their shield, and their love for their fans is their eternal motivation."
}'),

-- Videos page content
('videos', 'hero', '{
  "title": "Videos",
  "description": "Experience our visual journey through music and storytelling"
}'),
('videos', 'featured_section', '{
  "title": "Featured Music Video"
}'),
('videos', 'playlist_section', '{
  "title": "Music Video Playlist",
  "description": "Each member brings their unique essence and power to create perfect harmony"
}'),

-- Fan Community content
('community', 'hero', '{
  "title": "AUREA Community",
  "description": "Connect with fellow fans, share your passion, and earn your place in the AUREA hierarchy"
}'),
('community', 'fan_wall', '{
  "title": "Fan Wall",
  "placeholder": "Share your thoughts with AUREA...",
  "moderationNote": "Your message will be reviewed by moderators before appearing on the wall."
}'),
('community', 'ranks', '{
  "title": "AUREA Ranks",
  "gold": {"name": "Gold AUREA", "description": "VIP Members"},
  "violet": {"name": "Violet AUREA", "description": "Active Members"},
  "crimson": {"name": "Crimson AUREA", "description": "New Members"}
}'),

-- Contact page content
('contact', 'hero', '{
  "title": "Contact",
  "description": "Have questions? Want to collaborate? Wed love to hear from you!"
}'),
('contact', 'form_section', '{
  "title": "Send us a Message",
  "namePlaceholder": "Your name",
  "emailPlaceholder": "your.email@example.com",
  "messagePlaceholder": "Tell us whats on your mind...",
  "submitText": "Send Message"
}'),
('contact', 'business_contact', '{
  "title": "Business Inquiries",
  "email": "contact@sauntrix.com"
}'),
('contact', 'social_section', '{
  "title": "Follow SAUNTRIX"
}'),
('contact', 'response_time', '{
  "title": "Response Time",
  "description": "We typically respond to messages within 24-48 hours. For urgent matters, please reach out through our social media channels."
}'),

-- Discography page content
('discography', 'hero', '{
  "title": "Discography",
  "description": "Journey through our musical evolution, from debut to destiny"
}')

ON CONFLICT (page_name, section_key) DO NOTHING;