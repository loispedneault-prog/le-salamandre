import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";

const base =
  "group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-ambre text-nuit-900 hover:bg-ambre-soft",
  ghost:
    "border border-creme/30 bg-nuit-900/30 text-creme backdrop-blur-md hover:border-ambre/70 hover:text-ambre-soft",
  quiet: "border border-creme/15 text-creme hover:border-ambre/60 hover:text-ambre-soft",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

export function ButtonLink({ variant = "primary", icon, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon ? (
        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
