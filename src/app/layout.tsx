import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
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

const siteUrl = "https://snowrepublicbrewery.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Snow Republic Brewery — Craft Beer & Kitchen in West Dover, Vermont",
    template: "%s · Snow Republic Brewery",
  },
  description:
    "Veteran-owned brewery, taproom & full kitchen at the foot of Mount Snow in West Dover, Vermont. Craft beer, wood-fired pizza, wine, cocktails and positive vibrations. Kiddos & doggos welcome.",
  keywords: [
    "Snow Republic Brewery",
    "West Dover Vermont brewery",
    "Mount Snow taproom",
    "craft beer Vermont",
    "wood-fired pizza Dover VT",
    "veteran owned brewery",
  ],
  openGraph: {
    title: "Snow Republic Brewery — West Dover, Vermont",
    description:
      "Veteran-owned brewery & full kitchen at the foot of Mount Snow. Craft beer, wood-fired pizza, wine, cocktails and positive vibrations.",
    url: siteUrl,
    siteName: "Snow Republic Brewery",
    locale: "en_US",
    type: "website",
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
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
