import { MerchGallery } from "@/components/site/MerchGallery";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Merch",
  description:
    "Snow Republic merch — hats, hoodies, glassware and more. Gallery coming soon; available in the taproom.",
  path: "/merch",
});

export default function MerchPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Merch", path: "/merch" },
        ])}
      />
      <MerchGallery />
    </>
  );
}
