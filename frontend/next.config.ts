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
    unoptimized: true // ✅ This goes here
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:4040/api/:path*'
    }
  ]
}

module.exports = nextConfig;
