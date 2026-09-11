import { Events } from "@/components/site/Events";
import { getEvents } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Events",
  description:
    "Trivia, bingo, live music and weekday deals at Snow Republic Brewery in West Dover, Vermont. Free to walk in — no reservations.",
  path: "/events",
});

export default async function EventsPage() {
  const { data: events } = await getEvents();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ])}
      />
      <Events events={events} />
    </>
  );
}
