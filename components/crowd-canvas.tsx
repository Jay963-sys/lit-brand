"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Cue = "wave" | "pulse" | "sweep" | "split" | "strobe" | "black";

export const cues: { id: Cue; label: string }[] = [
  { id: "wave", label: "Wave" },
  { id: "pulse", label: "Pulse" },
  { id: "sweep", label: "Colour sweep" },
  { id: "split", label: "Split the room" },
  { id: "strobe", label: "Strobe" },
  { id: "black", label: "Blackout" },
];

const AUTO_ORDER: Cue[] = ["wave", "pulse", "sweep", "split", "strobe"];
const HUES = [
  "#FF4D1C",
  "#FF2E93",
  "#B23BFF",
  "#3D6BFF",
  "#22D3EE",
  "#FFD166",
  "#FFFFFF",
  "#FF0066",
];

type Dot = { x: number; y: number; u: number; v: number; s: number; r: number; h: number };

/**
 * A dark venue full of wristbands. The hero is the product: visitors run real
 * cues on a simulated crowd instead of looking at a stock photo.
 */
export default function CrowdCanvas({
  cue,
  onAutoCue,
  autoCycle,
}: {
  cue: Cue;
  onAutoCue?: (cue: Cue) => void;
  autoCycle: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
  const cueRef = useRef<Cue>(cue);
  const autoRef = useRef(autoCycle);
  const onAutoRef = useRef(onAutoCue);
  const sizeRef = useRef({ w: 0, h: 0 });

  cueRef.current = cue;
  autoRef.current = autoCycle;
  onAutoRef.current = onAutoCue;

  const build = useCallback((w: number, h: number) => {
    const dots: Dot[] = [];
    const mobile = w < 760;
    const rows = mobile ? 20 : 28;
    for (let i = 0; i < rows; i++) {
      const t = i / (rows - 1);
      const perRow = Math.round((mobile ? 26 : 48) - (mobile ? 12 : 26) * t);
      const y = h * (0.3 + 0.76 * Math.pow(t, 1.75));
      const size = (mobile ? 2.6 : 3.2) + (mobile ? 7 : 10) * Math.pow(t, 1.4);
      for (let j = 0; j < perRow; j++) {
        const u = (j + (Math.random() - 0.5) * 0.85) / (perRow - 1);
        dots.push({
          x: u * w * 1.06 - w * 0.03,
          y: y + (Math.random() - 0.5) * h * 0.012,
          u: Math.min(1, Math.max(0, u)),
          v: t,
          s: size * (0.8 + Math.random() * 0.45),
          r: Math.random(),
          h: Math.floor(Math.random() * HUES.length),
        });
      }
    }
    dotsRef.current = dots;
  }, []);

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
      g.addColorStop(0, hex);
      g.addColorStop(0.28, hex);
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(r, r, r, 0, Math.PI * 2);
      c.fill();
      return s;
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
          const p = 0.5 + 0.5 * Math.sin(t * 2.5 - d.v * 0.4);
          return [(Math.floor(t * 0.35) + 1) % HUES.length, 0.18 + 0.82 * Math.pow(p, 2)];
        }
        case "sweep": {
          const idx = Math.floor((d.u * 1.4 + t * 0.22) * HUES.length) % HUES.length;
          return [(idx + HUES.length) % HUES.length, 0.55 + 0.35 * Math.sin(t * 1.4 + d.r * 6)];
        }
        case "split": {
          const left = d.u < 0.5;
          const p = 0.5 + 0.5 * Math.sin(t * 2.2 + (left ? 0 : Math.PI));
          return [left ? 0 : 3, 0.15 + 0.85 * p];
        }
        case "strobe": {
          const on = Math.floor(t * 9) % 2 === 0;
          return [6, on && d.r > 0.12 ? 1 : 0.04];
        }
        case "black":
          return [6, 0.045 + 0.03 * Math.sin(t * 0.8 + d.r * 6)];
        default: {
          const ph = t * 2.1 - d.u * 4.2 - d.v * 0.8;
          const w = Math.pow(Math.max(0, Math.sin(ph)), 2.4);
          return [d.h, 0.1 + 0.9 * w];
        }
      }
    };

    const paint = (t: number, floor = 0) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const [hue, raw] = state(d, t);
        const b = Math.max(raw, floor);
        if (b < 0.03) continue;
        const sz = d.s * (1.6 + b * 2.6);
        ctx.globalAlpha = Math.min(1, 0.18 + b * 0.82);
        ctx.drawImage(spritesRef.current[hue], d.x - sz / 2, d.y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();

    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduced) paint(1.2, 0.35);
      }, 140);
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      paint(1.2, 0.35);
    } else {
      const start = performance.now();
      let lastSwitch = 0;
      let idx = 0;
      const frame = (now: number) => {
        const t = (now - start) / 1000;
        if (autoRef.current && t - lastSwitch > 5.5) {
          lastSwitch = t;
          idx = (idx + 1) % AUTO_ORDER.length;
          onAutoRef.current?.(AUTO_ORDER[idx]);
        }
        paint(t);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [build]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

/** Cue deck — the control surface under the fold line. */
export function CueDeck({
  active,
  onSelect,
}: {
  active: Cue;
  onSelect: (cue: Cue) => void;
}) {
  return (
    <div className="relative z-30 border-t border-line bg-venue/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-5 gap-y-3 px-5 py-3.5 sm:px-8 lg:px-[72px]">
        <span className="label whitespace-nowrap">Run a cue on the crowd</span>
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
                    ? "lit-fill border-transparent text-white shadow-[0_0_24px_rgba(255,77,28,0.4)]"
                    : "border-line text-dim hover:border-line-strong hover:text-haze",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Hero shell that owns cue state and stops auto-cycling once a visitor takes over. */
export function CrowdStage({ children }: { children: React.ReactNode }) {
  const [cue, setCue] = useState<Cue>("wave");
  const [auto, setAuto] = useState(true);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <CrowdCanvas cue={cue} autoCycle={auto} onAutoCue={setCue} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,10,.92) 0%, rgba(5,5,10,.42) 34%, rgba(5,5,10,0) 56%, rgba(5,5,10,.75) 100%)",
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
