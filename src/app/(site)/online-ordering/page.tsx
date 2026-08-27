import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Specials } from "@/components/site/Specials";
import { Kitchen } from "@/components/site/Kitchen";
import { Pizza } from "@/components/site/Pizza";
import { TapList } from "@/components/site/TapList";
import {
  getMenu,
  getModifiers,
  getSpecials,
  getProducts,
  getBeers,
} from "@/lib/content";

const ORDER_URL =
  "https://order.toasttab.com/online/snow-republic-brewery-33-vermont-route-100";

export const metadata: Metadata = {
  title: "Online Ordering",
  description:
    "Order online from Snow Republic Brewery in West Dover, Vermont — this week's specials, the wood-fired kitchen, pizza and what's on tap.",
};

export default async function OnlineOrderingPage() {
  const [
    { data: menu },
    { data: modifiers },
    { data: specials },
    { data: products },
    { data: beers },
  ] = await Promise.all([
    getMenu(),
    getModifiers(),
    getSpecials(),
    getProducts(),
    getBeers(),
  ]);

  const food = menu.filter((m) => m.category !== "Wood-Fired Pizza");
  const pizzas = menu.filter((m) => m.category === "Wood-Fired Pizza");
  const frozen = products.filter((p) => p.category === "Frozen 'Za");

  return (
    <>
      {/* Order Online intro band */}
      <section className="grain relative overflow-hidden bg-steel-950 px-5 pb-16 pt-32 text-bone sm:px-8 sm:pb-20 sm:pt-36">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(75% 60% at 20% 0%, #1a4f6f 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="eyebrow flex items-center gap-3 text-ice-300">
            <span className="h-px w-8 bg-ice-300" />
            Order
          </p>
          <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-2xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-balance">
                Online Ordering
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/80 text-pretty">
                Order ahead for pickup straight from the taproom. Browse the
                specials, kitchen, pizza and tap list below, then place your
                order on Toast.
              </p>
            </div>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ice-500 px-8 py-4 text-base font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ice-400"
            >
              Order Online
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Specials specials={specials} />
      <Kitchen menu={food} modifiers={modifiers} />
      <Pizza pizzas={pizzas} frozen={frozen} />
      <TapList beers={beers} />
    </>
  );
}
