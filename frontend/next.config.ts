// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:4040/api/:path*',
 
//       },
//     ];
//   },
// };





/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true // ✅ DISABLE eslint blocking build
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://your-api-url.com/api/:path*' // Update as needed
      }
    ]
  }
};

module.exports = nextConfig;

