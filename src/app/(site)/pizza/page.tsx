import type { Metadata } from "next";
import { Pizza } from "@/components/site/Pizza";
import { getMenu, getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pizza",
  description:
    "Hand-stretched, wood-fired pizza at Snow Republic Brewery in West Dover, Vermont — Rossa and white pies made for beer, plus take-home frozen 'za.",
};

export default async function PizzaPage() {
  const [{ data: menu }, { data: products }] = await Promise.all([
    getMenu(),
    getProducts(),
  ]);
  const pizzas = menu.filter((m) => m.category === "Wood-Fired Pizza");
  const frozen = products.filter((p) => p.category === "Frozen 'Za");

  return <Pizza pizzas={pizzas} frozen={frozen} />;
}
