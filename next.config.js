/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'mosaic.scdn.co',
            'i.scdn.co',
            'image-cdn-ak.spotifycdn.com',
            'image-cdn-fa.spotifycdn.com', // Added new Spotify CDN domain
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mosaic.scdn.co',
                pathname: '/640/**',
            },
        ],
    },
};

module.exports = nextConfig;