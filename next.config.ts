import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.120"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/index.html",
        },
        {
          source: "/admin",
          destination: "/admin.html",
        },
        {
          source: "/admin/",
          destination: "/admin.html",
        },
      ],
    };
  },
};

export default nextConfig;

