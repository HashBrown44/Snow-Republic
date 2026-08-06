import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Story } from "@/components/site/Story";
import { TapList } from "@/components/site/TapList";
import { Kitchen } from "@/components/site/Kitchen";
import { Drinks } from "@/components/site/Drinks";
import { Events } from "@/components/site/Events";
import { Gallery } from "@/components/site/Gallery";
import { Shop } from "@/components/site/Shop";
import { Visit } from "@/components/site/Visit";
import { Footer } from "@/components/site/Footer";
import {
  getBeers,
  getMenu,
  getModifiers,
  getDrinks,
  getEvents,
  getProducts,
  getGallery,
  getSettings,
} from "@/lib/content";

export default async function Home() {
  const [
    { data: beers },
    { data: menu },
    { data: modifiers },
    { data: drinks },
    { data: events },
    { data: products },
    { data: gallery },
    settings,
  ] = await Promise.all([
    getBeers(),
    getMenu(),
    getModifiers(),
    getDrinks(),
    getEvents(),
    getProducts(),
    getGallery(),
    getSettings(),
  ]);

  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ice-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main className="flex-1">
        <Hero image={settings.heroImage} />
        <Marquee beers={beers} />
        <Story image={settings.storyImage} />
        <TapList beers={beers} />
        <Kitchen menu={menu} modifiers={modifiers} />
        <Drinks drinks={drinks} />
        <Events events={events} />
        <Gallery shots={gallery} />
        <Shop products={products} />
        <Visit settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
