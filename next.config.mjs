/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn-0.emojis.wiki',
            port: '',
            pathname: '/emoji-pics-lf/**',
          },
        ],
      },
};

export default nextConfig;
