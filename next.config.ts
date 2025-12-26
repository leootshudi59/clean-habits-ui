import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // ✅ Ignore TypeScript build errors (current configuration)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ Prevent Next.js from incorrectly bundling these packages on server/client
  serverExternalPackages: ['pino', 'pino-pretty'],

  // ✅ Webpack configuration to resolve Web3 dependencies (Web3Auth, WalletConnect)
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      'pino-pretty': 'commonjs pino-pretty',
      'lokijs': 'commonjs lokijs',
      'encoding': 'commonjs encoding',
    });
    
    // Ignore warnings related to these libs source maps
    config.ignoreWarnings = [
      { module: /node_modules\/pino/ },
      { module: /node_modules\/thread-stream/ },
    ];

    return config;
  },
};

export default withNextIntl(nextConfig);