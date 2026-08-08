"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { PineRow } from "../art/Art";
import { Snow } from "./Snow";
import { EASE_OUT } from "@/lib/motion";

export function Hero({ image }: { image?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven parallax (disabled under reduced-motion)
  const scalePhoto = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.2]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 240]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  const word = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.07, duration: 0.7, ease: EASE_OUT },
    }),
  };
  const headline = ["Come", "for", "the", "beer.", "Stay", "for", "the", "vibe."];

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-steel-950 text-bone"
    >
      {/* Storefront photo with slow scroll-zoom */}
      <motion.div
        style={{ scale: scalePhoto, y: yPhoto }}
        className="absolute inset-0 z-0 origin-center"
      >
        <Image
          src={image || "/images/storefront.jpg"}
          alt="Snow Republic Brewery's log-cabin taproom on Route 100 in West Dover, Vermont"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_62%]"
        />
      </motion.div>

      {/* Steel-blue wash to tie the warm photo into the icy palette */}
      <div className="absolute inset-0 z-[1] bg-steel-950/45 mix-blend-multiply" />
      {/* Legibility scrims — darker at bottom and left where the copy sits */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, #08202f 4%, rgba(8,32,47,0.25) 45%, rgba(8,32,47,0.6) 100%)",
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-steel-950/85 via-steel-950/25 to-transparent" />
      {/* soft winter glow */}
      <motion.div
        className="absolute left-1/2 top-[12%] z-[1] h-72 w-72 -translate-x-1/2 rounded-full bg-ice-300/15 blur-3xl"
        style={{ opacity }}
      />

      {/* Pine silhouette grounds the scene and hides the photo's lower edge */}
      <motion.div style={{ y: yNear }} className="absolute inset-x-0 -bottom-2 z-[3]">
        <PineRow className="h-24 w-full sm:h-32" />
      </motion.div>

      {/* Wind-driven snow flurry over the cabin */}
      <Snow density={1.4} className="z-[4]" />

      {/* Headline */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="eyebrow mb-5 text-ice-300"
        >
          West Dover, Vermont · Veteran-Owned · Est. 2019
        </motion.p>

        <h1 className="font-display text-[clamp(2.9rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-balance drop-shadow-[0_2px_20px_rgba(8,22,32,0.5)]">
          {headline.map((w, i) => (
            <motion.span
              key={w + i}
              custom={i}
              variants={word}
              initial="hidden"
              animate="show"
              className={`mr-[0.28em] inline-block ${
                w === "vibe." ? "italic text-ice-400" : ""
              }`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-bone/85 text-pretty"
        >
          A veteran-owned brewery and full kitchen at the foot of Mount Snow. Craft
          beer, wood-fired pizza, wine, cocktails and — mostly — positive vibrations.
          No reservations. Kiddos and doggos welcome.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#beer"
            className="rounded-full bg-ice-500 px-7 py-3.5 text-base font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ice-400"
          >
            See What&rsquo;s on Tap
          </a>
          <a
            href="#visit"
            className="rounded-full border border-bone/40 bg-steel-950/20 px-7 py-3.5 text-base font-semibold text-bone backdrop-blur-sm transition-colors duration-200 hover:border-bone/70 hover:bg-steel-950/40"
          >
            Find the Taproom
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-bone/40 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-ice-300"
            animate={reduce ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
