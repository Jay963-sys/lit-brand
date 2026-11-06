import Link from "next/link";
import type { Metadata } from "next";
import { MiniCrowd } from "@/components/crowd-canvas";
import Reveal from "@/components/reveal";
import { Eyebrow, GlowButton, H2, Wrap } from "@/components/ui";
import { experiences } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Concerts, silent discos, weddings, brand activations, church programmes and sports — how Lit Brand lights each one.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="pt-40 pb-[clamp(40px,7vw,80px)]">
        <Wrap>
          <Eyebrow>Experiences</Eyebrow>
          <H2>If people gather, they can light up together.</H2>
          <p className="mt-6 max-w-[58ch] text-[clamp(16px,1.5vw,18.5px)] text-mist">
            Every format has its own big moments. Here is how we light each one — and the cue list
            we would start from.
          </p>
        </Wrap>
      </section>

      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/experiences/${e.slug}`}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[22px] border border-line bg-venue no-underline transition duration-500 hover:border-line-strong"
                >
                  <MiniCrowd cue={e.scene} className="transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-venue via-venue/70 to-transparent" />
                  <div className="relative p-7">
                    <span className="label">{e.kicker}</span>
                    <h3 className="mt-3 text-[clamp(24px,2.5vw,30px)]">{e.name}</h3>
                    <p className="mt-2.5 text-[15px] text-mist">{e.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                      See the cue list
                      <span className="transition group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <GlowButton href="/quote">Plan your event with us</GlowButton>
          </div>
        </Wrap>
      </section>
    </>
  );
}
