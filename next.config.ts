import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/list',
        destination: '/api/list',
      },
    ];
  },
};

export default nextConfig;
