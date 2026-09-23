import { ArrowUpIcon, FacebookLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { nav, site } from "@/lib/site";

const linkClass = "text-creme/80 transition-colors hover:text-ambre-soft";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-creme/10 bg-nuit-950">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4">
              <Image src="/brand/emblem.png" alt="" width={64} height={64} className="size-16 rounded-full" />
              <p className="font-display text-4xl font-medium leading-none">{site.name}</p>
            </div>
            <p className="mt-5 max-w-[34ch] leading-relaxed text-creme-muted">
              {site.concept}, une première à Montréal. Cuisine fraîche, généreuse et à partager.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram du Salamandre"
                className="flex size-11 items-center justify-center rounded-full border border-creme/15 text-creme transition-colors hover:border-ambre hover:text-ambre-soft"
              >
                <InstagramLogoIcon className="size-5" />
              </a>
              <a
                href={site.social.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook du Salamandre"
                className="flex size-11 items-center justify-center rounded-full border border-creme/15 text-creme transition-colors hover:border-ambre hover:text-ambre-soft"
              >
                <FacebookLogoIcon className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Liens rapides" className="lg:col-span-2">
            <h2 className="text-[14px] text-creme-faint">Explorer</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[14px] text-creme-faint">Nous trouver</h2>
            <address className="mt-4 space-y-1 not-italic text-creme/80">
              <span className="block">{site.address.street}</span>
              <span className="block">
                {site.address.city} (Québec) {site.address.postalCode}
              </span>
              <span className="block">{site.address.neighborhood}</span>
            </address>
            <p className="mt-4 text-creme/80">
              {site.hours.label}
              <br />
              {site.hours.range}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[14px] text-creme-faint">Nous joindre</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={site.phone.href} className={linkClass}>
                  {site.phone.display}
                </a>
              </li>
              <li className="text-creme-muted">
                Réservations spéciales et Ramadan
                <br />
                <a href={site.phoneSpecial.href} className={linkClass}>
                  {site.phoneSpecial.display}
                </a>
              </li>
              <li>
                <a href={site.social.instagram.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {site.social.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-20 select-none whitespace-nowrap font-display text-[21vw] font-medium leading-[0.78] tracking-[-0.03em] text-creme/[0.05] md:mt-28 xl:text-[19.5vw] 2xl:text-[17rem]"
        >
          Salamandre
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-creme/10 pt-6 text-[14px] text-creme-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Tous droits réservés.
          </p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-ambre-soft">
            Retour en haut
            <ArrowUpIcon className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
