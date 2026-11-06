import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import { Bloom, Eyebrow, GlowButton, Wrap } from "@/components/ui";
import { accentHex, caseStudies, getCaseStudy, getProduct } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.filter((c) => c.published).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || !study.published) notFound();

  const facts = [
    { label: "Client", value: study.client },
    { label: "Format", value: study.category },
    { label: "Venue", value: study.location },
    { label: "Guests", value: study.guests },
    { label: "Year", value: study.date },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-[clamp(40px,7vw,80px)]">
        <Bloom color={accentHex[study.accent]} size={640} opacity={0.2} className="-top-48 -left-40" />
        <Wrap className="relative z-10">
          <Link href="/work" className="label no-underline transition hover:text-haze">
            ← All events
          </Link>
          <p className="label mt-8">
            {study.category} · {study.location} · {study.date}
          </p>
          <h1 className="mt-4 max-w-[17ch] text-[clamp(36px,6vw,78px)] text-balance">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(16px,1.6vw,19px)] text-mist">
            {study.summary}
          </p>
        </Wrap>
      </section>

      <section className="pb-[clamp(50px,8vw,90px)]">
        <Wrap>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label} className="bg-venue-2 p-6">
                <dt className="font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
                  {f.label}
                </dt>
                <dd className="mt-2 text-[15.5px] text-haze">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
            <Reveal>
              <div>
                <Eyebrow>The brief</Eyebrow>
                <p className="text-[clamp(16px,1.5vw,18.5px)] text-mist">{study.brief}</p>
                <div className="mt-10">
                  <Eyebrow>What we ran</Eyebrow>
                  <div className="space-y-5">
                    {study.approach.map((p, i) => (
                      <p key={i} className="text-[clamp(16px,1.5vw,18.5px)] text-mist">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="rounded-2xl border border-line bg-venue-2 p-7">
                <Eyebrow>Cue list</Eyebrow>
                <ol className="list-none space-y-0 p-0">
                  {study.cueList.map((c, i) => (
                    <li key={c.cue + i} className="border-b border-line py-4 last:border-0">
                      <span className="font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
                        Cue {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-1.5 font-display text-[17px] font-bold">{c.cue}</p>
                      <p className="mt-1 text-[14.5px] text-mist">{c.moment}</p>
                    </li>
                  ))}
                </ol>

                <p className="label mt-7 mb-3">Kit used</p>
                <ul className="flex list-none flex-wrap gap-2 p-0">
                  {study.products.map((slug) => {
                    const p = getProduct(slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/products/${slug}`}
                          className="inline-block rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-mist no-underline transition hover:border-line-strong hover:text-haze"
                        >
                          {p.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-line pt-12">
            <GlowButton href="/quote">Plan something like this</GlowButton>
          </div>
        </Wrap>
      </section>
    </>
  );
}
