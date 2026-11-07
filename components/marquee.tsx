/** Infinite ticker. Content is duplicated once so the loop is seamless. */
export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 list-none items-center gap-10 p-0 pr-10"
    >
      {items.map((item, i) => (
        <li key={item + i} className="flex items-center gap-10 whitespace-nowrap">
          <span className={i % 2 ? "text-haze/85" : "text-ember"}>{item}</span>
          <span className="lit-dot" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee group flex overflow-hidden font-display text-[clamp(26px,4.4vw,62px)] font-medium tracking-[-0.035em] ${className}`}
    >
      <div className={`flex ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
