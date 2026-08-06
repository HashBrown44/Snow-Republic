import { client, sanityEnabled } from "./sanity";
import {
  fallbackBeers,
  fallbackMenu,
  fallbackDrinks,
  fallbackEvents,
  fallbackProducts,
  fallbackSettings,
} from "./fallback";
import type {
  Beer,
  MenuItem,
  Drink,
  BreweryEvent,
  Product,
  SiteSettings,
} from "./types";

/**
 * Each getter tries Sanity first (when configured) and falls back to local
 * content on empty results or any error. This lets the site ship and look
 * finished today, then light up with live content the moment the studio is
 * seeded — no code changes required.
 */

async function fetchOrFallback<T>(
  query: string,
  fallback: T,
): Promise<{ data: T; live: boolean }> {
  if (!sanityEnabled || !client) return { data: fallback, live: false };
  try {
    const result = await client.fetch<T>(query, {}, { next: { revalidate: 60 } });
    const empty =
      result == null || (Array.isArray(result) && result.length === 0);
    return empty ? { data: fallback, live: false } : { data: result, live: true };
  } catch {
    return { data: fallback, live: false };
  }
}

export const getBeers = () =>
  fetchOrFallback<Beer[]>(
    `*[_type == "beer"] | order(seasonal asc, name asc){
      "_id": _id, name, style, abv, ibu, tagline, notes, hue, seasonal, onTap
    }`,
    fallbackBeers,
  );

export const getMenu = () =>
  fetchOrFallback<MenuItem[]>(
    `*[_type == "menuItem"] | order(category asc){
      "_id": _id, name, description, price, category, pairing, veg,
      "image": image.asset->url
    }`,
    fallbackMenu,
  );

export const getDrinks = () =>
  fetchOrFallback<Drink[]>(
    `*[_type == "drink"] | order(kind asc){
      "_id": _id, name, detail, kind
    }`,
    fallbackDrinks,
  );

export const getEvents = () =>
  fetchOrFallback<BreweryEvent[]>(
    `*[_type == "event"] | order(_createdAt asc){
      "_id": _id, title, day, time, kind, description, status
    }`,
    fallbackEvents,
  );

export const getProducts = () =>
  fetchOrFallback<Product[]>(
    `*[_type == "product"] | order(category asc){
      "_id": _id, name, category, price, blurb, hue
    }`,
    fallbackProducts,
  );

export const getSettings = async (): Promise<SiteSettings> => {
  const { data } = await fetchOrFallback<SiteSettings>(
    `*[_type == "siteSettings"][0]{
      hoursWeekday, hoursSunday, address, town, email, secondLocation
    }`,
    fallbackSettings,
  );
  return data;
};
