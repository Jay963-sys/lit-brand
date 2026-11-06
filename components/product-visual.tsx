/**
 * Line-light illustrations of each product. They stand in for photography
 * until the client supplies real product shots, and cycle through the brand
 * palette so the cards feel live. The SVG (and its blur) is drawn once in its
 * accent colour; only a CSS hue-rotate + float run on the composited layer.
 */

const glow = (id: string) => (
  <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="7" result="b" />
    <feMerge>
      <feMergeNode in="b" />
      <feMergeNode in="b" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

function Band({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className="h-full w-full">
      <defs>{glow(id)}</defs>
      <g filter={`url(#${id})`} stroke="currentColor" strokeLinecap="round">
        {/* back of strap */}
        <path d="M40 98 C 40 62, 200 62, 200 98" strokeWidth="10" opacity="0.35" />
        {/* front of strap */}
        <path d="M40 98 C 40 140, 200 140, 200 98" strokeWidth="14" />
        {/* LED module */}
        <rect x="92" y="112" width="56" height="30" rx="12" fill="currentColor" stroke="none" />
      </g>
      <rect x="104" y="120" width="32" height="14" rx="7" fill="#fff" opacity="0.92" />
    </svg>
  );
}

function Lanyard({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className="h-full w-full">
      <defs>{glow(id)}</defs>
      <g filter={`url(#${id})`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 6 L112 104" strokeWidth="9" />
        <path d="M170 6 L128 104" strokeWidth="9" />
        <rect x="84" y="104" width="72" height="88" rx="10" strokeWidth="5" />
      </g>
      <rect x="112" y="98" width="16" height="12" rx="3" fill="#fff" opacity="0.85" />
      <text
        x="120"
        y="156"
        textAnchor="middle"
        fill="#fff"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="22"
        letterSpacing="1"
      >
        LIT
      </text>
      <rect x="100" y="166" width="40" height="5" rx="2.5" fill="#fff" opacity="0.4" />
    </svg>
  );
}

function Headset({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className="h-full w-full">
      <defs>{glow(id)}</defs>
      <g filter={`url(#${id})`} stroke="currentColor" strokeLinecap="round">
        <path d="M58 120 C 58 30, 182 30, 182 120" strokeWidth="11" />
        <rect x="36" y="104" width="44" height="66" rx="20" strokeWidth="6" />
        <rect x="160" y="104" width="44" height="66" rx="20" strokeWidth="6" />
        <ellipse cx="58" cy="137" rx="9" ry="18" fill="currentColor" stroke="none" />
        <ellipse cx="182" cy="137" rx="9" ry="18" fill="currentColor" stroke="none" />
      </g>
      <ellipse cx="58" cy="137" rx="3.5" ry="9" fill="#fff" opacity="0.9" />
      <ellipse cx="182" cy="137" rx="3.5" ry="9" fill="#fff" opacity="0.9" />
    </svg>
  );
}

const tint: Record<string, string> = { litbands: "#ff4d1c", lanyards: "#c43bff", headsets: "#3d8bff" };

export default function ProductVisual({
  slug,
  delay = 0,
  className = "",
}: {
  slug: string;
  delay?: number;
  className?: string;
}) {
  const id = `glow-${slug}`;
  const Art = slug === "lanyards" ? Lanyard : slug === "headsets" ? Headset : Band;
  return (
    <div
      aria-hidden
      className={`lit-float ${className}`}
      style={{ color: tint[slug] ?? tint.litbands, animationDelay: `-${delay}s` }}
    >
      <Art id={id} />
    </div>
  );
}
