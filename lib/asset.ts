/** Préfixe un fichier de public/ avec le sous-chemin de publication (hors next/image). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
