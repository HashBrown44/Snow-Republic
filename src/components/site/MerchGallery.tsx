import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { FrostBackdrop } from "./FrostBackdrop";
import { ImageIcon } from "lucide-react";

/** Bento layout for the (currently empty) merch gallery — photos drop in later. */
const layout = [
  "col-span-2 row-span-2",
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
  "col-span-2",
];

export function MerchGallery() {
  return (
    <section id="merch" className="relative overflow-hidden bg-bone py-24 sm:py-32">
      <FrostBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-600">
                <span className="h-px w-8 bg-ice-600" />
                Merch
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
                Merch gallery coming soon.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-charcoal/70">
              Hats, hoodies, glassware and more — photos landing here shortly.
              For now, grab it at the bar.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 [grid-auto-rows:9rem] sm:[grid-auto-rows:11rem]"
          stagger={0.06}
        >
          {layout.map((className, i) => (
            <RevealItem key={i} className={className}>
              <div className="grid h-full w-full place-items-center rounded-[var(--radius-card)] border border-dashed border-fog bg-cream/60">
                <ImageIcon className="h-7 w-7 text-charcoal/20" aria-hidden="true" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
