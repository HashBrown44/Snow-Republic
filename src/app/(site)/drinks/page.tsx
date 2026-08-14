import type { Metadata } from "next";
import { Drinks } from "@/components/site/Drinks";
import { getDrinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Other Alcoholic Options",
  description:
    "Not just beer — the wine list, bubbles and cocktails at Snow Republic Brewery in West Dover, Vermont.",
};

export default async function DrinksPage() {
  const { data: drinks } = await getDrinks();
  return <Drinks drinks={drinks} />;
}
