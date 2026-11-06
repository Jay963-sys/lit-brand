"use client";

import { useEffect, useRef } from "react";

/** Big lines that light up as they cross the middle of the viewport. */
export default function FeelList({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = Array.from(el.querySelectorAll<HTMLLIElement>("li"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((l) => (l.dataset.on = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).dataset.on = e.isIntersecting ? "true" : "false";
        }
      },
      { rootMargin: "-38% 0px -38% 0px" },
    );
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="list-none space-y-2 p-0">
      {items.map((item) => (
        <li
          key={item}
          data-on="false"
          className="feel-line font-display text-[clamp(32px,6.4vw,88px)] leading-[1.02] font-semibold tracking-[-0.035em]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
