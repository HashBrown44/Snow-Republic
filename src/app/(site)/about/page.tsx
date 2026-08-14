import type { Metadata } from "next";
import { Story } from "@/components/site/Story";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Snow Republic Brewery — a veteran-owned taproom and wood-fired kitchen founded by a Marine at the foot of Mount Snow.",
};

export default async function AboutPage() {
  const settings = await getSettings();
  return <Story image={settings.storyImage} />;
}
