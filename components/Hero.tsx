"use client";

import { ArrowDownRightIcon, FlameIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [videoVisible, setVideoVisible] = useState(false);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0, 0]);

  // La vidéo ne se charge que si le visiteur accepte le mouvement et n'économise pas ses données.
  useEffect(() => {
    const el = video.current;
    if (!el || reduce) return;
    if ((navigator as NavigatorWithConnection).connection?.saveData) return;
    el.play().catch(() => {});
  }, [reduce]);

  const reveal = (delay: number) => ({
    initial: { y: "105%" },
    animate: { y: "0%" },
    transition: { duration: 1.1, delay, ease },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      id="top"
      ref={section}
      aria-label="Accueil"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-nuit-950"
    >
      <motion.div data-parallax className="absolute inset-0 -z-10" style={{ y: mediaY, scale: mediaScale }}>
        <Image
          src="/images/hero.jpg"
          alt="La salle du Salamandre le soir : lampes Tiffany ambrées, dragon sculpté et tajine fumant"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[62%_50%]"
        />
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          poster={asset("/images/hero-1600.webp")}
          aria-hidden="true"
          onPlaying={() => setVideoVisible(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[62%_50%] transition-opacity duration-[1.4s] ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={asset("/video/hero-720.mp4")} type="video/mp4" media="(min-width: 768px)" />
          <source src={asset("/video/hero-540.mp4")} type="video/mp4" />
        </video>
      </motion.div>

      {/* Voiles de lisibilité : bas, gauche, haut (sous le header) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-nuit-900 via-nuit-900/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-nuit-950/85 via-nuit-950/35 to-transparent md:via-nuit-950/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-nuit-950/70 to-transparent" />

      <motion.div
        data-parallax
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-28 md:px-10 md:pb-20"
      >
        <motion.p
          {...fade(0.15)}
          className="mb-5 flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.26em] text-ambre-soft md:text-[13px]"
        >
          <FlameIcon weight="fill" className="size-4 shrink-0" aria-hidden="true" />
          {site.claim}
        </motion.p>

        <h1 className="font-display font-medium tracking-[-0.02em] text-creme">
          <span className="block overflow-hidden pb-1">
            <motion.span {...reveal(0.25)} className="block text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[1.05] text-creme/85">
              Le
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3">
            <motion.span {...reveal(0.38)} className="block text-[clamp(4.1rem,15vw,12.5rem)] leading-[0.86]">
              Salamandre
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...fade(0.7)}
          className="mt-5 max-w-[34ch] text-lg leading-relaxed text-creme/85 md:text-xl"
        >
          Les épices d&apos;Alger rencontrent les herbes de Saigon. Une cuisine fraîche, généreuse, pensée pour le partage.
        </motion.p>

        <motion.div {...fade(0.85)} className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#reserver">Réserver</ButtonLink>
          <ButtonLink
            href="#menu"
            variant="ghost"
            icon={<ArrowDownRightIcon className="size-4" aria-hidden="true" />}
          >
            Voir le menu
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
