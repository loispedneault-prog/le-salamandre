import {
  ArrowUpRightIcon,
  CarIcon,
  ClockIcon,
  CreditCardIcon,
  ForkKnifeIcon,
  MapPinIcon,
  MopedIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import { OpenStatus } from "@/components/OpenStatus";
import { Reveal } from "@/components/ui/Reveal";
import { services, site } from "@/lib/site";

const serviceIcons = { "sur-place": ForkKnifeIcon, emporter: CarIcon, livraison: MopedIcon } as const;

export function Infos() {
  return (
    <section id="infos" aria-labelledby="infos-titre" className="relative bg-nuit-900 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.26em] text-ambre-soft md:text-[13px]">
            Infos pratiques
          </p>
          <h2
            id="infos-titre"
            className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[1] tracking-[-0.015em]"
          >
            On vous attend sur Duluth.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Carte + adresse */}
          <Reveal className="relative min-h-[460px] overflow-hidden rounded-[28px] border border-creme/10 bg-nuit-800 lg:col-span-7 lg:min-h-[680px]">
            <iframe
              src={site.mapsEmbed}
              title="Carte : Le Salamandre, 65 avenue Duluth Est, Montréal"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-dark absolute inset-0 h-full w-full border-0"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-[20px] border border-creme/10 bg-nuit-900/90 p-6 backdrop-blur-md md:inset-x-auto md:bottom-5 md:left-5 md:max-w-sm md:p-7">
              <MapPinIcon weight="fill" className="size-6 text-ambre" aria-hidden="true" />
              <address className="mt-3 not-italic">
                <span className="block font-display text-[1.75rem] leading-tight">{site.address.street}</span>
                <span className="mt-1 block text-creme-muted">
                  {site.address.city} (Québec) {site.address.postalCode}
                </span>
                <span className="block text-creme-muted">{site.address.neighborhood}</span>
              </address>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-creme underline decoration-ambre/60 underline-offset-4 transition-colors hover:text-ambre-soft"
              >
                Itinéraire
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* Réservations */}
            <Reveal delay={0.05}>
              <div id="reserver" className="scroll-mt-28 rounded-[28px] bg-ambre p-7 text-nuit-900 md:p-9">
                <h3 className="font-display text-[2.1rem] font-medium leading-none md:text-[2.5rem]">Réserver une table</h3>
                <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-nuit-900/80">
                  Un appel suffit, pour deux comme pour une grande tablée.
                </p>
                <a
                  href={site.phone.href}
                  className="mt-7 flex h-14 items-center justify-center gap-3 rounded-full bg-nuit-900 px-6 text-[17px] font-medium text-creme transition-[background-color,transform] duration-300 hover:bg-nuit-700 active:scale-[0.98]"
                >
                  <PhoneIcon weight="fill" className="size-5 text-ambre" aria-hidden="true" />
                  {site.phone.display}
                </a>
                <p className="mt-6 border-t border-nuit-900/15 pt-5 text-[15px] leading-relaxed">
                  Réservations spéciales et soirées du Ramadan :{" "}
                  <a href={site.phoneSpecial.href} className="font-medium underline underline-offset-4">
                    {site.phoneSpecial.display}
                  </a>
                </p>
              </div>
            </Reveal>

            {/* Horaires */}
            <Reveal delay={0.1}>
              <div className="rounded-[28px] border border-creme/10 bg-nuit-800/60 p-7 md:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-3 text-creme-muted">
                    <ClockIcon className="size-5 text-ambre" aria-hidden="true" />
                    Horaires
                  </h3>
                  <OpenStatus />
                </div>
                <p className="mt-5 font-display text-[2.4rem] leading-none md:text-[2.75rem]">{site.hours.range}</p>
                <p className="mt-2 text-creme-muted">{site.hours.label}, sans exception</p>
              </div>
            </Reveal>

            {/* Services + paiement */}
            <Reveal delay={0.15}>
              <div className="rounded-[28px] border border-creme/10 bg-nuit-800/60 p-7 md:p-9">
                <h3 className="text-creme-muted">Sur place, à emporter ou livré</h3>
                <ul className="mt-5 space-y-4">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.id];
                    return (
                      <li key={service.id} className="flex items-center gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ambre/35 text-ambre">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[17px] text-creme">{service.label}</span>
                          <span className="block text-[14px] text-creme-muted">{service.detail}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-7 grid gap-4 border-t border-creme/10 pt-6 sm:grid-cols-2">
                  <p className="flex items-start gap-3">
                    <CreditCardIcon className="mt-0.5 size-5 shrink-0 text-ambre" aria-hidden="true" />
                    <span>
                      <span className="block text-creme">{site.payment}</span>
                      <span className="block text-[14px] text-creme-muted">Paiement</span>
                    </span>
                  </p>
                  <p>
                    <span className="block text-creme">{site.priceRange}</span>
                    <span className="block text-[14px] text-creme-muted">Fourchette de prix</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
