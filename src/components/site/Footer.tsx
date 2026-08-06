import type { SiteSettings } from "@/lib/types";
import { PineRow } from "../art/Art";
import { Snow } from "./Snow";
import { Logo } from "./Logo";

const nav = [
  { href: "#beer", label: "Beer" },
  { href: "#kitchen", label: "Food" },
  { href: "#drinks", label: "Drinks" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "The Vibe" },
  { href: "#shop", label: "Take It Home" },
  { href: "#visit", label: "Visit" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative overflow-hidden bg-steel-950 text-bone">
      <PineRow className="h-16 w-full rotate-180 opacity-30" />
      <Snow density={0.5} className="z-[1]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-6 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-bone">
              <Logo className="h-10 w-auto" />
              <span className="font-display text-xl font-semibold">
                Snow Republic Brewery
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
              Veteran-owned brewery, taproom &amp; full kitchen at the foot of Mount
              Snow in West Dover, Vermont. Come for the beer, stay for the vibe.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-4 text-ice-300">Explore</h4>
            <ul className="space-y-2.5 text-sm text-bone/70">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4 text-ice-300">Find Us</h4>
            <ul className="space-y-2.5 text-sm text-bone/70">
              <li>{settings.address}</li>
              <li>{settings.hoursWeekday}</li>
              <li>{settings.hoursSunday}</li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-bone">
                  {settings.email}
                </a>
              </li>
              <li className="text-ice-300/80">{settings.secondLocation}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-bone/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Snow Republic Brewery. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Please drink responsibly · 21+</span>
            <span className="hidden sm:inline">West Dover, Vermont</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
