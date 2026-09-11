import { Story } from "@/components/site/Story";
import { getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, articleSchema } from "@/lib/jsonld";

const DESCRIPTION =
  "The story of Snow Republic Brewery — a veteran-owned taproom and wood-fired kitchen founded by a Marine at the foot of Mount Snow.";

export const metadata = pageMetadata({
  title: "About Us",
  description: DESCRIPTION,
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
          articleSchema({
            headline:
              "Founded by a Marine who traded the courtroom for a brew kettle",
            description: DESCRIPTION,
            path: "/about",
            image: settings.storyImage,
          }),
        ]}
      />
      <Story image={settings.storyImage} />
    </>
  );
}
