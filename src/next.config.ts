import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración básica
  images: {
    domains: ['cdn.sanity.io'],
  },
  
  // Configuración experimental
  experimental: {
    // appDir ya no es necesario en Next.js 15+
  },
  
  // Deshabilitar ESLint temporalmente
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Deshabilitar TypeScript temporalmente
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
