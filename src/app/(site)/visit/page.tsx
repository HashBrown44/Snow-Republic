import type { Metadata } from "next";
import { Visit } from "@/components/site/Visit";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Snow Republic Brewery at 33 VT Route 100, West Dover, Vermont — hours, directions, sober ride options and the taproom map.",
};

export default async function VisitPage() {
  const settings = await getSettings();
  return <Visit settings={settings} />;
}
