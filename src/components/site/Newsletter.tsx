"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    // No backend yet — simulate the request so the flow is complete.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-bone">
        The Pour List
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-bone/70">
        New beer releases, trivia nights and live music — plus the occasional
        weekday deal. One email a month, mostly positive vibrations.
      </p>

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex items-center gap-2 rounded-xl bg-steel-700/50 px-4 py-3.5 text-sm font-medium text-ice-200"
            role="status"
          >
            <Check className="h-4 w-4" />
            You&rsquo;re on the list. See you at the bar.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            noValidate
            className="mt-5"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                aria-invalid={status === "error"}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="min-h-12 flex-1 rounded-xl border border-bone/20 bg-steel-950/40 px-4 text-bone placeholder:text-bone/40 focus:border-ice-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ice-500 px-6 font-semibold text-ink transition-colors hover:bg-ice-400 disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining
                  </>
                ) : (
                  "Join"
                )}
              </button>
            </div>
            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="mt-2 text-sm text-ice-300"
              >
                {error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
