import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/user/login',
          '/admin-login',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.meletewellness.com/sitemap.xml',
  };
}