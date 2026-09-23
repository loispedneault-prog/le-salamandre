"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

// Heure de Montréal, quel que soit le fuseau du visiteur.
function isOpenNow() {
  const hour = Number(
    new Intl.DateTimeFormat("en-CA", { hour: "numeric", hourCycle: "h23", timeZone: "America/Toronto" }).format(
      new Date(),
    ),
  );
  return hour >= site.hours.opens || hour < site.hours.closes;
}

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 60_000);
  return () => window.clearInterval(id);
}

export function OpenStatus() {
  const open = useSyncExternalStore(subscribe, isOpenNow, () => null);

  if (open === null) return <span className="inline-block h-8" aria-hidden="true" />;

  return (
    <span
      className={`inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium ${
        open ? "bg-herbe/15 text-herbe" : "bg-creme/[0.06] text-creme-muted"
      }`}
    >
      <span className={`size-2 rounded-full ${open ? "bg-herbe" : "bg-creme-faint"}`} aria-hidden="true" />
      {open ? "Ouvert en ce moment" : "Fermé, ouverture à 17 h"}
    </span>
  );
}
