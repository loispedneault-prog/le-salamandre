"use client";

import { ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon, QuotesIcon, StarIcon } from "@phosphor-icons/react";
import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { reviewHighlights, reviews, site } from "@/lib/site";

const formatRating = (value: number) => value.toFixed(1).replace(".", ",");

function Stars({ value, className = "size-5" }: { value: number; className?: string }) {
  const fill = `${(value / 5) * 100}%`;
  return (
    <span className="relative inline-flex" role="img" aria-label={`${formatRating(value)} sur 5`}>
      <span className="flex gap-1 text-creme/20">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} weight="fill" className={className} aria-hidden="true" />
        ))}
      </span>
      <span className="absolute inset-0 flex gap-1 overflow-hidden text-ambre" style={{ width: fill }}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} weight="fill" className={`${className} shrink-0`} aria-hidden="true" />
        ))}
      </span>
    </span>
  );
}

function RatingCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(3.5, site.rating.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = formatRating(latest);
      },
    });
    return () => controls.stop();
  }, [inView]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatRating(site.rating.value)}
    </span>
  );
}

export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const first = useRef<HTMLLIElement>(null);
  const last = useRef<HTMLLIElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Détecte les extrémités du carrousel sans écouteur de scroll.
  useEffect(() => {
    const root = track.current;
    if (!root || !first.current || !last.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === first.current) setAtStart(entry.isIntersecting);
          if (entry.target === last.current) setAtEnd(entry.isIntersecting);
        }
      },
      { root, threshold: 0.9 },
    );
    observer.observe(first.current);
    observer.observe(last.current);
    return () => observer.disconnect();
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const root = track.current;
    const card = first.current;
    if (!root || !card) return;
    root.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section id="avis" aria-labelledby="avis-titre" className="relative bg-nuit-950 py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <h2
              id="avis-titre"
              className="font-display text-[clamp(2.4rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.015em]"
            >
              Ce qu&apos;en disent nos clients
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="flex items-end gap-4">
              <span className="font-display text-[clamp(6rem,11vw,9.5rem)] font-medium leading-[0.8] text-ambre">
                <RatingCounter />
              </span>
              <span className="pb-2 text-creme-muted">/ 5</span>
            </p>
            <div className="mt-9">
              <Stars value={site.rating.value} className="size-6" />
            </div>
            <p className="mt-4 text-creme-muted">Moyenne de près de 40 avis sur Google</p>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-creme underline decoration-ambre/60 underline-offset-4 transition-colors hover:text-ambre-soft"
            >
              Lire les avis sur Google
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Ce qui revient le plus souvent">
              {reviewHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border border-creme/15 px-4 py-2 text-[14px] text-creme/85"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="min-w-0 lg:col-span-8 lg:pl-6">
          <Reveal>
            <ul
              ref={track}
              aria-label="Extraits d'avis Google"
              className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {reviews.map((review, index) => (
                <li
                  key={review.author}
                  ref={index === 0 ? first : index === reviews.length - 1 ? last : undefined}
                  className="flex w-[86%] shrink-0 snap-start flex-col justify-between rounded-[28px] border border-creme/10 bg-nuit-800/70 p-7 sm:w-[62%] md:p-9 lg:w-[calc(50%-10px)]"
                >
                  <div>
                    <QuotesIcon weight="fill" className="size-8 text-ambre/80" aria-hidden="true" />
                    <blockquote lang={review.lang} className="mt-5 font-display text-[1.4rem] leading-[1.28] text-creme md:text-[1.6rem]">
                      {review.lang === "fr" ? `«\u00a0${review.quote}\u00a0»` : `“${review.quote}”`}
                    </blockquote>
                  </div>
                  <footer className="mt-10 flex items-center justify-between gap-4 border-t border-creme/10 pt-5">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <p className="text-[14px] text-creme-muted">Avis Google</p>
                    </div>
                    <Stars value={5} className="size-4" />
                  </footer>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Avis précédents"
              className="flex size-12 items-center justify-center rounded-full border border-creme/20 text-creme transition-[color,border-color,opacity] hover:border-ambre hover:text-ambre-soft disabled:pointer-events-none disabled:opacity-35"
            >
              <CaretLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Avis suivants"
              className="flex size-12 items-center justify-center rounded-full border border-creme/20 text-creme transition-[color,border-color,opacity] hover:border-ambre hover:text-ambre-soft disabled:pointer-events-none disabled:opacity-35"
            >
              <CaretRightIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
