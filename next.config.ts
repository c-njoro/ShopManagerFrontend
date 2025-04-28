import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["media.istockphoto.com", "images.pexels.com"],
  },
};

export default nextConfig;
