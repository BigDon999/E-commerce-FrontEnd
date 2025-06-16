/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: true,
  // Optimize CSS loading
  optimizeFonts: true,
  // Enable compression
  compress: true,
};

export default nextConfig;
