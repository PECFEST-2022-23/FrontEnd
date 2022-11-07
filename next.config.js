/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'i.picsum.photos',
      'instagram.fixc1-4.fna.fbcdn.net',
      'image.shutterstock.com',
      'api.pecfest.co.in',
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'i.picsum.photos',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: '*',
    //   },
    // ],
  },
};

module.exports = nextConfig;
