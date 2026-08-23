import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The admin panel is opened from this machine's LAN address during development.
  // Permit its HMR and other development assets to load from that origin.
  allowedDevOrigins: ["192.168.137.1"],
};

export default nextConfig;
