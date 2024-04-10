/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https",
            },
            {
                hostname: "directus-production-beb1.up.railway.app",
                protocol: "https",
            }
        ]
    },
};

export default nextConfig;
