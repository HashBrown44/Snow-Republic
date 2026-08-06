# Snow Republic Brewery

Marketing site for **Snow Republic Brewery** — a veteran-owned brewery, taproom &
full kitchen at 33 VT Route 100, West Dover, Vermont, at the foot of Mount Snow.
Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and
**Sanity CMS** (optional, with graceful fallback content).

## Highlights

- **Storytelling / hero-centric** layout with parallax mountain layers, scroll
  reveals, a live tap-list marquee, and interactive beer & product cards.
- **Rustic mountain identity** — deep pine, craft amber, bone/cream, charcoal;
  Fraunces (display) + Inter (body).
- **Sections:** Hero · Tap list · Story (founder Walt) · Food menu · Drinks (wine
  & cocktails) · Events · Take It Home ('za + gift cards) · Visit (hours, map,
  shuttle, newsletter) · Footer.
- **Real content** sourced from snowrepublicbrewery.com — beers, full menu,
  drinks, weekly events, hours and contact info live in `src/lib/fallback.ts`.
- **Accessible & fast:** semantic HTML, skip link, keyboard focus rings, honors
  `prefers-reduced-motion`, no external image hosts (all art is inline SVG/CSS),
  statically prerendered, zero layout shift.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3210 (or :3070 via the preview launcher)
```

```bash
npm run build && npm run start   # production
```

## Content & the CMS

The site is connected to **Sanity** (project `jwrce0ba`). Every data getter in
[`src/lib/content.ts`](src/lib/content.ts) reads live content and **falls back**
to [`src/lib/fallback.ts`](src/lib/fallback.ts) automatically, so the site is never
blank. The whole content model lives in
[`src/sanity/schemaTypes/`](src/sanity/schemaTypes/index.ts): beers, menu items
(+ photos), add-ons/sauces, drinks, events, products, and site settings.

### The Studio (owner editing)

The editing dashboard is **embedded in the site** at **`/studio`**
(e.g. http://localhost:3070/studio). Sign in with a Sanity account that's a member
of the project. Edit anything there and the site updates within ~60s.

### First-time seed (import the current content)

Run once to populate the dataset with everything already on the site (uploads the
menu photos too):

```bash
npx sanity login        # one-time CLI auth
npm run seed            # imports beers, menu, add-ons, drinks, events, merch, settings
```

### Going live (production)

1. Deploy the app (Vercel etc.) with `NEXT_PUBLIC_SANITY_PROJECT_ID=jwrce0ba` and
   `NEXT_PUBLIC_SANITY_DATASET=production` set.
2. Add the production domain to Sanity CORS so `/studio` works there:
   ```bash
   npx sanity cors add https://yourdomain.com --credentials
   ```
   (`http://localhost:3070` already works for local dev.)

## Structure

```
src/
  app/            layout (fonts, metadata), globals (design tokens), page
  components/
    art/          inline SVG art (mountains, pines, beer glass, logo)
    motion/       reduced-motion-aware reveal primitives
    site/         Header, Hero, Marquee, Story, TapList, Kitchen, Drinks,
                  Events, Shop, Visit, Newsletter, Footer
  lib/            sanity client, content getters, fallback data, types, menuExtras
  sanity/         Studio config, schema types, desk structure
  app/studio/     embedded Sanity Studio route (/studio)
scripts/seed.ts   one-time content importer (npm run seed)
sanity.config.ts  re-exports src/sanity/config for the Sanity CLI
```
