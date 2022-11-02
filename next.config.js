/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.picsum.photos', 'instagram.fixc1-4.fna.fbcdn.net'],
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
