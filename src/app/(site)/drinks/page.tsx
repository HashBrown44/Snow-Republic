import { Drinks } from "@/components/site/Drinks";
import { getDrinks } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Other Alcoholic Options",
  description:
    "Not just beer — the wine list, bubbles and cocktails at Snow Republic Brewery in West Dover, Vermont.",
  path: "/drinks",
});

export default async function DrinksPage() {
  const { data: drinks } = await getDrinks();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Other Alcoholic Options", path: "/drinks" },
        ])}
      />
      <Drinks drinks={drinks} />
    </>
  );
}
