import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Snow Republic Brewery content model. Everything the site renders is editable
 * here: beers, food menu (+ photos), add-ons/sauces, drinks, events, merch and
 * the site settings (hours, address, contact).
 */

export const beer = defineType({
  name: "beer",
  title: "Beer",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "style", type: "string", validation: (r) => r.required() }),
    defineField({ name: "abv", title: "ABV %", type: "number" }),
    defineField({ name: "ibu", title: "IBU", type: "number" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "notes", type: "text", rows: 3 }),
    defineField({
      name: "hue",
      title: "Glass color (hex)",
      type: "string",
      description: "Tints the beer-glass illustration, e.g. #e6b95f",
    }),
    defineField({ name: "seasonal", type: "boolean", initialValue: false }),
    defineField({ name: "onTap", title: "On tap now", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name", subtitle: "style" } },
});

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "price", type: "number" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "Apps & Salads",
          "Handhelds",
          "Wood-Fired Pizza",
          "Tacos & Sides",
          "Kids & Pups",
        ],
      },
    }),
    defineField({ name: "pairing", title: "Beer pairing", type: "string" }),
    defineField({ name: "veg", title: "Vegetarian", type: "boolean" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "image" } },
});

export const drink = defineType({
  name: "drink",
  title: "Drink (Wine / Cocktail)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "detail",
      title: "Detail (producer / region / ingredients)",
      type: "string",
    }),
    defineField({
      name: "kind",
      type: "string",
      options: { list: ["White", "Rosé", "Bubbles", "Red", "Cocktail"] },
    }),
  ],
  preview: { select: { title: "name", subtitle: "kind" } },
});

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "day", title: "Day (short, e.g. Tue)", type: "string" }),
    defineField({ name: "time", type: "string" }),
    defineField({
      name: "kind",
      type: "string",
      options: { list: ["Trivia", "Bingo", "Live Music", "Special"] },
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["Weekly", "Returning Soon"] },
    }),
  ],
  preview: { select: { title: "title", subtitle: "day" } },
});

export const product = defineType({
  name: "product",
  title: "Take-Home Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["Frozen 'Za", "Gift Card", "Merch"] },
    }),
    defineField({ name: "price", type: "number" }),
    defineField({ name: "blurb", type: "text", rows: 2 }),
    defineField({ name: "hue", title: "Swatch color (hex)", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "category" } },
});

/* ---- Add-ons & sauces (single document holding all modifier groups) ---- */

export const extra = defineType({
  name: "extra",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Up-charge ($)", type: "number", initialValue: 0 }),
    defineField({ name: "unavailable", title: "Out of stock", type: "boolean" }),
  ],
  preview: {
    select: { title: "name", price: "price" },
    prepare: ({ title, price }) => ({
      title,
      subtitle: price ? `+$${Number(price).toFixed(2)}` : "Free",
    }),
  },
});

export const modGroup = defineType({
  name: "modGroup",
  title: "Group",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", title: "Note (e.g. Optional)", type: "string" }),
    defineField({
      name: "max",
      title: "Max selectable (blank = unlimited)",
      type: "number",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "extra" })],
    }),
  ],
  preview: { select: { title: "label", subtitle: "note" } },
});

export const menuModifiers = defineType({
  name: "menuModifiers",
  title: "Menu Add-ons & Sauces",
  type: "document",
  fields: [
    defineField({
      name: "groups",
      type: "array",
      of: [defineArrayMember({ type: "modGroup" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Menu Add-ons & Sauces" }) },
});

export const special = defineType({
  name: "special",
  title: "Special / Deal",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "price", title: "Price ($, optional)", type: "number" }),
    defineField({
      name: "schedule",
      title: "When (e.g. Every Monday, All season)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first.",
    }),
    defineField({
      name: "active",
      title: "Show on the site",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "schedule" } },
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text (description)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first; the first photo is the large tile.",
    }),
  ],
  orderings: [
    { name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "alt", media: "image", subtitle: "order" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "hoursWeekday", title: "Weekday hours", type: "string" }),
    defineField({ name: "hoursSunday", title: "Sunday hours", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "town", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "secondLocation", title: "Second location note", type: "string" }),
    defineField({
      name: "heroImage",
      title: "Hero photo (storefront)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyImage",
      title: "Story photo (behind the founder quote)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

export const schemaTypes = [
  beer,
  menuItem,
  drink,
  event,
  product,
  extra,
  modGroup,
  menuModifiers,
  special,
  galleryImage,
  siteSettings,
];
