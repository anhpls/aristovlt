/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-api.printify.com",
        port: "", // No port needed for default HTTP/HTTPS ports
        pathname: "/mockup/**", // Matches all paths under /mockup/
      },
      {
        protocol: "https",
        hostname: "pfy-prod-products-mockup-media.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
