# Le Salamandre

Site one-page du restaurant Le Salamandre, fusion algérienne × vietnamienne, 65 avenue Duluth Est, Montréal.

Stack : Next.js 16 (App Router), Tailwind CSS v4, Motion (ex-Framer Motion), Phosphor Icons.

## Lancer le site

```bash
npm install
npm run dev
```

Le site est exporté en statique (`npm run build` produit le dossier `out/`), il n'a besoin d'aucun serveur.

## Publication (GitHub Pages)

```bash
npm run deploy
```

Le script compile le site avec le sous-chemin `/le-salamandre` et le publie sur la branche `gh-pages`. Il faut être connecté avec `gh auth login`.

## Où modifier quoi

| Élément | Fichier |
| --- | --- |
| Textes, menu, prix, horaires, téléphones, avis, galerie | `lib/site.ts` |
| Couleurs et polices (charte) | `app/globals.css`, `app/layout.tsx` |
| SEO, Open Graph, données structurées | `app/layout.tsx`, `app/opengraph-image.jpg` |
| Sections | `components/*.tsx` |

## Remplacer les visuels provisoires

Les photos et la vidéo actuelles sont générées par IA d'après les photos Instagram du restaurant. Remplacez les fichiers en gardant les mêmes noms :

- Vidéo du hero : `public/video/hero-720.mp4` (desktop) et `public/video/hero-540.mp4` (mobile), image de secours `public/images/hero.jpg`
- Plats : `public/images/menu/*.jpg` (format portrait 4:5 conseillé)
- Histoire : `public/images/story/alger.jpg`, `saigon.jpg`
- Galerie : `public/images/gallery/*.jpg` (mettre à jour `w`/`h` dans `lib/site.ts` si le format change)
- Logo : `public/brand/emblem.png`, `emblem-lg.jpg` (recadrés depuis la photo de profil Instagram, idéalement à remplacer par le fichier vectoriel original)

Après tout remplacement de photo JPG, régénérez les variantes WebP servies au navigateur :

```bash
npm run images
```
