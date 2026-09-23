// Source unique pour le contenu du site. Modifier ici met à jour
// le texte visible, le SEO et les données structurées (JSON-LD).

export const site = {
  name: "Le Salamandre",
  shortName: "Salamandre",
  concept: "Fusion algérienne × vietnamienne",
  claim: "Première table algéro-vietnamienne de Montréal",
  description:
    "Première table fusion algérienne et vietnamienne à Montréal. Cuisine fraîche, saine et généreuse, pensée pour le partage, au 65 avenue Duluth Est, Plateau-Mont-Royal. Ouvert tous les jours de 17 h à 1 h.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    street: "65, avenue Duluth Est",
    streetSchema: "65 Avenue Duluth Est",
    city: "Montréal",
    region: "QC",
    postalCode: "H2W 1G8",
    country: "CA",
    neighborhood: "Plateau-Mont-Royal",
  },
  geo: { lat: 45.5177477, lng: -73.5788193 },
  phone: { display: "+1 263-366-2729", href: "tel:+12633662729", e164: "+12633662729" },
  phoneSpecial: { display: "+1 514-604-7322", href: "tel:+15146047322", e164: "+15146047322" },
  hours: { label: "Tous les jours", range: "17 h à 1 h", opens: 17, closes: 1 },
  priceRange: "20 à 30 $ par personne",
  payment: "Cartes de crédit et débit",
  social: {
    instagram: {
      label: "Instagram",
      handle: "@salamandre_restaurant",
      href: "https://www.instagram.com/salamandre_restaurant/",
    },
    facebook: {
      label: "Facebook",
      handle: "Salamandre Restaurant",
      href: "https://www.facebook.com/61588495043575/",
    },
  },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=SALAMANDRE%20RESTAURANT&query_place_id=ChIJ67SzX5cbyUwR5s_q95_mkc0",
  mapsEmbed:
    "https://www.google.com/maps?q=65+Avenue+Duluth+Est,+Montr%C3%A9al,+QC+H2W+1G8&z=16&output=embed",
  rating: { value: 4.7, count: 39, source: "Google" },
} as const;

export const nav = [
  { id: "histoire", label: "Histoire" },
  { id: "menu", label: "Menu" },
  { id: "galerie", label: "Galerie" },
  { id: "avis", label: "Avis" },
  { id: "infos", label: "Infos" },
] as const;

export type MenuCategory = "mijotes" | "grillades" | "frites";

export const menuCategories: { id: MenuCategory | "tout"; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "mijotes", label: "Mijotés & sautés" },
  { id: "grillades", label: "Grillades" },
  { id: "frites", label: "Frites omelette" },
];

export type MenuItem = {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  unit?: string;
  category: MenuCategory;
  image: string;
  alt: string;
};

// Descriptions à valider avec la cuisine.
export const menu: MenuItem[] = [
  {
    id: "tajine-zitoune",
    name: "Tajine Zitoune Bœuf",
    description: "Bœuf mijoté lentement aux olives vertes, sauce dorée au citron et aux herbes.",
    price: 19,
    category: "mijotes",
    image: "/images/menu/tajine-zitoune.jpg",
    alt: "Tajine zitoune au bœuf et aux olives vertes dans un bol en céramique algérienne bleue et blanche",
  },
  {
    id: "kebda-mchermla",
    name: "Kebda Mchermla",
    subtitle: "Foie sauté à l'algérienne",
    description: "Foie poêlé minute, sauce chermoula à l'ail, au cumin et au paprika.",
    price: 18,
    category: "mijotes",
    image: "/images/menu/kebda-mchermla.jpg",
    alt: "Kebda mchermla, foie sauté en sauce chermoula rouge dans un plat en terre cuite",
  },
  {
    id: "brochettes-boeuf",
    name: "Brochettes de Bœuf",
    description: "Bœuf mariné aux épices et grillé à la flamme. À la pièce, pour composer son assiette.",
    price: 4,
    unit: "la pièce",
    category: "grillades",
    image: "/images/menu/brochettes-boeuf.jpg",
    alt: "Brochettes de bœuf grillées avec oignons, menthe et citron vert",
  },
  {
    id: "frites-omelette-thon",
    name: "Frites Omelette",
    subtitle: "Au thon ou 4 fromages",
    description: "Le classique de la street-food algéroise : frites dorées prises dans une omelette moelleuse.",
    price: 16,
    category: "frites",
    image: "/images/menu/frites-omelette-thon.jpg",
    alt: "Frites omelette au thon servie dans une poêle en fonte",
  },
  {
    id: "frites-omelette-populaire",
    name: "Frites Omelette Populaire",
    description: "La version d'origine, simple, dorée et réconfortante.",
    price: 13,
    category: "frites",
    image: "/images/menu/frites-omelette-populaire.jpg",
    alt: "Frites omelette populaire sur une assiette en porcelaine fleurie avec un bol de harissa",
  },
];

export const services = [
  { id: "sur-place", label: "Sur place", detail: "Dans la salle, sous les lampes" },
  { id: "emporter", label: "À emporter", detail: "Cueillette à l'auto (curbside)" },
  { id: "livraison", label: "Livraison", detail: "À domicile, sans contact" },
] as const;

export const reviewHighlights = [
  "Savoureux et authentique",
  "Accueil chaleureux",
  "Service rapide",
  "Ambiance cosy",
  "Propreté impeccable",
];

// Extraits d'avis Google publics (39 avis, 4,7/5). Prénom + initiale seulement.
export const reviews = [
  {
    quote: "La nourriture est savoureuse et authentique, ce qui en fait une expérience à refaire sans hésiter.",
    author: "Koukou C.",
    lang: "fr",
  },
  {
    quote: "Le lieu est propre, le service impeccable et l'accueil très chaleureux.",
    author: "Layal L.",
    lang: "fr",
  },
  {
    quote: "Jamais été mieux accueilli à Montréal, excellente nourriture, la soupe et les burek étaient incroyables !",
    author: "Dimitri C.",
    lang: "fr",
  },
  {
    quote: "Great food in a cozy place with wonderful staff.",
    author: "Amine A.",
    lang: "en",
  },
  {
    quote: "L'endroit est calme et reposant, parfait pour manger tranquillement.",
    author: "Redha B.",
    lang: "fr",
  },
  {
    quote: "One of the best restaurants I have ever been to in Montreal. Nice vibe, nice service and great food.",
    author: "Farouk L.",
    lang: "en",
  },
  {
    quote: "Super endroit pour l'iftar. Le repas est super bon, copieux.",
    author: "Anna T.",
    lang: "fr",
  },
  {
    quote: "Délicieux et copieux, vraiment à refaire !",
    author: "Paul Ulysse R.",
    lang: "fr",
  },
] as const;

export type GalleryImage = { src: string; alt: string; w: number; h: number };

// Visuels provisoires générés (Higgsfield + Bloom) d'après les photos Instagram.
// À remplacer par les vraies photos du restaurant.
export const gallery: GalleryImage[] = [
  { src: "/images/gallery/salle.jpg", alt: "La salle au crépuscule, lampes Tiffany ambrées et rue enneigée derrière les vitres", w: 1200, h: 1600 },
  { src: "/images/gallery/nems.jpg", alt: "Nems croustillants, herbes fraîches et nuoc cham sur une assiette fleurie", w: 1275, h: 1600 },
  { src: "/images/gallery/the-menthe.jpg", alt: "Thé à la menthe versé de haut dans un verre doré", w: 1280, h: 1600 },
  { src: "/images/gallery/partage.jpg", alt: "Table partagée vue du dessus : tajine, nems, brochettes et verres de thé", w: 1600, h: 1062 },
  { src: "/images/gallery/lampe.jpg", alt: "Lampe Tiffany en pétales de verre peint allumée au-dessus d'une table", w: 1280, h: 1600 },
  { src: "/images/gallery/crevettes.jpg", alt: "Crevettes aux olives vertes et au romarin dans un plat bleu", w: 1600, h: 1600 },
  { src: "/images/gallery/dragon.jpg", alt: "Dragon sculpté en bois sur le mur à lattes, près d'un sofa en tapisserie", w: 1195, h: 1600 },
  { src: "/images/gallery/iftar.jpg", alt: "Table d'iftar avec dattes, verres décorés et bol de chorba", w: 1275, h: 1600 },
  { src: "/images/gallery/flamme.jpg", alt: "Flambée dans le wok en cuisine", w: 1195, h: 1600 },
  { src: "/images/gallery/facade.jpg", alt: "Vitrine chaleureuse sur une rue enneigée du Plateau à l'heure bleue", w: 1195, h: 1600 },
];
