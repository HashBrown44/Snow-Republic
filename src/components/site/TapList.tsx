"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Beer } from "@/lib/types";
import { BeerGlass } from "../art/Art";
import { FrostBackdrop } from "./FrostBackdrop";
import { EASE_OUT } from "@/lib/motion";

const feature = [
  {
    src: "/images/beer-taps.jpg",
    alt: "Custom wooden tap handles — Ziggy, Flip Flop, Joyride and 2 Maracas",
    label: "The tap wall",
  },
  {
    src: "/images/beer-cooler.jpg",
    alt: "Cooler stocked with cans of Snow Republic beer to go",
    label: "Cans to go",
  },
  {
    src: "/images/beer-major-b-cans.jpg",
    alt: "Major B American Lager cans with saluting-Marine artwork",
    label: "Major B lager",
  },
];

function BeerCard({ beer, index }: { beer: Beer; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE_OUT },
        },
      }}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-fog bg-cream/60 p-6 transition-shadow duration-300 hover:shadow-[0_28px_50px_-24px_rgba(13,31,22,0.45)]"
    >
      {/* number + seasonal tag */}
      <div className="flex items-start justify-between">
        <span className="tnum font-display text-sm font-semibold text-charcoal/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        {beer.seasonal && (
          <span className="rounded-full bg-ice-500/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-ice-700">
            Seasonal
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="pb-1">
          <h3 className="font-display text-2xl font-semibold leading-tight text-steel-900">
            {beer.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-ice-700">{beer.style}</p>
        </div>
        <motion.div
          whileHover={reduce ? undefined : { rotate: -4, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="shrink-0"
        >
          <BeerGlass hue={beer.hue} className="h-24 w-auto drop-shadow-sm" />
        </motion.div>
      </div>

      <p className="mt-1 text-sm italic text-charcoal/70">{beer.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-charcoal/75 text-pretty">
        {beer.notes}
      </p>

      <div className="mt-6 flex items-center gap-5 border-t border-fog pt-4">
        <Stat label="ABV" value={`${beer.abv}%`} />
        {beer.ibu ? <Stat label="IBU" value={String(beer.ibu)} /> : null}
        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-steel-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-steel-600" />
          On tap
        </span>
      </div>
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="tnum font-display text-lg font-semibold text-steel-800">
        {value}
      </div>
      <div className="text-[0.65rem] font-semibold uppercase tracking-widest text-charcoal/45">
        {label}
      </div>
    </div>
  );
}

export function TapList({ beers }: { beers: Beer[] }) {
  const reduceGrid = useReducedMotion();
  return (
    <section id="beer" className="relative overflow-hidden bg-bone py-24 sm:py-32">
      <FrostBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ice-600">
              <span className="h-px w-8 bg-ice-600" />
              On Tap Now
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
              A rotating board, brewed steps from where you&rsquo;re sitting.
            </h2>
          </div>
          <p className="max-w-sm text-charcoal/70">
            The lineup shifts with the seasons and whatever we felt like brewing.
            Here&rsquo;s what&rsquo;s pouring this week.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-12 grid grid-cols-3 gap-3 sm:gap-4"
        >
          {feature.map((f) => (
            <motion.div
              key={f.src}
              variants={{
                hidden: { opacity: 0, y: reduceGrid ? 0 : 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-fog"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 768px) 33vw, 400px"
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/75 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 font-display text-sm font-semibold text-bone sm:text-base">
                {f.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {beers.map((beer, i) => (
            <BeerCard key={beer._id} beer={beer} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
