import { Visit } from "@/components/site/Visit";
import { getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Visit",
  description:
    "Find Snow Republic Brewery at 33 VT Route 100, West Dover, Vermont — hours, directions, sober ride options and the taproom map.",
  path: "/visit",
});

const faqs = [
  {
    question: "Do you take reservations?",
    answer:
      "No — Snow Republic is first come, first served. Just walk in and grab a seat.",
  },
  {
    question: "Are kids and dogs welcome?",
    answer: "Yes. Kiddos and doggos are both welcome at the taproom.",
  },
  {
    question: "What are your hours?",
    answer:
      "Open 7 days a week: Monday through Saturday 12pm–8pm, and Sunday 12pm–6pm.",
  },
  {
    question: "Where are you located?",
    answer:
      "33 VT Route 100, West Dover, Vermont 05356 — on the main road at the foot of Mount Snow.",
  },
  {
    question: "How do I get home safely after drinking?",
    answer:
      "Use the free Vermont MOOver bus or the Last Call Shuttle, which both serve the Mount Snow area. Links are on this page under Sober Ride Options.",
  },
];

export default async function VisitPage() {
  const settings = await getSettings();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Visit", path: "/visit" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Visit settings={settings} />
    </>
  );
}
