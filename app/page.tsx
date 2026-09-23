import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Infos } from "@/components/Infos";
import { Marquee } from "@/components/Marquee";
import { MenuSection } from "@/components/MenuSection";
import { Reviews } from "@/components/Reviews";
import { Story } from "@/components/Story";

export default function Home() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ambre focus:px-5 focus:py-3 focus:text-nuit-900"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <Hero />
        <Marquee />
        <Story />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Infos />
      </main>
      <Footer />
    </>
  );
}
