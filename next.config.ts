import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve('.') },
  distDir: 'dist',
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;
