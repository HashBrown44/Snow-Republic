import type { Metadata } from "next";
import { Gallery } from "@/components/site/Gallery";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Vibe",
  description:
    "A look around the Snow Republic taproom — the log cabin, the ski team, live music and a wall of cans in West Dover, Vermont.",
};

export default async function VibePage() {
  const { data: gallery } = await getGallery();
  return <Gallery shots={gallery} />;
}
