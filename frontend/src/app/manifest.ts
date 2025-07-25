import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Melete Wellness - Mental Health Support',
    short_name: 'Melete',
    description: '24/7 Mental Health Support Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: 'https://www.meletewellness.com/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://www.meletewellness.com/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}