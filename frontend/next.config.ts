// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4040/api/:path*',
        images: {
    unoptimized: true, // disables sharp optimization
  },
      },
    ];
  },
};