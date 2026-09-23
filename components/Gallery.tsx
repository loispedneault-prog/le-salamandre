"use client";

import { CaretLeftIcon, CaretRightIcon, InstagramLogoIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { gallery, site, type GalleryImage } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

type Entry = { image: GalleryImage; index: number };

// Répartition en colonnes, chacune avec sa propre vitesse de parallaxe.
function split(count: number): Entry[][] {
  const columns: Entry[][] = Array.from({ length: count }, () => []);
  gallery.forEach((image, index) => columns[index % count].push({ image, index }));
  return columns;
}

const twoColumns = split(2);
const threeColumns = split(3);
const distances = [30, 90, 50];

const desktopQuery = "(min-width: 1024px)";
function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function Column({
  items,
  progress,
  distance,
  className,
  onOpen,
}: {
  items: Entry[];
  progress: MotionValue<number>;
  distance: number;
  className?: string;
  onOpen: (index: number) => void;
}) {
  const y = useTransform(progress, [0, 1], [distance, -distance]);
  return (
    <motion.ul data-parallax style={{ y }} className={`flex flex-col gap-4 md:gap-5 ${className ?? ""}`}>
      {items.map(({ image, index }) => (
        <li key={image.src}>
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="group relative block w-full overflow-hidden rounded-[20px] bg-nuit-800"
            style={{ aspectRatio: `${image.w} / ${image.h}` }}
            aria-label={`Agrandir : ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-[transform,filter] duration-[1200ms] ease-out-expo group-hover:scale-[1.04] group-hover:brightness-110"
            />
            <span className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-creme/10 transition-[box-shadow] duration-500 group-hover:ring-ambre/40" />
          </button>
        </li>
      ))}
    </motion.ul>
  );
}

export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
  const columns = isDesktop ? threeColumns : twoColumns;
  const [current, setCurrent] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number) => {
    lastTrigger.current = document.activeElement as HTMLElement;
    setCurrent(index);
  }, []);

  const close = useCallback(() => setCurrent(null), []);

  const step = useCallback(
    (direction: 1 | -1) =>
      setCurrent((value) => (value === null ? value : (value + direction + gallery.length) % gallery.length)),
    [],
  );

  const isOpen = current !== null;

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const trigger = lastTrigger.current;
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [isOpen, close, step]);

  const active = current === null ? null : gallery[current];

  return (
    <section
      id="galerie"
      ref={section}
      aria-labelledby="galerie-titre"
      className="relative overflow-hidden bg-nuit-900 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2
              id="galerie-titre"
              className="max-w-[12ch] font-display text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[1] tracking-[-0.015em]"
            >
              Un soir sur Duluth.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="quiet"
              icon={<InstagramLogoIcon className="size-5" aria-hidden="true" />}
            >
              {site.social.instagram.handle}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 items-start gap-4 md:mt-20 md:gap-5 lg:grid-cols-3">
          {columns.map((items, index) => (
            <Column
              key={`${columns.length}-${index}`}
              items={items}
              progress={scrollYProgress}
              distance={distances[index]}
              onOpen={open}
              className={index === 1 ? "pt-10 md:pt-16" : undefined}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo agrandie"
            className="fixed inset-0 z-60 flex flex-col bg-nuit-950/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <p className="text-sm tabular-nums text-creme-muted">
                {(current ?? 0) + 1} sur {gallery.length}
              </p>
              <button
                ref={closeButton}
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="flex size-11 items-center justify-center rounded-full border border-creme/20 text-creme transition-colors hover:border-ambre hover:text-ambre-soft"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-24" onClick={(event) => event.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={active.src}
                  className="relative flex h-full w-full flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="relative h-[72dvh] w-full">
                    <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-4 max-w-[60ch] text-center text-[15px] text-creme-muted">
                    {active.alt}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Photo précédente"
                className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-creme/20 bg-nuit-900/70 text-creme transition-colors hover:border-ambre hover:text-ambre-soft md:left-6"
              >
                <CaretLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Photo suivante"
                className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-creme/20 bg-nuit-900/70 text-creme transition-colors hover:border-ambre hover:text-ambre-soft md:right-6"
              >
                <CaretRightIcon className="size-5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
