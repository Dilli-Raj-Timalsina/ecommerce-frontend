/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.dummyjson.com",
                port: "",
                pathname: "/*",
            },
            {
                protocol: "https",
                hostname: "9somerandom.s3.ap-south-1.amazonaws.com",
                port: "",
                // pathname: "/*",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/*",
            },
            {
                protocol: "https",
                hostname: "platform-lookaside.fbsbx.com",
                port: "",
                pathname: "/*",
            },
            {
                protocol: "https",
                hostname: "**",
                port: "",
                pathname: "/*",
            },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
