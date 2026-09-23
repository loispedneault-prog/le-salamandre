"use client";

import { FacebookLogoIcon, InstagramLogoIcon, ListIcon, PhoneIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/components/hooks/useActiveSection";
import { nav, site } from "@/lib/site";

const OBSERVED = ["top", ...nav.map((item) => item.id)];
const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(OBSERVED);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(y > 32);
    setHidden(y > 640 && y > previous + 2);
  });

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = menuButton.current;
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.45, ease }}
      >
        <div
          className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid
              ? "border-creme/10 bg-nuit-900/80 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-10">
            <a href="#top" className="flex items-center gap-3" aria-label={`${site.name}, retour en haut`}>
              <Image
                src="/brand/emblem.png"
                alt=""
                width={40}
                height={40}
                className="size-9 rounded-full md:size-10"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-creme sm:tracking-[0.34em] md:text-[13px]">
                {site.name}
              </span>
            </a>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`relative block rounded-full px-4 py-2 text-[14px] transition-colors duration-300 ${
                          isActive ? "text-creme" : "text-creme/70 hover:text-creme"
                        }`}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-creme/[0.08]"
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                          />
                        ) : null}
                        <span className="relative">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram du Salamandre"
                className="hidden size-10 items-center justify-center rounded-full text-creme/75 transition-colors hover:text-ambre-soft md:flex"
              >
                <InstagramLogoIcon className="size-5" />
              </a>
              <a
                href={site.social.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook du Salamandre"
                className="hidden size-10 items-center justify-center rounded-full text-creme/75 transition-colors hover:text-ambre-soft md:flex"
              >
                <FacebookLogoIcon className="size-5" />
              </a>
              <a
                href="#reserver"
                className="ml-1 inline-flex h-10 items-center rounded-full bg-ambre px-4 md:px-5 text-[14px] font-medium text-nuit-900 transition-[background-color,transform] duration-300 hover:bg-ambre-soft active:scale-[0.98]"
              >
                Réserver
              </a>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label="Ouvrir le menu"
                className="flex size-10 items-center justify-center rounded-full border border-creme/15 text-creme lg:hidden"
              >
                <ListIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-nuit-950/[0.98] backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="flex items-center gap-3">
                <Image src="/brand/emblem.png" alt="" width={36} height={36} className="size-9 rounded-full" />
                <span className="text-[12px] font-medium uppercase tracking-[0.34em]">{site.name}</span>
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="flex size-10 items-center justify-center rounded-full border border-creme/15"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center px-6">
              <ul className="space-y-1">
                {nav.map((item, index) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 font-display text-[3.25rem] leading-[1.05] text-creme active:text-ambre"
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.6, delay: 0.06 * index + 0.1, ease }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-5 border-t border-creme/10 px-6 py-8">
              <a href={site.phone.href} className="flex items-center gap-3 text-lg">
                <PhoneIcon className="size-5 text-ambre" />
                {site.phone.display}
              </a>
              <p className="text-sm text-creme-muted">
                {site.hours.label}, {site.hours.range}
              </p>
              <div className="flex gap-3">
                <a
                  href={site.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center gap-2 rounded-full border border-creme/15 px-4 text-sm"
                >
                  <InstagramLogoIcon className="size-5" /> Instagram
                </a>
                <a
                  href={site.social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center gap-2 rounded-full border border-creme/15 px-4 text-sm"
                >
                  <FacebookLogoIcon className="size-5" /> Facebook
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
