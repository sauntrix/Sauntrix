import { useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';

const DynamicAssetLoader = () => {
  const { getAsset } = useContent();

  useEffect(() => {
    // Update favicon
    const faviconAsset = getAsset('favicon');
    if (faviconAsset?.url) {
      const faviconLink = document.getElementById('favicon') as HTMLLinkElement;
      if (faviconLink) {
        faviconLink.href = faviconAsset.url;
      }
    }

    // Update Open Graph image
    const ogImageAsset = getAsset('og_image');
    if (ogImageAsset?.url) {
      const ogImageMeta = document.getElementById('og-image') as HTMLMetaElement;
      if (ogImageMeta) {
        ogImageMeta.content = ogImageAsset.url;
      }
      
      const twitterImageMeta = document.getElementById('twitter-image') as HTMLMetaElement;
      if (twitterImageMeta) {
        twitterImageMeta.content = ogImageAsset.url;
      }
    }

    // Update page title if site settings changed
    const titleElement = document.querySelector('title');
    if (titleElement) {
      // This will be handled by SEOHead component, but we can add fallback here
    }
  }, [getAsset]);

  return null;
};

export default DynamicAssetLoader;