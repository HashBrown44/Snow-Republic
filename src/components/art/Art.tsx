import type { CSSProperties } from "react";

/** Layered mountain range — used behind the hero. Pure SVG, scales to any width. */
export function MountainRange({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
    >
      {/* far ridge */}
      <path
        d="M0 380 L180 250 L340 330 L520 210 L700 320 L880 190 L1080 300 L1260 220 L1440 320 V520 H0 Z"
        fill="#1f5476"
        opacity="0.5"
      />
      {/* mid ridge */}
      <path
        d="M0 440 L220 300 L400 390 L600 270 L780 380 L980 260 L1180 370 L1440 280 V520 H0 Z"
        fill="#163f5b"
        opacity="0.85"
      />
      {/* near ridge with snow-dusted top */}
      <path
        d="M0 520 L160 360 L300 440 L470 320 L560 380 L720 440 L900 330 L1120 450 L1300 350 L1440 430 V520 Z"
        fill="#0e3149"
        stroke="#e6f1fa"
        strokeWidth="2.5"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

/** A row of pine trees. */
export function PineRow({ className }: { className?: string }) {
  const tree = (x: number, s: number, o: number) => (
    <g transform={`translate(${x} 0) scale(${s})`} opacity={o}>
      <path
        d="M20 4 L34 34 H26 L38 60 H26 L40 86 H0 L14 60 H2 L14 34 H6 Z"
        fill="#0c2a40"
      />
      {/* snow on the boughs */}
      <path d="M20 4 L28 20 H12 Z" fill="#dceaf6" opacity="0.55" />
      <rect x="17" y="86" width="6" height="12" fill="#14212b" />
    </g>
  );
  return (
    <svg
      className={className}
      viewBox="0 0 1440 110"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 20 }).map((_, i) => {
        const x = i * 74 - 20;
        const s = 0.85 + ((i * 7) % 5) * 0.06;
        return <g key={i}>{tree(x, s, 0.9)}</g>;
      })}
    </svg>
  );
}

/** Detailed beer glass whose fill color is driven by the beer's hue. */
export function BeerGlass({
  hue,
  className,
  style,
}: {
  hue: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 200"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`beer-${hue}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hue} stopOpacity="0.7" />
          <stop offset="1" stopColor={hue} />
        </linearGradient>
        <clipPath id={`glass-${hue}`}>
          <path d="M26 44 h68 l-8 130 a12 12 0 0 1 -12 11 h-28 a12 12 0 0 1 -12 -11 z" />
        </clipPath>
      </defs>

      {/* liquid */}
      <g clipPath={`url(#glass-${hue})`}>
        <rect x="20" y="64" width="80" height="130" fill={`url(#beer-${hue})`} />
        {/* rising bubbles */}
        <circle cx="46" cy="150" r="2.5" fill="#fff" opacity="0.35" />
        <circle cx="60" cy="120" r="2" fill="#fff" opacity="0.3" />
        <circle cx="72" cy="140" r="2.5" fill="#fff" opacity="0.3" />
        <circle cx="54" cy="100" r="1.5" fill="#fff" opacity="0.3" />
      </g>

      {/* foam head */}
      <ellipse cx="60" cy="46" rx="35" ry="12" fill="#f7f1e4" />
      <ellipse cx="48" cy="42" rx="10" ry="7" fill="#fffdf6" />
      <ellipse cx="68" cy="43" rx="12" ry="8" fill="#fffdf6" />

      {/* glass outline */}
      <path
        d="M26 44 h68 l-8 130 a12 12 0 0 1 -12 11 h-28 a12 12 0 0 1 -12 -11 z"
        stroke="#0d1f16"
        strokeWidth="3"
        opacity="0.85"
      />
      {/* highlight */}
      <path d="M34 58 l-5 108" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

/** Small hop cone accent. */
export function Hop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 56" fill="none" aria-hidden="true">
      <path d="M20 2 C24 6 24 6 20 10" stroke="#2f6349" strokeWidth="2" strokeLinecap="round" />
      {[
        [20, 10],
        [12, 18],
        [28, 18],
        [20, 26],
        [12, 34],
        [28, 34],
        [20, 42],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y} q-8 4 0 12 q8 -8 0 -12 z`}
          fill="#3d7a54"
          opacity={0.9 - i * 0.06}
        />
      ))}
    </svg>
  );
}

/** Snow Republic peak mark — a fallback logo glyph. */
export function PeakMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 27 L16 14 L20 20 L24 12 L32 27 Z"
        fill="currentColor"
      />
      <path d="M14.5 17.5 L16 14 L18 17 L16.2 16 Z" fill="#f5efe1" />
    </svg>
  );
}
