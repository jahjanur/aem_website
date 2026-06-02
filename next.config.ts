import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three"],
  // Allow phones / other LAN devices to load dev HMR assets
  allowedDevOrigins: ["192.168.0.23", "192.168.0.16"],
};

export default withNextIntl(nextConfig);
