// Chargeur next/image pour l'export statique : pointe vers les variantes WebP
// générées par scripts/optimize-images.mjs et ajoute le sous-chemin de publication.

export const IMAGE_WIDTHS = [384, 640, 1080, 1600, 2400];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const path = src.startsWith("/") ? `${basePath}${src}` : src;
  if (!/\.jpe?g$/i.test(src)) return path;
  const target = IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return path.replace(/\.jpe?g$/i, `-${target}.webp`);
}
