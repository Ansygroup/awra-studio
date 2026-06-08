/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  transpilePackages: ['@awra/types'],
  // Enable standalone output for Docker/Render deployment
  output: 'standalone',
  // Tell Next.js to trace files from monorepo root
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

export default nextConfig;
