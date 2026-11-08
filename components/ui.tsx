import Link from "next/link";

export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-[72px] ${className}`}>{children}</div>
  );
}

export function Bloom({
  color,
  size = 520,
  className = "",
  opacity = 0.16,
}: {
  color: string;
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        opacity: opacity * 2.2,
        background: `radial-gradient(circle, ${color} 0%, ${color}55 30%, transparent 68%)`,
      }}
    />
  );
}

export function GlowButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "lit-fill lit-shimmer inline-block rounded-full px-5 py-3 text-sm font-semibold text-white no-underline shadow-[0_0_34px_rgba(255,81,31,0.35)] transition hover:-translate-y-0.5 hover:brightness-110";
  return external ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-block rounded-full border border-line px-5 py-3 text-sm font-semibold text-haze no-underline transition hover:border-line-strong";
  return external ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`label mb-5 ${className}`}>{children}</p>;
}

/** Centered section heading: eyebrow, title and optional intro line. */
export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 className="mx-auto">{title}</H2>
      {intro && <p className="mt-5 max-w-[48ch] text-mist">{intro}</p>}
    </div>
  );
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`max-w-[22ch] text-[clamp(24px,3.5vw,46px)] text-balance ${className}`}>{children}</h2>
  );
}
