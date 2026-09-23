// Génère les variantes WebP utilisées par lib/image-loader.ts.
// À relancer après avoir remplacé une photo dans public/images ou public/brand :
//   npm run images

import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [384, 640, 1080, 1600, 2400];
const ROOTS = ["public/images", "public/brand"];

async function* jpegs(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* jpegs(full);
    else if (/\.jpe?g$/i.test(entry.name)) yield full;
  }
}

let count = 0;
for (const root of ROOTS) {
  for await (const file of jpegs(root)) {
    for (const width of WIDTHS) {
      const out = file.replace(/\.jpe?g$/i, `-${width}.webp`);
      // Pas d'agrandissement : au-delà de la taille d'origine, la variante garde la taille réelle.
      await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
      count += 1;
    }
  }
}

console.log(`${count} variantes WebP générées.`);
