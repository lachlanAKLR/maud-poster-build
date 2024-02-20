/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
      ],
    },
    experimental: {
      taint: true,
    },
    env: {
      metadataBase: 'https://maud-website.vercel.app/',
    },
  };

export default nextConfig;
 