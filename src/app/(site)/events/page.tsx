import type { Metadata } from "next";
import { Events } from "@/components/site/Events";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Trivia, bingo, live music and weekday deals at Snow Republic Brewery in West Dover, Vermont. Free to walk in — no reservations.",
};

export default async function EventsPage() {
  const { data: events } = await getEvents();
  return <Events events={events} />;
}
