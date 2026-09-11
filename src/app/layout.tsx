import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, IS_INDEXABLE, OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const DEFAULT_TITLE =
  "Snow Republic Brewery — Craft Beer & Kitchen in West Dover, Vermont";
const DEFAULT_DESCRIPTION =
  "Veteran-owned brewery, taproom & full kitchen at the foot of Mount Snow in West Dover, Vermont. Craft beer, wood-fired pizza, wine, cocktails and positive vibrations. Kiddos & doggos welcome.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Snow Republic Brewery",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Snow Republic Brewery",
    "West Dover Vermont brewery",
    "Mount Snow taproom",
    "craft beer Vermont",
    "wood-fired pizza Dover VT",
    "veteran owned brewery",
  ],
  applicationName: SITE_NAME,
  // Fallback canonical; each page sets its own self-referencing canonical.
  alternates: { canonical: "/" },
  // Belt-and-suspenders: also emit <meta name="robots" content="noindex"> on any
  // deploy that isn't the launched production domain (mirrors robots.txt).
  robots: IS_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#12291d",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <head>
        {/* Warm the connection to Sanity's image CDN — it serves the LCP hero
            photo and most other images, so this shaves connection setup. */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
