import type { Metadata } from "next";
import { TapList } from "@/components/site/TapList";
import { getBeers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Beer",
  description:
    "What's on tap at Snow Republic Brewery — a rotating board of IPAs, lagers, porters and seasonals brewed on site in West Dover, Vermont.",
};

export default async function BeerPage() {
  const { data: beers } = await getBeers();
  return <TapList beers={beers} />;
}
