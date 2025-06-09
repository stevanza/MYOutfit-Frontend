/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // React strict mode (recommended)
  reactStrictMode: true,
};

export default nextConfig;