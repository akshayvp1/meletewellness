/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://meletewellness.com',
  // generateRobotsTxt: true,
  outDir: './public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
