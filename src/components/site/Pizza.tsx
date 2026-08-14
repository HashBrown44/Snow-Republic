import type { MenuItem, Product } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { PineRow } from "../art/Art";
import { Snow } from "./Snow";
import { Flame, Snowflake, ChefHat } from "lucide-react";

export function Pizza({
  pizzas,
  frozen = [],
}: {
  pizzas: MenuItem[];
  frozen?: Product[];
}) {
  return (
    <section
      id="pizza"
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
                <Flame className="h-4 w-4" />
                Wood-Fired Pizza
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-balance">
                Straight out of the oven in the corner.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-bone/70">
              Hand-stretched, wood-fired and made for beer. Rossa or white pie,
              loaded the way we like it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <figure className="mt-14 rounded-[var(--radius-card)] border border-bone/10 bg-steel-900/40 p-7 sm:p-9">
            <figcaption className="eyebrow flex items-center gap-3 text-ice-300">
              <ChefHat className="h-4 w-4" />
              Meet Pizzaiolo Rob
            </figcaption>
            <blockquote className="mt-4 max-w-3xl text-lg leading-relaxed text-bone/85 text-pretty">
              <span className="font-semibold text-bone">Pizzaiolo Rob</span> makes
              the pizzas at Snow Republic. Before bringing his craft here, Rob was a
              New Haven pizza chef, where he developed his passion for authentic,
              high-quality pizza. Today, he brings that experience to Snow Republic,
              creating unique pizzas that have become a favorite among our guests.
            </blockquote>
          </figure>
        </Reveal>

        <RevealGroup
          className="mt-12 grid gap-4 lg:grid-cols-2"
          stagger={0.06}
        >
          {pizzas.map((p) => (
            <RevealItem key={p._id}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-bone/10 bg-steel-900/40 p-6 transition-colors duration-300 hover:border-ice-500/40 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="flex items-center gap-2.5 font-display text-2xl font-semibold leading-tight">
                    {p.name}
                    {p.veg && (
                      <span className="rounded bg-ice-500/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-ice-300">
                        Veg
                      </span>
                    )}
                  </h3>
                  <span className="tnum shrink-0 font-display text-2xl font-semibold text-ice-300">
                    ${p.price.toFixed(0)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-bone/70 text-pretty">
                  {p.description}
                </p>
                {p.pairing && (
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-bone/45">
                    Pairs with {p.pairing}
                  </p>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {frozen.length > 0 && (
          <div className="mt-20 border-t border-bone/10 pt-16">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-300">
                <Snowflake className="h-4 w-4" />
                Take-Home Frozen &lsquo;Za
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="mt-5 max-w-xl font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-balance">
                Bake the wood-fired classic at home.
              </h3>
            </Reveal>

            <RevealGroup
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.06}
            >
              {frozen.map((p) => (
                <RevealItem key={p._id}>
                  <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-bone/10 bg-steel-900/40 p-6 transition-colors duration-300 hover:border-ice-500/40">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-xl font-semibold leading-tight">
                        {p.name}
                      </h4>
                      <span className="tnum shrink-0 font-display text-xl font-semibold text-ice-300">
                        ${p.price}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-bone/70 text-pretty">
                      {p.blurb}
                    </p>
                    <span className="mt-4 text-xs font-medium uppercase tracking-wider text-bone/45">
                      Grab it in the taproom
                    </span>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}
