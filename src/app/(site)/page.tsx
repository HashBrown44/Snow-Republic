import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ExploreGrid } from "@/components/site/ExploreGrid";
import { getBeers, getSettings } from "@/lib/content";

export default async function Home() {
  const [{ data: beers }, settings] = await Promise.all([
    getBeers(),
    getSettings(),
  ]);

  return (
    <>
      <Hero image={settings.heroImage} />
      <Marquee beers={beers} />
      <ExploreGrid />
    </>
  );
}
