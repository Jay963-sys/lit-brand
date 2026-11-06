import Link from "next/link";

/**
 * Placeholder mark built from the client's logo direction: two soft orbs
 * bleeding into each other — "people" and "light". Swap for the real asset
 * once a brand designer delivers it.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative block h-5 w-[34px] ${className}`}>
      <i className="absolute top-0 left-0 block h-5 w-5 rounded-full bg-ember blur-[5px] mix-blend-screen" />
      <i className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-electric blur-[5px] mix-blend-screen" />
    </span>
  );
}

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 no-underline">
      <Mark />
      <b className="font-display text-[19px] font-extrabold tracking-[0.02em]">LIT BRAND</b>
    </Link>
  );
}
