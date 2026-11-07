import Link from "next/link";
import { LOCKUP, MARK, WORDMARK } from "./brand-paths";

type Geo = { viewBox: string; paths: string[]; circles: [number, number, number][] };

function Shape({ geo, className = "", title }: { geo: Geo; className?: string; title?: string }) {
  return (
    <svg
      viewBox={geo.viewBox}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {geo.circles.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
      {geo.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** The five-circle "people" mark. */
export function Mark({ className = "h-6 w-auto" }: { className?: string }) {
  return <Shape geo={MARK} className={className} />;
}

/** The LIT wordmark. */
export function Wordmark({ className = "h-5 w-auto", title }: { className?: string; title?: string }) {
  return <Shape geo={WORDMARK} className={className} title={title} />;
}

/** Mark stacked over the wordmark. */
export function Lockup({ className = "h-24 w-auto", title }: { className?: string; title?: string }) {
  return <Shape geo={LOCKUP} className={className} title={title} />;
}

export default function Logo({ href = "/" }: { href?: string; id?: string }) {
  return (
    <Link href={href} aria-label="LIT — home" className="group flex items-center gap-2.5 text-core no-underline">
      <Mark className="h-[26px] w-auto text-ember transition group-hover:text-pulse" />
      <Wordmark className="h-[19px] w-auto" />
    </Link>
  );
}
