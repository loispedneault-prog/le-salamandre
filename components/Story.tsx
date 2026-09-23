"use client";

import { FlameIcon, FlowerLotusIcon, MoonIcon } from "@phosphor-icons/react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

const values = ["Fraîche.", "Saine.", "Contemporaine.", "Généreuse."];

const symbols = [
  {
    icon: FlowerLotusIcon,
    title: "Le lotus",
    text: "Fleur emblématique du Vietnam. Pour la fraîcheur des herbes, du citron vert et des bouillons.",
  },
  {
    icon: FlameIcon,
    title: "La flamme",
    text: "Celle de la salamandre, née du feu selon la légende. Celle de nos grillades aussi.",
  },
  {
    icon: MoonIcon,
    title: "Le croissant",
    text: "Un clin d'œil à l'Algérie et aux longues soirées d'iftar partagées.",
  },
];

function LitWord({
  children,
  progress,
  range,
  className = "",
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, [0, range[0], range[1], 1], [0.16, 0.16, 1, 1]);
  return (
    <motion.span data-parallax style={{ opacity }} className={className}>
      {children}
    </motion.span>
  );
}

export function Story() {
  // Scène : Alger et Saigon convergent vers l'emblème au fil du défilement.
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: stage, offset: ["start start", "end end"] });
  // Plages toujours bornées à [0, 1] : Motion accélère l'opacité via ScrollTimeline,
  // et une plage partielle laisserait le navigateur revenir à la valeur de base.
  const leftX = useTransform(p, [0, 0.62, 1], ["-42%", "4%", "4%"]);
  const rightX = useTransform(p, [0, 0.62, 1], ["42%", "-4%", "-4%"]);
  const leftRotate = useTransform(p, [0, 0.62, 1], [-10, -3, -3]);
  const rightRotate = useTransform(p, [0, 0.62, 1], [10, 3, 3]);
  const emblemScale = useTransform(p, [0, 0.3, 0.66, 1], [0.35, 0.35, 1, 1]);
  const emblemOpacity = useTransform(p, [0, 0.3, 0.55, 1], [0, 0, 1, 1]);
  const greetOpacity = useTransform(p, [0, 0.62, 0.86, 1], [0, 0, 1, 1]);
  const greetY = useTransform(p, [0, 0.62, 0.86, 1], [24, 24, 0, 0]);

  const valuesRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: v } = useScroll({ target: valuesRef, offset: ["start 0.85", "end 0.5"] });

  return (
    <section id="histoire" aria-labelledby="histoire-titre" className="relative bg-nuit-900">
      <div className="mx-auto max-w-[1400px] px-5 pt-28 md:px-10 md:pt-40">
        <Reveal>
          <h2
            id="histoire-titre"
            className="max-w-[13ch] font-display text-[clamp(2.9rem,7.2vw,6.75rem)] font-medium leading-[0.98] tracking-[-0.015em]"
          >
            Deux rives, <em className="italic text-ambre-soft">une même table.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-creme-muted md:text-xl">
            Le Salamandre fait se rencontrer, pour la première fois à Montréal, la cuisine algérienne et la cuisine
            vietnamienne. Les mijotés et le cumin d&apos;un côté, les herbes fraîches et le citron vert de l&apos;autre.
            Au centre, une table qu&apos;on partage.
          </p>
        </Reveal>
      </div>

      <div ref={stage} className="relative h-[190vh] md:h-[230vh]">
        <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-5">
          <div className="relative flex w-full max-w-[1100px] items-center justify-center">
            <motion.figure
              data-parallax
              style={{ x: leftX, rotate: leftRotate }}
              className="relative z-10 w-[40vw] max-w-[380px] md:w-[28vw]"
            >
              <div className="arch relative aspect-[3/4] overflow-hidden border border-creme/10 bg-nuit-800">
                <Image
                  src="/images/story/alger.jpg"
                  alt="Épices algériennes en coupelles de laiton, olives vertes, dattes et verre de thé"
                  fill
                  sizes="(max-width: 768px) 40vw, 28vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center md:mt-6">
                <span className="block font-display text-3xl md:text-5xl">Alger</span>
                <span className="mt-1 block text-[13px] text-creme-muted md:text-[15px]">Mijotés, cumin, olives</span>
              </figcaption>
            </motion.figure>

            <motion.div
              data-parallax
              style={{ scale: emblemScale, opacity: emblemOpacity }}
              className="relative z-20 -mx-4 shrink-0 md:-mx-8"
            >
              <Image
                src="/brand/emblem.png"
                alt=""
                width={144}
                height={144}
                className="size-16 rounded-full shadow-[0_0_70px_rgba(233,164,63,0.22)] md:size-36"
              />
            </motion.div>

            <motion.figure
              data-parallax
              style={{ x: rightX, rotate: rightRotate }}
              className="relative z-10 w-[40vw] max-w-[380px] md:w-[28vw]"
            >
              <div className="arch relative aspect-[3/4] overflow-hidden border border-creme/10 bg-nuit-800">
                <Image
                  src="/images/story/saigon.jpg"
                  alt="Herbes vietnamiennes fraîches, piments, citrons verts et galettes de riz"
                  fill
                  sizes="(max-width: 768px) 40vw, 28vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center md:mt-6">
                <span className="block font-display text-3xl md:text-5xl">Saigon</span>
                <span className="mt-1 block text-[13px] text-creme-muted md:text-[15px]">
                  Herbes, citron vert, piment
                </span>
              </figcaption>
            </motion.figure>
          </div>

          <motion.p
            data-parallax
            style={{ opacity: greetOpacity, y: greetY }}
            className="mt-10 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-2 text-center font-display text-2xl text-creme/80 md:mt-14 md:gap-x-12 md:text-4xl"
          >
            <span>Bienvenue</span>
            <span lang="ar" dir="rtl" className="font-arabic text-[0.8em]">
              مرحبا
            </span>
            <span lang="vi">Chào mừng</span>
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-12 md:px-10 md:pb-40 md:pt-20">
        <p
          ref={valuesRef}
          className="max-w-[15ch] font-display text-[clamp(2.75rem,7.5vw,7rem)] font-medium leading-[1.08] tracking-[-0.015em]"
        >
          {values.map((word, index) => (
            <LitWord key={word} progress={v} range={[index * 0.17, index * 0.17 + 0.2]}>
              {word}{" "}
            </LitWord>
          ))}
          <LitWord progress={v} range={[0.72, 0.95]} className="italic text-ambre-soft">
            Faite pour être partagée.
          </LitWord>
        </p>

        <div className="mt-24 grid items-center gap-14 border-t border-creme/10 pt-16 md:mt-32 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full border border-creme/10">
              <Image
                src="/brand/emblem-lg.jpg"
                alt="Le logo du Salamandre : un lotus de flammes au creux d'un croissant de lune"
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="font-display text-4xl font-medium leading-tight md:text-5xl">
                Un emblème, trois symboles.
              </h3>
            </Reveal>
            <ul className="mt-10 space-y-9">
              {symbols.map((symbol, index) => {
                const Icon = symbol.icon;
                return (
                  <li key={symbol.title}>
                    <Reveal delay={0.08 * index} className="grid grid-cols-[auto_1fr] gap-5">
                      <span className="flex size-12 items-center justify-center rounded-full border border-ambre/40 text-ambre">
                        <Icon weight="duotone" className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-[1.75rem] leading-tight">{symbol.title}</p>
                        <p className="mt-1.5 max-w-[46ch] leading-relaxed text-creme-muted">{symbol.text}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
