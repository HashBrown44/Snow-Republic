export type Beer = {
  _id: string;
  name: string;
  style: string;
  abv: number;
  ibu?: number;
  tagline: string;
  notes: string;
  hue: string; // hex for the glass fill
  seasonal?: boolean;
  onTap?: boolean;
};

export type MenuCategory =
  | "Apps & Salads"
  | "Handhelds"
  | "Wood-Fired Pizza"
  | "Tacos & Sides"
  | "Kids & Pups";

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  pairing?: string;
  veg?: boolean;
  image?: string; // optional photo; items without one show a branded placeholder
};

export type Drink = {
  _id: string;
  name: string;
  detail: string;
  kind: "White" | "Rosé" | "Bubbles" | "Red" | "Cocktail";
};

export type BreweryEvent = {
  _id: string;
  title: string;
  day: string; // short weekday, e.g. "Tue"
  time: string;
  kind: "Trivia" | "Bingo" | "Live Music" | "Special";
  description: string;
  status?: "Weekly" | "Returning Soon";
};

export type Product = {
  _id: string;
  name: string;
  category: "Frozen 'Za" | "Gift Card" | "Merch";
  price: number;
  blurb: string;
  hue: string;
};

export type SiteSettings = {
  hoursWeekday: string;
  hoursSunday: string;
  address: string;
  town: string;
  email: string;
  secondLocation: string;
  heroImage?: string;
  storyImage?: string;
};

export type GalleryShot = {
  src: string;
  alt: string;
};
