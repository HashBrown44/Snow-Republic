import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { Hop } from "../art/Art";
import { FrostBackdrop } from "./FrostBackdrop";

const stats = [
  { value: "2019", label: "Opened in Dover" },
  { value: "USMC", label: "Veteran-owned" },
  { value: "9+", label: "Beers on tap" },
  { value: "7", label: "Days a week" },
];

export function Story({ image }: { image?: string }) {
  return (
    <section id="story" className="relative overflow-hidden bg-bone py-24 sm:py-32">
      <FrostBackdrop />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-ice-600">
              <span className="h-px w-8 bg-ice-600" />
              Our Story
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
              Founded by a Marine who traded the courtroom for a brew kettle.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-charcoal/80 text-pretty">
              <p>
                Owner Walt is the son of a career Marine and served in the Corps
                himself before spending twenty years as a criminal defense attorney.
                Then it hit him: he owned a bad-ass building on the main road to a
                major Vermont ski resort, in a top-five brewing state, with no
                breweries around.
              </p>
              <p>
                Snow Republic opened in 2019 with two beers and a jockey box. Five
                months later, COVID shut the doors — so Walt came back bigger,
                better, faster, stronger, with a chef and a food truck. That grew
                into a full wood-fired kitchen. And the rest, as they say, is
                history.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <Reveal direction="left" delay={0.1}>
            <figure className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-8 text-bone shadow-[0_30px_60px_-30px_rgba(11,22,32,0.6)]">
              <Image
                src={image || "/images/place-exterior-pub.jpg"}
                alt="The Snow Republic brew pub, a log cabin on Route 100 in West Dover"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/55 to-steel-950/15" />
              <Hop className="relative mb-6 h-12 w-9" />
              <blockquote className="relative font-display text-2xl font-medium leading-snug italic text-balance">
                &ldquo;Come for the food and drink. Stay for the vibe.&rdquo;
              </blockquote>
              <figcaption className="relative mt-6 text-sm text-bone/80">
                — Walt, Founder · U.S. Marine Corps veteran
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      <RevealGroup className="relative z-10 mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-fog bg-fog px-5 sm:px-8 md:grid-cols-4 md:px-0">
        {stats.map((s) => (
          <RevealItem
            key={s.label}
            className="bg-bone px-6 py-10 text-center"
          >
            <div className="tnum font-display text-4xl font-semibold text-steel-800 sm:text-5xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-wider text-charcoal/60">
              {s.label}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
