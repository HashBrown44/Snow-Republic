"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import type { MenuItem, MenuCategory } from "@/lib/types";
import { Reveal, RevealGroup, RevealItem } from "../motion/Reveal";
import { modifierGroups, type Extra, type ModGroup } from "@/lib/menuExtras";

const order: MenuCategory[] = [
  "Apps & Salads",
  "Handhelds",
  "Wood-Fired Pizza",
  "Tacos & Sides",
  "Kids & Pups",
];

/** Branded placeholder for items without a photo — a faint repeating wordmark. */
function MenuWatermark() {
  return (
    <div className="absolute inset-0 bg-cream">
      <svg className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern
            id="sr-watermark"
            width="240"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-18)"
          >
            <text
              x="0"
              y="22"
              fontFamily="var(--font-inter), sans-serif"
              fontSize="13"
              fontWeight="600"
              letterSpacing="1"
              fill="#103952"
              fillOpacity="0.07"
            >
              SNOW REPUBLIC BREWERY •
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sr-watermark)" />
      </svg>
    </div>
  );
}

function MenuCard({
  item,
  onOpen,
}: {
  item: MenuItem;
  onOpen?: (item: MenuItem) => void;
}) {
  const interactive = Boolean(onOpen);
  const Tag = interactive ? "button" : "div";
  return (
    <Tag
      {...(interactive
        ? { type: "button" as const, onClick: () => onOpen!(item) }
        : {})}
      className={`group flex min-h-[9.5rem] w-full overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bone text-left shadow-[0_18px_34px_-26px_rgba(0,0,0,0.7)] ${
        interactive
          ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-ice-500/50 hover:shadow-[0_26px_44px_-24px_rgba(0,0,0,0.75)]"
          : ""
      }`}
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-2">
          <h4 className="font-display text-lg font-semibold leading-tight text-steel-900">
            {item.name}
          </h4>
          {item.veg && (
            <span className="mt-0.5 shrink-0 rounded bg-steel-600/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-steel-700">
              Veg
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-charcoal/70">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="tnum font-display text-lg font-semibold text-steel-900">
            ${item.price.toFixed(2)}
          </span>
          {interactive && (
            <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ice-600 transition-colors group-hover:text-ice-700">
              <Plus className="h-3.5 w-3.5" />
              Add-ons
            </span>
          )}
        </div>
      </div>

      <div className="relative w-[34%] shrink-0 overflow-hidden sm:w-[38%]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 40vw, 220px"
            className={`object-cover ${
              interactive
                ? "transition-transform duration-500 group-hover:scale-[1.05]"
                : ""
            }`}
          />
        ) : (
          <MenuWatermark />
        )}
      </div>
    </Tag>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors ${
        checked
          ? "border-steel-800 bg-steel-800 text-bone"
          : "border-charcoal/30"
      }`}
    >
      {checked && <Check className="h-4 w-4" strokeWidth={3} />}
    </span>
  );
}

function ModRow({
  group,
  item,
  checked,
  onToggle,
}: {
  group: ModGroup;
  item: Extra;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-t border-fog first:border-t-0">
      <button
        type="button"
        disabled={item.unavailable}
        onClick={onToggle}
        aria-pressed={checked}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-cream/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <span>
          <span className="block text-[15px] leading-tight text-steel-900">
            {item.name}
          </span>
          {item.price > 0 && (
            <span className="tnum mt-0.5 block text-sm text-charcoal/55">
              +${item.price.toFixed(2)}
            </span>
          )}
        </span>
        <Checkbox checked={checked} />
      </button>
    </li>
  );
}

function MenuModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSelected(new Set());
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const toggle = (group: ModGroup, extra: Extra) => {
    const key = `${group.label}::${extra.name}`;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        if (group.max === 1) {
          for (const it of group.items) next.delete(`${group.label}::${it.name}`);
        }
        next.add(key);
      }
      return next;
    });
  };

  const { addTotal, count } = useMemo(() => {
    let sum = 0;
    for (const g of modifierGroups) {
      for (const it of g.items) {
        if (selected.has(`${g.label}::${it.name}`)) sum += it.price;
      }
    }
    return { addTotal: sum, count: selected.size };
  }, [selected]);

  const total = (item?.price ?? 0) + addTotal;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} — add-ons and sauces`}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.5rem] bg-cream shadow-2xl sm:max-h-[85vh] sm:rounded-[1.5rem]"
          >
            {item.image && (
              <div className="relative h-36 w-full shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="512px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-ink/50 text-bone backdrop-blur transition-colors hover:bg-ink/70"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Item header (fixed) */}
            <div className="shrink-0 border-b border-fog px-6 pb-4 pt-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-steel-900">
                  {item.name}
                </h3>
                <span className="tnum font-display text-xl font-semibold text-steel-900">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">
                {item.description}
              </p>
            </div>

            {/* Modifier groups (scroll) */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {modifierGroups.map((group) => (
                <div
                  key={group.label}
                  className="overflow-hidden rounded-2xl border border-fog bg-bone"
                >
                  <div className="px-4 pb-1.5 pt-4">
                    <div className="font-display text-lg font-semibold text-steel-900">
                      {group.label}
                    </div>
                    <div className="text-sm text-charcoal/55">{group.note}</div>
                  </div>
                  <ul>
                    {group.items.map((extra) => {
                      const key = `${group.label}::${extra.name}`;
                      return (
                        <ModRow
                          key={key}
                          group={group}
                          item={extra}
                          checked={selected.has(key)}
                          onToggle={() => toggle(group, extra)}
                        />
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Running total (fixed) */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-fog bg-bone px-6 py-4">
              <div>
                <div className="text-[0.65rem] font-semibold uppercase tracking-widest text-charcoal/50">
                  Your build{count > 0 ? ` · ${count} add-on${count > 1 ? "s" : ""}` : ""}
                </div>
                <div className="tnum font-display text-2xl font-semibold text-steel-900">
                  ${total.toFixed(2)}
                </div>
              </div>
              <p className="max-w-[52%] text-right text-xs leading-snug text-charcoal/55">
                Build it here, then order at the taproom.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MenuBoard({ menu }: { menu: MenuItem[] }) {
  const [active, setActive] = useState<MenuItem | null>(null);

  const grouped = order
    .map((cat) => ({ cat, items: menu.filter((m) => m.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <div className="mt-16 space-y-14">
        {grouped.map(({ cat, items }) => (
          <div key={cat}>
            <Reveal>
              <h3 className="mb-6 flex items-center gap-4 font-display text-xl font-semibold text-ice-300">
                {cat}
                <span className="h-px flex-1 bg-bone/15" />
              </h3>
            </Reveal>
            <RevealGroup className="grid gap-4 lg:grid-cols-2" stagger={0.06}>
              {items.map((item) => (
                <RevealItem key={item._id}>
                  <MenuCard
                    item={item}
                    onOpen={
                      item.category === "Kids & Pups" ? undefined : setActive
                    }
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>

      <MenuModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
