import type { MenuItem } from "@/lib/types";
import type { ModGroup } from "@/lib/menuExtras";
import { Reveal } from "../motion/Reveal";
import { PineRow } from "../art/Art";
import { Snow } from "./Snow";
import { MenuBoard } from "./MenuBoard";

export function Kitchen({
  menu,
  modifiers,
}: {
  menu: MenuItem[];
  modifiers: ModGroup[];
}) {
  return (
    <section
      id="kitchen"
      className="grain relative overflow-hidden bg-steel-950 py-24 text-bone sm:py-32"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 0%, #1a4f6f 0%, transparent 55%)",
        }}
      />
      <PineRow className="absolute inset-x-0 top-0 h-16 w-full rotate-180 opacity-40" />
      <Snow density={0.7} className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-300">
                <span className="h-px w-8 bg-ice-300" />
                The Kitchen
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-balance">
                Wood-fired, made for beer.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-bone/70">
              Everything comes out of the oven in the corner. Tap any dish to see
              its optional add-ons &amp; sauces — make it exactly how you like it.
            </p>
          </Reveal>
        </div>

        <MenuBoard menu={menu} groups={modifiers} />
      </div>
    </section>
  );
}
