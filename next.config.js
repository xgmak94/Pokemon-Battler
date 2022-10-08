/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://placeimg.com', "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
