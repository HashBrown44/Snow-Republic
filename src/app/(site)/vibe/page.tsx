import { Gallery } from "@/components/site/Gallery";
import { getGallery } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "The Vibe",
  description:
    "A look around the Snow Republic taproom — the log cabin, the ski team, live music and a wall of cans in West Dover, Vermont.",
  path: "/vibe",
});

export default async function VibePage() {
  const { data: gallery } = await getGallery();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Vibe", path: "/vibe" },
        ])}
      />
      <Gallery shots={gallery} />
    </>
  );
}
