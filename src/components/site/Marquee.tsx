import type { Beer } from "@/lib/types";

export function Marquee({ beers }: { beers: Beer[] }) {
  const items = beers.filter((b) => b.onTap);
  const doubled = [...items, ...items];

  return (
    <div className="marquee-pause relative overflow-hidden border-y border-steel-800 bg-steel-900 py-4 text-bone">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-steel-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-steel-900 to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap will-change-transform">
        {doubled.map((b, i) => (
          <span key={b._id + i} className="flex items-center gap-10">
            <span className="flex items-baseline gap-3">
              <span className="font-display text-xl font-semibold">{b.name}</span>
              <span className="text-sm text-bone/55">{b.style}</span>
              <span className="tnum text-sm font-semibold text-ice-300">
                {b.abv}%
              </span>
            </span>
            <span className="text-ice-500/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
