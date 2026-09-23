import { FlameIcon, FlowerLotusIcon, MoonIcon } from "@phosphor-icons/react/ssr";

// Les ingrédients des deux cuisines, en bandeau continu.
const flavors = [
  "Cumin",
  "Citronnelle",
  "Olives vertes",
  "Rau răm",
  "Safran",
  "Basilic thaï",
  "Ras el hanout",
  "Nước chấm",
  "Menthe fraîche",
  "Chermoula",
  "Piment oiseau",
  "Coriandre",
];

const icons = [FlowerLotusIcon, FlameIcon, MoonIcon];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {flavors.map((word, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li key={word} className="flex items-center">
            <span className="px-6 font-display text-[2.1rem] italic leading-none text-creme/90 md:px-9 md:text-[3.4rem]">
              {word}
            </span>
            <Icon weight="fill" className="size-5 text-ambre md:size-6" aria-hidden="true" />
          </li>
        );
      })}
    </ul>
  );
}

export function Marquee() {
  return (
    <section aria-label="Les saveurs du Salamandre" className="relative overflow-hidden border-y border-creme/10 bg-nuit-950 py-7 md:py-9">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-nuit-950 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-nuit-950 to-transparent md:w-40" />
    </section>
  );
}
