import type { Metadata } from "next";
import { MerchGallery } from "@/components/site/MerchGallery";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Snow Republic merch — hats, hoodies, glassware and more. Gallery coming soon; available in the taproom.",
};

export default function MerchPage() {
  return <MerchGallery />;
}
