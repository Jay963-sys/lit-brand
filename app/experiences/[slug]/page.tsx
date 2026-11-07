import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MiniCrowd } from "@/components/crowd-canvas";
import ProductVisual from "@/components/product-visual";
import Reveal from "@/components/reveal";
import { Eyebrow, GhostButton, GlowButton, Wrap } from "@/components/ui";
import { experiences, getExperience, getProduct } from "@/lib/content";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) return {};
  return { title: e.name, description: e.summary };
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();

  const idx = experiences.findIndex((x) => x.slug === e.slug);
  const next = experiences[(idx + 1) % experiences.length];

  return (
    <>
      <section className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden pt-40 pb-[clamp(40px,7vw,80px)]">
        <MiniCrowd cue={e.scene} />
        <div className="absolute inset-0 bg-gradient-to-t from-venue via-venue/45 to-venue/40" />
        <Wrap className="relative z-10 w-full">
          <Link href="/experiences" className="label no-underline transition hover:text-haze">
            ← All experiences
          </Link>
          <p className="label mt-8">
            {e.name} · {e.kicker}
          </p>
          <h1 className="mt-4 max-w-[15ch] text-[clamp(28px,5vw,70px)] leading-[0.94] text-balance">
            {e.headline}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(16px,1.6vw,19px)] text-mist">{e.summary}</p>
        </Wrap>
      </section>

      <section className="py-[clamp(50px,8vw,100px)]">
        <Wrap>
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
            <Reveal>
              <Eyebrow>How we light it</Eyebrow>
              <div className="space-y-6">
                {e.body.map((p, i) => (
                  <p key={i} className="text-[clamp(16px,1.5vw,19px)] text-mist">
                    {p}
                  </p>
                ))}
              </div>

              <p className="label mt-12 mb-5">Kit we would use</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {e.products.map((s, i) => {
                  const p = getProduct(s);
                  if (!p) return null;
                  return (
                    <Link
                      key={s}
                      href={`/products/${s}`}
                      className="group flex items-center gap-4 rounded-2xl border border-line bg-venue-2 p-4 no-underline transition hover:border-line-strong"
                    >
                      <ProductVisual slug={s} delay={i * 4} className="h-16 w-20 shrink-0" />
                      <div>
                        <p className="font-display text-[14px] font-semibold text-haze">{p.name}</p>
                        <p className="text-[13.5px] text-dim">{p.kicker}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="rounded-3xl border border-line bg-venue-2 p-7 md:sticky md:top-28">
                <Eyebrow>Sample cue list</Eyebrow>
                <ol className="list-none p-0">
                  {e.cueList.map((c, i) => (
                    <li key={c.cue + i} className="flex gap-4 border-b border-line py-4 last:border-0">
                      <span className="font-mono text-[12px] tracking-[0.16em] text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display text-[15px] font-semibold">{c.cue}</p>
                        <p className="mt-1 text-[14.5px] text-mist">{c.moment}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-[13.5px] text-dim">
                  Every cue list is built with you around your own run of show.
                </p>
                <div className="mt-7">
                  <GlowButton href="/quote">Plan something like this</GlowButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <Link
            href={`/experiences/${next.slug}`}
            className="group relative block overflow-hidden rounded-[28px] border border-line bg-venue no-underline transition hover:border-line-strong"
          >
            <MiniCrowd cue={next.scene} className="opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-venue via-venue/80 to-venue/30" />
            <div className="relative p-[clamp(28px,5vw,56px)]">
              <span className="label">Next experience</span>
              <p className="mt-4 font-display text-[clamp(24px,3.8vw,48px)] leading-none font-semibold tracking-[-0.035em] text-haze">
                {next.name} <span className="inline-block transition group-hover:translate-x-2">→</span>
              </p>
            </div>
          </Link>
          <div className="mt-10">
            <GhostButton href="/products">See the products</GhostButton>
          </div>
        </Wrap>
      </section>
    </>
  );
}
