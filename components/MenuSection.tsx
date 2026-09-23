"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { menu, menuCategories, site, type MenuCategory, type MenuItem } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

type Filter = MenuCategory | "tout";

// Grille éditoriale sur 12 colonnes quand tout est affiché, plus simple une fois filtrée.
const fullLayout: Record<string, string> = {
  "tajine-zitoune": "sm:col-span-2 lg:col-span-7 lg:row-span-2 aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto",
  "kebda-mchermla": "lg:col-span-5 aspect-[4/3] xl:aspect-[16/11]",
  "brochettes-boeuf": "lg:col-span-5 aspect-[4/3] xl:aspect-[16/11]",
  "frites-omelette-thon": "lg:col-span-6 aspect-[4/3] lg:aspect-[16/10]",
  "frites-omelette-populaire": "lg:col-span-6 aspect-[4/3] lg:aspect-[16/10]",
};

function spanFor(item: MenuItem, filter: Filter, count: number) {
  if (filter === "tout") return fullLayout[item.id];
  if (count === 1) return "sm:col-span-2 lg:col-span-12 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]";
  return "lg:col-span-6 aspect-[4/5] sm:aspect-[4/3]";
}

function formatPrice(value: number) {
  return `${value} $`;
}

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("tout");
  const items = filter === "tout" ? menu : menu.filter((item) => item.category === filter);

  return (
    <section id="menu" aria-labelledby="menu-titre" className="relative bg-nuit-950 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.26em] text-ambre-soft md:text-[13px]">La carte</p>
          <h2
            id="menu-titre"
            className="mt-4 max-w-[20ch] font-display text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.015em]"
          >
            Des assiettes généreuses, <em className="italic text-ambre-soft">à partager.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <LayoutGroup id="menu-filtres">
            <div
              role="group"
              aria-label="Filtrer le menu par catégorie"
              className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {menuCategories.map((category) => {
                const selected = filter === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={selected}
                    aria-controls="menu-grille"
                    onClick={() => setFilter(category.id)}
                    className={`relative h-11 shrink-0 rounded-full border px-5 text-[15px] transition-colors duration-300 ${
                      selected
                        ? "border-transparent text-nuit-900"
                        : "border-creme/15 text-creme/80 hover:border-creme/35 hover:text-creme"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="menu-filtre-actif"
                        className="absolute inset-0 rounded-full bg-ambre"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div
          id="menu-grille"
          aria-live="polite"
          layout
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease }}
                className={`group relative overflow-hidden rounded-[28px] bg-nuit-800 ${spanFor(item, filter, items.length)}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={
                    filter === "tout" && index === 0
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                  }
                  className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nuit-950 via-nuit-950/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 md:p-8">
                  <div className="min-w-0">
                    {item.subtitle ? <p className="mb-1.5 text-[14px] text-ambre-soft">{item.subtitle}</p> : null}
                    <h3 className="text-balance font-display text-[2rem] font-medium leading-[1.02] md:text-[2.25rem] xl:text-[2.5rem]">{item.name}</h3>
                    <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-creme/80">{item.description}</p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="block font-display text-[2.6rem] leading-none text-ambre md:text-[3.25rem]">
                      {formatPrice(item.price)}
                    </span>
                    {item.unit ? (
                      <span className="mt-1 block text-[12px] uppercase tracking-[0.18em] text-creme-muted">
                        {item.unit}
                      </span>
                    ) : null}
                  </p>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-creme/10 transition-[box-shadow] duration-500 group-hover:ring-ambre/45" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div layout="position" transition={{ duration: 0.6, ease }}>
          <p className="mt-10 max-w-[60ch] text-[15px] leading-relaxed text-creme-muted">
            Comptez {site.priceRange}. Les plats du moment sont annoncés sur{" "}
            <a
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-creme underline decoration-ambre/60 underline-offset-4 transition-colors hover:text-ambre-soft"
            >
              Instagram
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
