import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'atplc20.pythonanyhere.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
