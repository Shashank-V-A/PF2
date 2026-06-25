import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Helps Turbopack resolve packages when the project path contains spaces (Windows).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
