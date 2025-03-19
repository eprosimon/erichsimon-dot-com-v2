/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        // Enable React compiler (correct syntax for Next.js 15+)
        reactRemoveProperties: process.env.NODE_ENV === 'production',
    },
    // Allow images from trusted domains
    images: {
        domains: [
            'images.unsplash.com',
            'cdn.sanity.io',
            'lh3.googleusercontent.com',
        ],
    },
};

export default nextConfig; 