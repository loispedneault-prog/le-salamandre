#!/usr/bin/env bash
# Compile le site statique et le publie sur la branche gh-pages (GitHub Pages).
# Usage : npm run deploy
set -euo pipefail

REPO_NAME="le-salamandre"
OWNER="$(gh api user --jq .login)"
REMOTE="https://github.com/${OWNER}/${REPO_NAME}.git"

export NEXT_PUBLIC_BASE_PATH="/${REPO_NAME}"
export NEXT_PUBLIC_SITE_URL="https://${OWNER}.github.io/${REPO_NAME}"

rm -rf out
npm run build

# Sans ce fichier, GitHub Pages (Jekyll) ignore le dossier _next/.
touch out/.nojekyll

cd out
git init -q -b gh-pages
git add -A
git commit -q -m "Déploiement du site sur GitHub Pages"
# Tampon élargi : les photos et vidéos dépassent la limite HTTPS par défaut.
git -c http.postBuffer=524288000 push -q -f "$REMOTE" gh-pages
rm -rf .git

echo "Publié : ${NEXT_PUBLIC_SITE_URL}/"
