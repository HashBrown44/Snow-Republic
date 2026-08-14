import type { SiteSettings } from "@/lib/types";
import { Reveal } from "../motion/Reveal";
import { Newsletter } from "./Newsletter";
import { Snow } from "./Snow";
import { Clock, MapPin, Mail, Navigation, Bus } from "lucide-react";

/** Stylized taproom map — decorative, evokes Route 100 & the mountain. */
function TaproomMap() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill="#0c2b40" />
      {Array.from({ length: 26 }).map((_, i) => {
        const x = (i * 53) % 400;
        const y = (i * 89) % 300;
        return <circle key={i} cx={x} cy={y} r={6 + (i % 4) * 3} fill="#123f5a" />;
      })}
      {/* Deerfield River */}
      <path
        d="M-10 60 C 90 90, 120 150, 250 170 S 380 250, 420 240"
        stroke="#2f7ba6"
        strokeWidth="10"
        fill="none"
        opacity="0.7"
      />
      {/* Route 100 */}
      <path
        d="M40 -10 C 80 90, 160 120, 200 170 S 300 260, 340 320"
        stroke="#dcebf6"
        strokeWidth="5"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M40 -10 C 80 90, 160 120, 200 170 S 300 260, 340 320"
        stroke="#6bb5da"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 8"
      />
      {/* pin */}
      <g transform="translate(200 168)">
        <circle r="26" fill="#a9d6ef" opacity="0.22">
          <animate
            attributeName="r"
            values="20;30;20"
            dur="2.6s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M0 -20 C 11 -20 18 -12 18 -3 C 18 8 0 22 0 22 C 0 22 -18 8 -18 -3 C -18 -12 -11 -20 0 -20 Z"
          fill="#a9d6ef"
        />
        <circle cy="-4" r="6" fill="#0c2b40" />
      </g>
    </svg>
  );
}

export function Visit({ settings }: { settings: SiteSettings }) {
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(
    "Snow Republic Brewery, " + settings.address,
  )}`;

  return (
    <section
      id="visit"
      className="grain relative overflow-hidden bg-steel-900 py-24 text-bone sm:py-32"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 60% at 15% 0%, #1f5476 0%, transparent 55%)",
        }}
      />
      <Snow density={0.75} className="z-[1]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-ice-300">
            <span className="h-px w-8 bg-ice-300" />
            Visit Us
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.01em] text-balance">
            Find us on Route 100, at the foot of the mountain.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal direction="right" delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={Clock} title="Hours">
                <p>{settings.hoursWeekday}</p>
                <p>{settings.hoursSunday}</p>
                <p className="mt-1 text-bone/50">Open 7 days a week</p>
              </InfoCard>
              <InfoCard icon={MapPin} title="Address">
                <p>{settings.address}</p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-ice-300 hover:text-ice-200"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </a>
              </InfoCard>
              <InfoCard icon={Mail} title="No Phone — Email Us">
                <a href={`mailto:${settings.email}`} className="hover:text-ice-200">
                  {settings.email}
                </a>
                <p className="mt-1 text-bone/50">No reservations · first come, first served</p>
              </InfoCard>
              <InfoCard icon={Bus} title="Sober Ride Options">
                <p>Had a few? Get home safe — hop the shuttle or the free MOOver.</p>
                <a
                  href="https://www.highcountrymarine.com/shuttle-bus-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-ice-300 hover:text-ice-200"
                >
                  <Bus className="h-3.5 w-3.5" />
                  Last Call Shuttle Service
                </a>
                <a
                  href="https://www.moover.com/route/mount-snow-base-area/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-ice-300 hover:text-ice-200"
                >
                  <Bus className="h-3.5 w-3.5" />
                  MOOver Schedule (Mount Snow)
                </a>
              </InfoCard>

              <div className="sm:col-span-2 rounded-[var(--radius-card)] border border-bone/10 bg-steel-950/40 p-6">
                <Newsletter />
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full min-h-72 overflow-hidden rounded-[var(--radius-card)] border border-bone/10"
            >
              <TaproomMap />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-steel-950 to-transparent p-5">
                <div>
                  <p className="font-display text-lg font-semibold">
                    33 VT Route 100
                  </p>
                  <p className="text-sm text-bone/70">{settings.town}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ice-500 px-4 py-2 text-sm font-semibold text-ink transition-transform group-hover:-translate-y-0.5">
                  <Navigation className="h-4 w-4" />
                  Open map
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-bone/10 bg-steel-950/30 p-6">
      <div className="mb-3 flex items-center gap-2.5 text-ice-300">
        <Icon className="h-4 w-4" />
        <span className="eyebrow text-ice-300">{title}</span>
      </div>
      <div className="space-y-0.5 text-sm leading-relaxed text-bone/85">
        {children}
      </div>
    </div>
  );
}
