import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import { Eyebrow, GlowButton, H2, Wrap } from "@/components/ui";
import { accentHex, caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Rooms we have lit up — concerts, weddings, silent discos and brand activations.",
};

export default function WorkPage() {
  const published = caseStudies.filter((c) => c.published);

  return (
    <>
      <section className="pt-40 pb-[clamp(40px,7vw,80px)]">
        <Wrap>
          <Eyebrow>Events</Eyebrow>
          <H2>Rooms we have lit up.</H2>
          <p className="mt-6 max-w-[58ch] text-[clamp(16px,1.5vw,18.5px)] text-mist">
            Each one comes with the cue list we ran, so you can see how the lighting was timed to
            the programme.
          </p>
        </Wrap>
      </section>

      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {published.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  href={`/work/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-venue-2 p-8 no-underline transition hover:-translate-y-1 hover:border-line-strong"
                >
                  <span
                    aria-hidden
                    className="absolute -top-20 -right-16 h-52 w-52 rounded-full opacity-35 blur-[52px] transition group-hover:opacity-70"
                    style={{ background: accentHex[c.accent] }}
                  />
                  <span className="label relative">
                    {c.category} · {c.location} · {c.date}
                  </span>
                  <h3 className="relative mt-4 text-[clamp(20px,2.2vw,26px)]">{c.title}</h3>
                  <p className="relative mt-3 flex-1 text-[15px] text-mist">{c.summary}</p>
                  <span className="relative mt-6 font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                    {c.guests} guests →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <GlowButton href="/quote">Put your event on this page</GlowButton>
          </div>
        </Wrap>
      </section>
    </>
  );
}
