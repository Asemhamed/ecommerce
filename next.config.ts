import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [new URL('https://ecommerce.routemisr.com/**/**')],
  },
  async redirects() {
    return [
      {
        source: '/allorders',
        destination: '/order',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
