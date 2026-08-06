"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Flake = {
  x: number;
  y: number;
  r: number; // radius — also drives depth (speed, opacity, sway)
  spd: number; // fall speed px/s
  sway: number; // horizontal sway amplitude
  phase: number; // sway phase
  drift: number; // how much this flake is pushed by wind (0..1, ~depth)
  alpha: number;
};

/**
 * Wind-driven snow flurry on a canvas. Flakes vary in size, speed, softness and
 * opacity to read as depth; a slowly gusting global wind makes it drift and swirl
 * rather than fall straight. Honors prefers-reduced-motion (static scatter) and
 * pauses while the tab is hidden.
 */
export function Snow({
  density = 1,
  className,
  tint = "#eaf3fb",
}: {
  density?: number;
  className?: string;
  tint?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let running = true;
    let last = performance.now();
    let t = 0;

    // Pre-rendered soft flake sprite (radial falloff) — cheap, realistic edges.
    const sprite = document.createElement("canvas");
    const S = 32;
    sprite.width = S;
    sprite.height = S;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    grad.addColorStop(0, tint);
    grad.addColorStop(0.5, tint);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = grad;
    sctx.beginPath();
    sctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
    sctx.fill();

    const spawn = (anywhere: boolean): Flake => {
      // Bias toward small flakes; a few large foreground ones.
      const r = Math.pow(Math.random(), 1.8) * 3.4 + 0.7;
      const depth = (r - 0.7) / 3.4; // 0 (far) .. 1 (near)
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -12,
        r,
        spd: 16 + depth * 46 + Math.random() * 8,
        sway: 6 + depth * 22,
        phase: Math.random() * Math.PI * 2,
        drift: 0.25 + depth * 0.9,
        alpha: 0.22 + depth * 0.6,
      };
    };

    const build = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 13000 * density);
      flakes = Array.from({ length: count }, () => spawn(true));
    };

    const drawFlake = (f: Flake) => {
      const d = f.r * 3.2; // sprite draw size (soft glow > core)
      ctx.globalAlpha = f.alpha;
      ctx.drawImage(sprite, f.x - d / 2, f.y - d / 2, d, d);
    };

    build();

    if (reduce) {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) drawFlake(f);
      ctx.globalAlpha = 1;
      return;
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      // Gusting wind: sum of slow sines → flurry, not a straight fall.
      const wind =
        Math.sin(t * 0.29) * 26 +
        Math.sin(t * 0.13 + 1.7) * 16 +
        Math.sin(t * 0.061 + 0.4) * 12;

      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.phase += dt * (0.7 + f.r * 0.25);
        const localSway = Math.sin(f.phase) * f.sway;
        f.x += (wind * f.drift + localSway) * dt;
        f.y += f.spd * dt;

        if (f.y - f.r > h) {
          Object.assign(f, spawn(false));
        }
        if (f.x > w + 14) f.x = -14;
        else if (f.x < -14) f.x = w + 14;

        drawFlake(f);
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(frame);
    };

    let onScreen = true;
    const setActive = (active: boolean) => {
      if (active && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!active && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    // Only animate while the section is on-screen and the tab is visible.
    const sync = () => setActive(!document.hidden && onScreen);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(parent);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [density, reduce, tint]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
