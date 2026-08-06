import type { Drink } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { FrostBackdrop } from "./FrostBackdrop";
import { Wine, Martini } from "lucide-react";

const groups: { label: string; kinds: Drink["kind"][]; icon: typeof Wine }[] = [
  { label: "The Wine List", kinds: ["White", "Rosé", "Bubbles", "Red"], icon: Wine },
  { label: "Cocktails", kinds: ["Cocktail"], icon: Martini },
];

export function Drinks({ drinks }: { drinks: Drink[] }) {
  return (
    <section id="drinks" className="relative overflow-hidden bg-bone py-24 sm:py-32">
      <FrostBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ice-600">
                <span className="h-px w-8 bg-ice-600" />
                Not Just Beer
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-steel-900 text-balance">
                Wine, cocktails &amp; good company.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-charcoal/70">
              Not a beer person? We&rsquo;ve got a thoughtful list of wines by the
              glass and a handful of cocktails worth staying for.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {groups.map(({ label, kinds, icon: Icon }) => {
            const items = drinks.filter((d) => kinds.includes(d.kind));
            if (items.length === 0) return null;
            return (
              <div
                key={label}
                className="rounded-[var(--radius-card)] border border-fog bg-cream/50 p-7 sm:p-9"
              >
                <Reveal>
                  <h3 className="mb-6 flex items-center gap-3 font-display text-xl font-semibold text-steel-900">
                    <Icon className="h-5 w-5 text-ice-600" />
                    {label}
                    <span className="h-px flex-1 bg-fog" />
                  </h3>
                </Reveal>
                <RevealGroup as="ul" className="space-y-4">
                  {items.map((d) => (
                    <RevealItem as="li" key={d._id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-lg font-semibold text-charcoal">
                          {d.name}
                        </span>
                        <span className="shrink-0 rounded-full bg-steel-900/5 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-steel-700">
                          {d.kind}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-charcoal/65">{d.detail}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
