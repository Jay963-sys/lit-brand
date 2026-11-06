"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Cue =
  | "wave"
  | "pulse"
  | "sweep"
  | "split"
  | "strobe"
  | "black"
  | "channels"
  | "glow";

export const cues: { id: Cue; label: string }[] = [
  { id: "wave", label: "Wave" },
  { id: "pulse", label: "Pulse" },
  { id: "sweep", label: "Colour sweep" },
  { id: "split", label: "Split the room" },
  { id: "channels", label: "Silent disco" },
  { id: "strobe", label: "Strobe" },
  { id: "black", label: "Blackout" },
];

const AUTO_ORDER: Cue[] = ["wave", "sweep", "pulse", "split", "channels", "strobe"];

// 0 ember · 1 magenta · 2 violet · 3 electric · 4 cyan · 5 gold · 6 white · 7 hot pink
const HUES = ["#FF4D1C", "#FF2E93", "#B23BFF", "#3D6BFF", "#22D3EE", "#FFC23D", "#FFFFFF", "#FF0066"];
const BEAM_HUE: Record<Cue, number> = {
  wave: 1,
  pulse: 2,
  sweep: 4,
  split: 0,
  strobe: 6,
  black: 2,
  channels: 3,
  glow: 5,
};

type Dot = { x: number; y: number; u: number; v: number; s: number; r: number; h: number };
type Ripple = { x: number; y: number; t0: number; hue: number };

/**
 * A dark venue full of wristbands. The hero is the product: visitors run real
 * cues on a simulated crowd, light it with the cursor, and tap to send a ripple.
 */
export default function CrowdCanvas({
  cue,
  onAutoCue,
  autoCycle = false,
  variant = "hero",
  className = "absolute inset-0 h-full w-full",
}: {
  cue: Cue;
  onAutoCue?: (cue: Cue) => void;
  autoCycle?: boolean;
  variant?: "hero" | "mini";
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
  const cueRef = useRef<Cue>(cue);
  const autoRef = useRef(autoCycle);
  const onAutoRef = useRef(onAutoCue);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pointerRef = useRef<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });
  const ripplesRef = useRef<Ripple[]>([]);

  cueRef.current = cue;
  autoRef.current = autoCycle;
  onAutoRef.current = onAutoCue;

  const hero = variant === "hero";

  const build = useCallback(
    (w: number, h: number) => {
      const dots: Dot[] = [];
      const mobile = w < 760;
      const rows = hero ? (mobile ? 18 : 26) : 14;
      const top = hero ? 0.34 : 0.06;
      const span = hero ? 0.72 : 0.95;
      // Back rows hold more (smaller) wristbands than the front rows.
      const back = hero ? (mobile ? 22 : 46) : 24;
      const shrink = hero ? (mobile ? 10 : 24) : 10;
      const minS = hero ? (mobile ? 2.8 : 3.4) : 3;
      const growS = hero ? (mobile ? 8 : 11) : 8;
      for (let i = 0; i < rows; i++) {
        const t = i / (rows - 1);
        const perRow = Math.round(back - shrink * t);
        const y = h * (top + span * Math.pow(t, 1.7));
        const size = minS + growS * Math.pow(t, 1.4);
        for (let j = 0; j < perRow; j++) {
          const u = (j + (Math.random() - 0.5) * 0.85) / (perRow - 1);
          dots.push({
            x: u * w * 1.06 - w * 0.03,
            y: y + (Math.random() - 0.5) * h * 0.014,
            u: Math.min(1, Math.max(0, u)),
            v: t,
            s: size * (0.8 + Math.random() * 0.45),
            r: Math.random(),
            h: Math.floor(Math.random() * HUES.length),
          });
        }
      }
      dotsRef.current = dots;
    },
    [hero],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    spritesRef.current = HUES.map((hex) => {
      const s = document.createElement("canvas");
      const r = 32;
      s.width = s.height = r * 2;
      const c = s.getContext("2d")!;
      const g = c.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.12, hex);
      g.addColorStop(0.3, hex);
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(r, r, r, 0, Math.PI * 2);
      c.fill();
      return s;
    });

    const resize = () => {
      // Soft glows don't need retina resolution; 1x keeps the pixel count down.
      const dpr = 1;
      const rect = canvas.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(rect.width, rect.height);
    };

    const state = (d: Dot, t: number): [number, number] => {
      switch (cueRef.current) {
        case "pulse": {
          const p = 0.5 + 0.5 * Math.sin(t * 3 - d.v * 0.5);
          return [(Math.floor(t * 0.4) + 1) % HUES.length, 0.12 + 0.88 * Math.pow(p, 2.2)];
        }
        case "sweep": {
          const idx = Math.floor((d.u * 1.4 + t * 0.25) * HUES.length) % HUES.length;
          return [(idx + HUES.length) % HUES.length, 0.55 + 0.35 * Math.sin(t * 1.4 + d.r * 6)];
        }
        case "split": {
          const left = d.u < 0.5;
          const p = 0.5 + 0.5 * Math.sin(t * 2.4 + (left ? 0 : Math.PI));
          return [left ? 0 : 3, 0.12 + 0.88 * p];
        }
        case "strobe": {
          const on = Math.floor(t * 9) % 2 === 0;
          return [6, on && d.r > 0.12 ? 1 : 0.04];
        }
        case "black":
          return [6, 0.04 + 0.03 * Math.sin(t * 0.8 + d.r * 6)];
        case "channels": {
          // Listeners drift between three channels; colour shows who they're on.
          const k = (d.r + Math.floor(t / 6 + d.r * 0.6) * 0.37) % 1;
          const ch = k < 0.42 ? 1 : k < 0.74 ? 3 : 4;
          const beat = Math.pow(0.5 + 0.5 * Math.sin(t * (ch === 1 ? 4 : ch === 3 ? 3.2 : 2.6)), 3);
          return [ch, 0.35 + 0.65 * beat];
        }
        case "glow": {
          const p = 0.5 + 0.5 * Math.sin(t * 0.9 + d.u * 2 + d.r * 1.5);
          return [d.r > 0.7 ? 6 : d.r > 0.35 ? 5 : 1, 0.3 + 0.6 * p];
        }
        default: {
          const ph = t * 2.2 - d.u * 4.2 - d.v * 0.8;
          const w = Math.pow(Math.max(0, Math.sin(ph)), 2.4);
          return [d.h, 0.08 + 0.92 * w];
        }
      }
    };

    const beams = (t: number) => {
      const { w, h } = sizeRef.current;
      const hex = HUES[BEAM_HUE[cueRef.current]];
      if (cueRef.current === "black") return;
      const strobeOff = cueRef.current === "strobe" && Math.floor(t * 9) % 2 === 1;
      if (strobeOff) return;
      const count = w < 760 ? 2 : 4;
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < count; i++) {
        const ox = w * ((i + 0.5) / count);
        const ang = Math.sin(t * 0.5 + i * 1.7) * 0.42;
        const len = h * 0.95;
        const spread = w * 0.07;
        const ex = ox + Math.sin(ang) * len;
        const ey = Math.cos(ang) * len - 20;
        const g = ctx.createLinearGradient(ox, -20, ex, ey);
        g.addColorStop(0, hex + "55");
        g.addColorStop(0.55, hex + "14");
        g.addColorStop(1, hex + "00");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(ox - 3, -20);
        ctx.lineTo(ox + 3, -20);
        ctx.lineTo(ex + spread, ey);
        ctx.lineTo(ex - spread, ey);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const paint = (t: number, floor = 0) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      if (hero) beams(t);
      ctx.globalCompositeOperation = "lighter";

      const p = pointerRef.current;
      const pr = Math.max(120, w * 0.11);
      const ripples = ripplesRef.current;
      const speed = Math.max(w, 600) * 0.55;
      for (let k = ripples.length - 1; k >= 0; k--) {
        if ((t - ripples[k].t0) * speed > w * 1.4) ripples.splice(k, 1);
      }

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let [hue, b] = state(d, t);
        b = Math.max(b, floor, hero ? 0 : 0.14);

        if (p.on) {
          const dx = d.x - p.x;
          const dy = d.y - p.y;
          const dist = Math.abs(dx) < pr && Math.abs(dy) < pr ? Math.sqrt(dx * dx + dy * dy) : pr;
          if (dist < pr) {
            const k = 1 - dist / pr;
            if (k * k > b) {
              b = Math.max(b, k * k);
              hue = d.h;
            }
          }
        }

        for (let k = 0; k < ripples.length; k++) {
          const rp = ripples[k];
          const radius = (t - rp.t0) * speed;
          const dist = Math.hypot(d.x - rp.x, d.y - rp.y);
          const band = Math.abs(dist - radius);
          if (band < 60) {
            const fade = Math.max(0, 1 - radius / (w * 1.3));
            const k2 = (1 - band / 60) * fade;
            if (k2 > b * 0.6) {
              b = Math.max(b, k2);
              hue = rp.hue;
            }
          }
        }

        if (b < 0.03) continue;
        const sz = d.s * (1.6 + b * 2.8);
        ctx.globalAlpha = Math.min(1, 0.15 + b * 0.85);
        ctx.drawImage(spritesRef.current[hue], d.x - sz / 2, d.y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();

    // Pointer: light the crowd under the cursor, tap to send a ripple.
    const host = hero ? (canvas.parentElement ?? canvas) : null;
    const start = performance.now();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, on: e.pointerType === "mouse" };
    };
    const onLeave = () => {
      pointerRef.current.on = false;
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button,input,select,textarea")) return;
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t0: (performance.now() - start) / 1000,
        hue: [0, 1, 2, 3, 4, 5, 7][Math.floor(Math.random() * 7)],
      });
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
    };
    if (host && !reduced) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);
    }

    let raf = 0;
    let running = false;
    let visible = true;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastSwitch = 0;
    let idx = 0;

    // Frame budget: heroes aim for 60fps, mini crowds 30fps. If the device
    // can't keep up, drop to 30fps and thin the crowd.
    let minGap = hero ? 0 : 1000 / 30;
    let last = 0;
    let slow = 0;
    let degraded = false;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = now - last;
      if (dt < minGap - 1) return;
      if (last && !degraded) {
        slow = dt > 34 ? slow + 1 : Math.max(0, slow - 1);
        if (slow > 20) {
          degraded = true;
          minGap = 1000 / 30;
          dotsRef.current = dotsRef.current.filter((_, i) => i % 2 === 0);
        }
      }
      last = now;
      const t = (now - start) / 1000;
      if (autoRef.current && t - lastSwitch > 5) {
        lastSwitch = t;
        idx = (idx + 1) % AUTO_ORDER.length;
        onAutoRef.current?.(AUTO_ORDER[idx]);
      }
      paint(t);
    };
    const play = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduced) paint(1.2, 0.35);
      }, 140);
    };
    window.addEventListener("resize", onResize);

    if (reduced) paint(1.2, 0.35);
    else play();

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (host) {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("pointerdown", onDown);
      }
    };
  }, [build, hero]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

/** Cue deck — the control surface along the bottom of the hero. */
export function CueDeck({ active, onSelect }: { active: Cue; onSelect: (cue: Cue) => void }) {
  return (
    <div className="relative z-30 border-t border-line bg-venue/80">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-5 gap-y-3 px-5 py-3.5 sm:px-8 lg:px-[72px]">
        <span className="label flex items-center gap-2 whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
          </span>
          Live · run a cue
        </span>
        <div role="group" aria-label="Lighting cues" className="flex flex-wrap gap-2">
          {cues.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(c.id)}
                className={[
                  "cursor-pointer rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition",
                  on
                    ? "lit-fill border-transparent text-white shadow-[0_0_28px_rgba(255,46,147,0.55)]"
                    : "border-line text-dim hover:border-line-strong hover:text-haze",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <span className="label ml-auto hidden lg:inline">Tap the crowd ↓</span>
      </div>
    </div>
  );
}

/** Hero shell that owns cue state and stops auto-cycling once a visitor takes over. */
export function CrowdStage({ children }: { children: React.ReactNode }) {
  const [cue, setCue] = useState<Cue>("wave");
  const [auto, setAuto] = useState(true);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] cursor-crosshair flex-col justify-end overflow-hidden"
    >
      <CrowdCanvas cue={cue} autoCycle={auto} onAutoCue={setCue} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,10,.9) 0%, rgba(5,5,10,.35) 30%, rgba(5,5,10,0) 52%, rgba(5,5,10,.15) 70%, rgba(5,5,10,.85) 100%)",
        }}
      />
      {children}
      <CueDeck
        active={cue}
        onSelect={(c) => {
          setAuto(false);
          setCue(c);
        }}
      />
    </section>
  );
}

/** Small self-running crowd for cards. Pauses when off screen. */
export function MiniCrowd({ cue, className = "" }: { cue: Cue; className?: string }) {
  return <CrowdCanvas cue={cue} variant="mini" className={`absolute inset-0 h-full w-full ${className}`} />;
}
