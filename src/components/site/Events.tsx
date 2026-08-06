import type { BreweryEvent } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { Music, Trophy, Dice5, Tag } from "lucide-react";

const kindMeta: Record<
  BreweryEvent["kind"],
  { icon: typeof Music; tint: string }
> = {
  "Live Music": { icon: Music, tint: "text-ice-700 bg-ice-500/15" },
  Trivia: { icon: Trophy, tint: "text-steel-700 bg-steel-600/15" },
  Bingo: { icon: Dice5, tint: "text-ice-700 bg-ice-500/15" },
  Special: { icon: Tag, tint: "text-steel-700 bg-steel-600/15" },
};

export function Events({ events }: { events: BreweryEvent[] }) {
  return (
    <section id="events" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-600">
                <span className="h-px w-8 bg-ice-600" />
                In the Taproom
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
                Something&rsquo;s always on.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-charcoal/70">
              Trivia, bingo, live music and weekday deals all season. Free to walk
              in — no reservations, first come, first served.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 flex flex-col gap-3" stagger={0.07}>
          {events.map((ev) => {
            const meta = kindMeta[ev.kind];
            const Icon = meta.icon;
            return (
              <RevealItem key={ev._id}>
                <article className="group grid grid-cols-[auto_1fr] items-center gap-5 rounded-[var(--radius-card)] border border-fog bg-bone p-5 transition-all duration-300 hover:border-ice-500/40 hover:shadow-[0_20px_40px_-28px_rgba(13,31,22,0.5)] sm:grid-cols-[auto_1fr_auto] sm:gap-7 sm:p-6">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-steel-900 text-bone">
                    <span className="font-display text-lg font-semibold uppercase leading-none tracking-wide">
                      {ev.day}
                    </span>
                    <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-widest text-ice-300">
                      {ev.status === "Returning Soon" ? "Soon" : "Weekly"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${meta.tint}`}
                      >
                        <Icon className="h-3 w-3" />
                        {ev.kind}
                      </span>
                      <span className="text-xs font-medium text-charcoal/55">
                        {ev.time}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-steel-900">
                      {ev.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-charcoal/70 text-pretty">
                      {ev.description}
                    </p>
                  </div>

                  {ev.status === "Returning Soon" && (
                    <div className="hidden sm:block">
                      <span className="inline-flex items-center rounded-full border border-ice-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ice-700">
                        Returning Soon
                      </span>
                    </div>
                  )}
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
