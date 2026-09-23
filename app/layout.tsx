import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Reem_Kufi } from "next/font/google";
import { Providers } from "@/components/Providers";
import { menu, site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const reem = Reem_Kufi({
  variable: "--font-reem",
  subsets: ["arabic"],
  weight: ["500"],
  display: "swap",
  preload: false,
});

const title = `${site.name} | Restaurant fusion algéro-vietnamienne à Montréal`;

// metadataBase ne garde que le domaine : Next ajoute déjà le basePath aux images Open Graph.
const pageUrl = `${site.url}/`;

export const metadata: Metadata = {
  metadataBase: new URL(new URL(site.url).origin),
  title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "restaurant algérien Montréal",
    "restaurant vietnamien Montréal",
    "fusion algéro-vietnamienne",
    "Plateau-Mont-Royal",
    "avenue Duluth",
    "tajine zitoune",
    "iftar Montréal",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: pageUrl,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#061a18",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  logo: `${site.url}/brand/emblem.png`,
  telephone: site.phone.e164,
  servesCuisine: ["Algérienne", "Vietnamienne", "Fusion"],
  priceRange: "20-30 CAD",
  paymentAccepted: "Credit Card, Debit Card",
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.streetSchema,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "17:00",
      closes: "01:00",
    },
  ],
  sameAs: [site.social.instagram.href, site.social.facebook.href],
  hasMenu: {
    "@type": "Menu",
    hasMenuItem: menu.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.description,
      offers: { "@type": "Offer", price: item.price, priceCurrency: "CAD" },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr-CA"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${outfit.variable} ${reem.variable} antialiased`}
    >
      <body className="grain min-h-dvh bg-nuit-900 text-creme">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
