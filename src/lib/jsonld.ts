import { SITE_URL, SITE_NAME, absolute } from "./seo";
import type { SiteSettings, Product } from "./types";

/**
 * Structured-data builders (schema.org). Every node uses an @id anchored to the
 * canonical origin so nodes can reference each other across pages.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Turn "Mon–Sat · 12pm – 8pm" style strings into openingHoursSpecification. */
function hoursSpec(settings: SiteSettings) {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "12:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:00",
      closes: "18:00",
    },
  ];
}

/** Primary entity: the brewpub itself (LocalBusiness → drives local SEO). */
export function brewpubSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "BrewPub",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    email: settings.email,
    image: absolute("/images/storefront.jpg"),
    logo: absolute("/logo.png"),
    priceRange: "$$",
    servesCuisine: ["American", "Pizza", "Bar food"],
    acceptsReservations: false,
    hasMenu: absolute("/online-ordering"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "33 VT Route 100",
      addressLocality: "West Dover",
      addressRegion: "VT",
      postalCode: "05356",
      addressCountry: "US",
    },
    openingHoursSpecification: hoursSpec(settings),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqSchema(qas: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };
}

export function articleSchema(a: {
  headline: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    image: a.image ? absolute(a.image) : absolute("/images/storefront.jpg"),
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(a.path) },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Products physically available at the taproom (e.g. frozen 'za). */
export function productListSchema(products: Product[]) {
  return products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.blurb,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStoreOnly",
      seller: { "@id": ORG_ID },
    },
  }));
}
