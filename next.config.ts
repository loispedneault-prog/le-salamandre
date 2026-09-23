import type { NextConfig } from "next";

// Sous-chemin de publication (ex. "/le-salamandre" sur GitHub Pages), vide en local.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Site 100 % statique : exporté dans out/ et hébergeable sans serveur (GitHub Pages).
  output: "export",
  basePath,
  images: {
    // L'optimiseur de Next nécessite un serveur : on sert des variantes WebP pré-générées
    // (voir scripts/optimize-images.mjs et lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 1080, 1600, 2400],
    imageSizes: [384],
  },
};

export default nextConfig;
