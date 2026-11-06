"use client";

import { useEffect, useRef } from "react";

/**
 * A statement that lights up word by word as it scrolls through the viewport,
 * like a crowd switching on. Words wrapped in *asterisks* get the gradient.
 */
export default function LitWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.dataset.on = "true"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the viewport, 1 when its bottom hits 45%.
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.4);
      const lit = Math.floor(Math.min(1, Math.max(0, p)) * spans.length * 1.05);
      spans.forEach((s, i) => (s.dataset.on = i < lit ? "true" : "false"));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i}>
            <span data-w data-on="false" className={`lit-word ${accent ? "lit-word-accent" : ""}`}>
              {clean}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
