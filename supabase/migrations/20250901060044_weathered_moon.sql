/*
  # Add comprehensive asset and visual content management

  1. New Tables
    - `site_assets`
      - `id` (uuid, primary key)
      - `asset_key` (text, unique) - identifier for the asset
      - `asset_type` (text) - type of asset (logo, character_image, background, etc.)
      - `url` (text) - URL of the asset
      - `alt_text` (text) - accessibility text
      - `metadata` (jsonb) - additional asset information
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `site_assets` table
    - Add policies for authenticated users to manage assets
    - Add policy for public to read assets

  3. Default Assets
    - Pre-populate with current site assets for easy management
*/

CREATE TABLE IF NOT EXISTS site_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_key text UNIQUE NOT NULL,
  asset_type text NOT NULL DEFAULT 'image',
  url text NOT NULL,
  alt_text text DEFAULT '',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage site assets"
  ON site_assets
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read site assets"
  ON site_assets
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_site_assets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_assets_updated_at
  BEFORE UPDATE ON site_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_site_assets_updated_at();

-- Insert default assets
INSERT INTO site_assets (asset_key, asset_type, url, alt_text, metadata) VALUES
  ('site_logo', 'logo', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDJMMjAuNDcgMTEuNTNMMzAgMTZMMjAuNDcgMjAuNDdMMTYgMzBMMTEuNTMgMjAuNDdMMiAxNkwxMS41MyAxMS41M0wxNiAyWiIgZmlsbD0iI0ZGRDcwMCIvPgo8L3N2Zz4K', 'SAUNTRIX Logo', '{"size": "32x32", "format": "svg"}'),
  ('lumia_character', 'character_image', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 'Lumia - Leader and Main Vocalist', '{"character": "lumia", "role": "leader"}'),
  ('kira_character', 'character_image', 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg', 'Kira - Rapper and Performer', '{"character": "kira", "role": "rapper"}'),
  ('riven_character', 'character_image', 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg', 'Riven - Vocalist and Main Dancer', '{"character": "riven", "role": "dancer"}'),
  ('hero_background', 'background', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 'Hero section background', '{"usage": "hero_section"}'),
  ('og_image', 'social_media', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg', 'SAUNTRIX Open Graph Image', '{"usage": "social_sharing"}'),
  ('favicon', 'icon', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDJMMjAuNDcgMTEuNTNMMzAgMTZMMjAuNDcgMjAuNDdMMTYgMzBMMTEuNTMgMjAuNDdMMiAxNkwxMS41MyAxMS41M0wxNiAyWiIgZmlsbD0iI0ZGRDcwMCIvPgo8L3N2Zz4K', 'SAUNTRIX Favicon', '{"size": "32x32", "format": "svg"}')
ON CONFLICT (asset_key) DO NOTHING;