import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ (optionnel) ne fait pas échouer `next build` si TypeScript trouve des erreurs
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
