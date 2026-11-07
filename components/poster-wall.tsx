/**
 * Brand posters from the OA-Studios kit, pre-sized to 900px WebP in
 * /public/brand so they're served straight from the CDN (no image
 * optimisation calls). Scrolls as a slow ticker; pauses on hover.
 */
const posters = [
  { src: "/brand/poster-1.webp", alt: "A hand holding a glowing red LIT wristband" },
  { src: "/brand/poster-4.webp", alt: "LIT logo lockup on Pulse blue" },
  { src: "/brand/poster-3.webp", alt: "Ember light beams over the LIT wordmark" },
  { src: "/brand/poster-5.webp", alt: "LIT wristband icon on Ember" },
  { src: "/brand/poster-2.webp", alt: "The LIT mark in chrome on a blue gradient" },
  { src: "/brand/poster-7.webp", alt: "A crowd with raised hands on Ember, LIT wordmark" },
  { src: "/brand/poster-6.webp", alt: "LIT wristband icon on Pulse blue" },
];

export default function PosterWall() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 list-none gap-5 p-0 pr-5">
      {posters.map((p) => (
        <li key={p.src} className="w-[clamp(200px,24vw,320px)] shrink-0">
          <img
            src={p.src}
            alt={hidden ? "" : p.alt}
            width={900}
            height={1125}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[18px] border border-line object-cover"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee flex overflow-hidden">
      <div className="marquee-track flex [animation-duration:60s]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
