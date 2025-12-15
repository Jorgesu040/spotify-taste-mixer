/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'mosaic.scdn.co',
            // add other domains here if needed
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