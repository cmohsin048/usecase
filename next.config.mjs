/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: [], // Add any external image domains if needed
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://135.181.9.183:8008/api/:path*",
      },
    ];
  },
};

export default nextConfig;
