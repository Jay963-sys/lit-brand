"use client";

import { useEffect, useRef } from "react";

/**
 * The neon logo loop from the brand kit (re-encoded to ~120KB, no audio).
 * Nothing downloads until it's near the viewport, and it pauses off screen.
 */
export default function BrandVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload === "none") {
            v.preload = "auto";
            v.load();
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`brand-video ${className}`}
      muted
      loop
      playsInline
      preload="none"
      poster="/brand/neon-poster.webp"
      aria-label="The LIT mark glowing in neon"
    >
      <source src="/brand/neon-loop.mp4" type="video/mp4" />
    </video>
  );
}
