import { getCliClient } from "sanity/cli";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import {
  fallbackBeers,
  fallbackMenu,
  fallbackDrinks,
  fallbackEvents,
  fallbackProducts,
  fallbackSettings,
  fallbackGallery,
} from "../src/lib/fallback";
import { modifierGroups } from "../src/lib/menuExtras";

/**
 * Seeds a fresh Sanity dataset with the site's current content, including
 * uploading the local menu photos as assets.
 *
 * Run once (after `npx sanity login`):
 *   npx sanity exec scripts/seed.ts --with-user-token
 */

const client = getCliClient();
const publicDir = join(process.cwd(), "public");
const assetCache = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

async function uploadImage(webPath: string) {
  const cached = assetCache.get(webPath);
  if (cached) return cached;
  const rel = webPath.replace(/^\//, "");
  const asset = await client.assets.upload(
    "image",
    createReadStream(join(publicDir, rel)),
    { filename: rel.split("/").pop() },
  );
  const ref = {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
  assetCache.set(webPath, ref);
  return ref;
}

async function run() {
  // Remove any legacy dot-id docs from an earlier seed. IMPORTANT: document ids
  // must NOT contain a dot — dotted ids are hidden from anonymous/public reads,
  // so the live site can't see them (see seed ids below, all use dashes).
  await client.delete({
    query: `*[_id in path("beer.**") || _id in path("menuItem.**") || _id in path("drink.**") || _id in path("event.**") || _id in path("product.**") || _id in path("galleryImage.**")]`,
  });

  for (const b of fallbackBeers) {
    await client.createOrReplace({
      _id: `beer-${b._id}`,
      _type: "beer",
      name: b.name,
      style: b.style,
      abv: b.abv,
      ...(b.ibu != null ? { ibu: b.ibu } : {}),
      tagline: b.tagline,
      notes: b.notes,
      hue: b.hue,
      seasonal: Boolean(b.seasonal),
      onTap: Boolean(b.onTap),
    });
  }
  console.log(`✔ ${fallbackBeers.length} beers`);

  for (const m of fallbackMenu) {
    const doc: Record<string, unknown> = {
      _id: `menuItem-${m._id}`,
      _type: "menuItem",
      name: m.name,
      description: m.description,
      price: m.price,
      category: m.category,
      ...(m.pairing ? { pairing: m.pairing } : {}),
      veg: Boolean(m.veg),
    };
    if (m.image) doc.image = await uploadImage(m.image);
    await client.createOrReplace(doc);
  }
  console.log(`✔ ${fallbackMenu.length} menu items (with photos)`);

  for (const d of fallbackDrinks) {
    await client.createOrReplace({
      _id: `drink-${d._id}`,
      _type: "drink",
      name: d.name,
      detail: d.detail,
      kind: d.kind,
    });
  }
  console.log(`✔ ${fallbackDrinks.length} drinks`);

  for (const e of fallbackEvents) {
    await client.createOrReplace({
      _id: `event-${e._id}`,
      _type: "event",
      title: e.title,
      day: e.day,
      time: e.time,
      kind: e.kind,
      description: e.description,
      ...(e.status ? { status: e.status } : {}),
    });
  }
  console.log(`✔ ${fallbackEvents.length} events`);

  for (const p of fallbackProducts) {
    await client.createOrReplace({
      _id: `product-${p._id}`,
      _type: "product",
      name: p.name,
      category: p.category,
      price: p.price,
      blurb: p.blurb,
      hue: p.hue,
    });
  }
  console.log(`✔ ${fallbackProducts.length} products`);

  await client.createOrReplace({
    _id: "menuModifiers",
    _type: "menuModifiers",
    groups: modifierGroups.map((g, gi) => ({
      _key: `g${gi}`,
      _type: "modGroup",
      label: g.label,
      note: g.note,
      ...(g.max != null ? { max: g.max } : {}),
      items: g.items.map((it, ii) => ({
        _key: `g${gi}i${ii}`,
        _type: "extra",
        name: it.name,
        price: it.price,
        ...(it.unavailable ? { unavailable: true } : {}),
      })),
    })),
  });
  console.log("✔ menu add-ons & sauces");

  for (let i = 0; i < fallbackGallery.length; i++) {
    const shot = fallbackGallery[i];
    await client.createOrReplace({
      _id: `galleryImage-${i}`,
      _type: "galleryImage",
      image: await uploadImage(shot.src),
      alt: shot.alt,
      order: i,
    });
  }
  console.log(`✔ ${fallbackGallery.length} gallery photos`);

  const { heroImage, storyImage, ...settingsText } = fallbackSettings;
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...settingsText,
    ...(heroImage ? { heroImage: await uploadImage(heroImage) } : {}),
    ...(storyImage ? { storyImage: await uploadImage(storyImage) } : {}),
  });
  console.log("✔ site settings (with hero & story photos)");
}

run()
  .then(() => {
    console.log("\nDone — content seeded into Sanity.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
