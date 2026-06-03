/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  optimizePackageImports: ['lucide-react']
};

export default nextConfig;
