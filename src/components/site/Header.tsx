"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#beer", label: "Beer" },
  { href: "#kitchen", label: "Food" },
  { href: "#drinks", label: "Drinks" },
  { href: "#events", label: "Events" },
  { href: "#visit", label: "Visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-steel-950/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center text-bone"
          aria-label="Snow Republic Brewery home"
        >
          <Logo className="h-14 w-auto sm:h-16" priority />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-bone/85 transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ice-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#visit"
          className="hidden rounded-full bg-ice-500 px-5 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-ice-400 md:inline-block"
        >
          Plan a Visit
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-bone md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-steel-950 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              <span className="flex items-center text-bone">
                <Logo className="h-14 w-auto" />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-bone"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.ul
              className="mt-6 flex flex-col gap-1 px-5"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-3xl text-bone"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mt-6"
              >
                <a
                  href="#visit"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-ice-500 py-3 text-center text-base font-semibold text-ink"
                >
                  Plan a Visit
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
