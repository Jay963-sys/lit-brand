import Link from "next/link";

/**
 * Placeholder mark built from the client's logo inspo: two overlapping orbs
 * ("people") over a soft bar of light ("lights"). Swap for the designer's
 * final asset when it arrives. `id` keeps gradient ids unique per instance.
 */
export function Mark({ className = "h-7 w-[30px]", id = "m" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 120 112" aria-hidden className={`overflow-visible ${className}`}>
      <defs>
        <radialGradient id={`${id}-orb`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6bd6" />
          <stop offset="45%" stopColor="#c86bff" />
          <stop offset="70%" stopColor="#ff3d6e" />
          <stop offset="100%" stopColor="#ff5a1c" />
        </radialGradient>
        <radialGradient id={`${id}-mid`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8f6bff" />
          <stop offset="70%" stopColor="#3d7bff" />
          <stop offset="100%" stopColor="#2d5bff" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id={`${id}-bar`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2f8bff" />
          <stop offset="22%" stopColor="#b98bff" />
          <stop offset="48%" stopColor="#ffffff" />
          <stop offset="74%" stopColor="#ffb3e6" />
          <stop offset="100%" stopColor="#ff5a1c" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>
      <g filter={`url(#${id}-soft)`} style={{ isolation: "isolate" }}>
        <circle cx="34" cy="30" r="25" fill={`url(#${id}-orb)`} />
        <circle cx="86" cy="30" r="25" fill={`url(#${id}-orb)`} />
        <circle cx="60" cy="30" r="22" fill={`url(#${id}-mid)`} style={{ mixBlendMode: "screen" }} />
        <rect x="9" y="64" width="102" height="44" rx="22" fill={`url(#${id}-bar)`} />
      </g>
    </svg>
  );
}

export default function Logo({ href = "/", id = "logo" }: { href?: string; id?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-haze no-underline">
      <Mark id={id} className="mark-glow h-7 w-[30px]" />
      <b className="font-display text-[15px] font-semibold tracking-[0.22em]">LIT BRAND</b>
    </Link>
  );
}
