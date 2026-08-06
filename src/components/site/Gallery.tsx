import Image from "next/image";
import type { GalleryShot } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { FrostBackdrop } from "./FrostBackdrop";

/** Bento layout applied to the photos by position (first = large feature tile). */
const layout = [
  { className: "col-span-2 row-span-2", sizes: "(max-width: 640px) 100vw, 50vw" },
  { className: "col-span-2", sizes: "(max-width: 640px) 100vw, 50vw" },
  { className: "col-span-1", sizes: "(max-width: 640px) 50vw, 25vw" },
  { className: "col-span-1", sizes: "(max-width: 640px) 50vw, 25vw" },
  { className: "col-span-2", sizes: "(max-width: 640px) 100vw, 50vw" },
  { className: "col-span-2", sizes: "(max-width: 640px) 100vw, 50vw" },
];

export function Gallery({ shots }: { shots: GalleryShot[] }) {
  return (
    <section id="gallery" className="relative overflow-hidden bg-bone py-24 sm:py-32">
      <FrostBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-600">
                <span className="h-px w-8 bg-ice-600" />
                The Vibe
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
                Around the taproom.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-charcoal/70">
              A log cabin on Route 100 with palm trees out front, a wall of cans,
              live music, and a ski team. Come see for yourself.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 [grid-auto-rows:9rem] sm:[grid-auto-rows:11rem]"
          stagger={0.06}
        >
          {shots.slice(0, layout.length).map((s, i) => {
            const l = layout[i] ?? layout[layout.length - 1];
            return (
              <RevealItem key={s.src + i} className={l.className}>
                <div className="group relative h-full w-full overflow-hidden rounded-[var(--radius-card)] border border-fog bg-cream">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes={l.sizes}
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-steel-950/0 transition-colors duration-300 group-hover:bg-steel-950/10" />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
