import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";

type Tile = {
  href: string;
  label: string;
  blurb: string;
  image: string;
  className: string;
  sizes: string;
};

/** Bento tiles that double as the landing page's navigation into each section. */
const tiles: Tile[] = [
  {
    href: "/menu",
    label: "The Menu",
    blurb: "Wood-fired kitchen, apps, handhelds & specials",
    image: "/images/food-burger.jpg",
    className: "sm:col-span-2 sm:row-span-2",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
  {
    href: "/pizza",
    label: "Pizza",
    blurb: "Hand-stretched, straight from the oven",
    image: "/images/food-garlic-bread.jpg",
    className: "sm:col-span-2",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
  {
    href: "/beer",
    label: "On Tap",
    blurb: "A rotating board, brewed on site",
    image: "/images/beer-taps.jpg",
    className: "",
    sizes: "(max-width: 640px) 50vw, 25vw",
  },
  {
    href: "/drinks",
    label: "Other Drinks",
    blurb: "Wine, bubbles & cocktails",
    image: "/images/vibe-bartender.jpg",
    className: "",
    sizes: "(max-width: 640px) 50vw, 25vw",
  },
  {
    href: "/vibe",
    label: "The Vibe",
    blurb: "Music, ski team & good company",
    image: "/images/vibe-dj.jpg",
    className: "sm:col-span-2",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
  {
    href: "/events",
    label: "Events",
    blurb: "Trivia, bingo & live music",
    image: "/images/vibe-ski-team.jpg",
    className: "",
    sizes: "(max-width: 640px) 50vw, 25vw",
  },
  {
    href: "/merch",
    label: "Merch",
    blurb: "Hats, hoodies & glassware",
    image: "/images/beer-major-b-cans.jpg",
    className: "",
    sizes: "(max-width: 640px) 50vw, 25vw",
  },
  {
    href: "/about",
    label: "About Us",
    blurb: "The veteran-owned story",
    image: "/images/place-exterior-pub.jpg",
    className: "sm:col-span-2",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
  {
    href: "/visit",
    label: "Visit",
    blurb: "Route 100 · West Dover, VT",
    image: "/images/storefront.jpg",
    className: "sm:col-span-2",
    sizes: "(max-width: 640px) 100vw, 50vw",
  },
];

export function ExploreGrid() {
  return (
    <section className="relative overflow-hidden bg-steel-950 py-24 text-bone sm:py-32">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, #1a4f6f 0%, transparent 55%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-ice-300">
            <span className="h-px w-8 bg-ice-300" />
            Explore
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.01em] text-balance">
            Everything at Snow Republic, one tap away.
          </h2>
        </Reveal>

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 [grid-auto-rows:9rem] sm:[grid-auto-rows:11rem]"
          stagger={0.05}
        >
          {tiles.map((t) => (
            <RevealItem key={t.href} className={t.className}>
              <Link
                href={t.href}
                className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-bone/10 p-5"
              >
                <Image
                  src={t.image}
                  alt=""
                  fill
                  sizes={t.sizes}
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-steel-950/10 transition-opacity duration-300 group-hover:from-steel-950/95" />
                <div className="relative">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-lg font-semibold leading-tight sm:text-xl">
                      {t.label}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-ice-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-1 text-xs leading-snug text-bone/70 sm:text-sm">
                    {t.blurb}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
