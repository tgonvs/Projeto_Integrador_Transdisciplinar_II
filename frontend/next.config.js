/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "nubling-dev.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pit2.nubling.dev",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost", "pit2.nubling.dev", "127.0.0.1:3001"],
    },
  },
};

module.exports = nextConfig;
