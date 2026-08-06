"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import { FrostBackdrop } from "./FrostBackdrop";
import { EASE_OUT } from "@/lib/motion";

function swatchArt(p: Product) {
  // simple product silhouette driven by category, tinted by hue
  if (p.category === "Frozen 'Za") {
    return (
      <g>
        <circle cx="60" cy="60" r="42" fill={p.hue} />
        <circle cx="60" cy="60" r="42" fill="none" stroke="#0d1f16" strokeOpacity="0.25" strokeWidth="3" />
        {[
          [46, 46],
          [74, 48],
          [58, 66],
          [44, 76],
          [76, 74],
          [62, 40],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#7a1f16" opacity="0.85" />
        ))}
      </g>
    );
  }
  if (p.category === "Gift Card") {
    return (
      <g>
        <rect x="24" y="40" width="72" height="46" rx="7" fill={p.hue} />
        <rect x="24" y="52" width="72" height="9" fill="#0d1f16" opacity="0.35" />
        <rect x="32" y="70" width="26" height="6" rx="3" fill="#f5efe1" opacity="0.8" />
      </g>
    );
  }
  return (
    <path
      d="M60 30 L86 42 L80 62 L72 58 V120 H48 V58 L40 62 L34 42 Z"
      fill={p.hue}
    />
  );
}

function ProductCard({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href="#visit"
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE_OUT },
        },
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-fog bg-bone"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-cream">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(70% 70% at 50% 30%, rgba(255,255,255,0.7), transparent)",
          }}
        />
        <motion.svg
          viewBox="0 0 120 120"
          className="relative h-32 w-32 drop-shadow-sm"
          whileHover={reduce ? undefined : { rotate: -3, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          aria-hidden="true"
        >
          {swatchArt(product)}
        </motion.svg>
        <span className="absolute right-3 top-3 rounded-full bg-steel-900/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-bone">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight text-steel-900">
            {product.name}
          </h3>
          <span className="tnum font-display text-lg font-semibold text-ice-700">
            ${product.price}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70 text-pretty">
          {product.blurb}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-steel-700 transition-colors group-hover:text-ice-700">
          {product.category === "Gift Card" ? "Buy a gift card" : "Grab it in the taproom"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  );
}

export function Shop({ products }: { products: Product[] }) {
  return (
    <section id="shop" className="relative overflow-hidden bg-bone py-24 sm:py-32">
      <FrostBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-ice-600">
              <span className="h-px w-8 bg-ice-600" />
              Take It Home
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
              Take the vibe home with you.
            </h2>
          </div>
          <p className="max-w-sm text-charcoal/70">
            House-made frozen &lsquo;za, ready to bake, plus gift cards for the
            beer-and-pizza lover in your life. All available at the bar.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
