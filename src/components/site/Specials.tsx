import type { Special } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { Snow } from "./Snow";
import { Sparkles } from "lucide-react";

export function Specials({ specials }: { specials: Special[] }) {
  if (!specials || specials.length === 0) return null;

  return (
    <section
      id="specials"
      className="grain relative overflow-hidden bg-steel-900 py-20 text-bone sm:py-24"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(75% 60% at 20% 0%, #266086 0%, transparent 55%)",
        }}
      />
      <Snow density={0.6} className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-300">
                <Sparkles className="h-4 w-4" />
                This Week&rsquo;s Specials
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-balance">
                Deals worth showing up for.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-bone/70">
              Rotating weekday deals all season. No reservations — just walk in
              and order at the bar.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {specials.map((s) => (
            <RevealItem key={s._id}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-bone/10 bg-steel-950/40 p-7 transition-colors duration-300 hover:border-ice-500/40">
                {s.schedule && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-ice-500/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-ice-300">
                    {s.schedule}
                  </span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold leading-tight">
                    {s.title}
                  </h3>
                  {typeof s.price === "number" && (
                    <span className="tnum shrink-0 font-display text-2xl font-semibold text-ice-300">
                      ${s.price}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-bone/70 text-pretty">
                  {s.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
