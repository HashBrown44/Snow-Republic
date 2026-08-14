import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Specials } from "@/components/site/Specials";
import { Kitchen } from "@/components/site/Kitchen";
import { getMenu, getModifiers, getSpecials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The Snow Republic kitchen menu — wood-fired apps, handhelds, tacos, sides and this week's specials in West Dover, Vermont.",
};

export default async function MenuPage() {
  const [{ data: menu }, { data: modifiers }, { data: specials }] =
    await Promise.all([getMenu(), getModifiers(), getSpecials()]);

  // Pizza has its own page — keep it out of the main menu to avoid duplication.
  const food = menu.filter((m) => m.category !== "Wood-Fired Pizza");

  return (
    <>
      <Specials specials={specials} />
      <Kitchen menu={food} modifiers={modifiers} />
      <section className="bg-steel-950 pb-24 text-center text-bone sm:pb-32">
        <Link
          href="/pizza"
          className="inline-flex items-center gap-2 rounded-full bg-ice-500 px-7 py-3.5 text-base font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ice-400"
        >
          See the Wood-Fired Pizza
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
