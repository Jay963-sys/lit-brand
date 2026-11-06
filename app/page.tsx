import Link from "next/link";
import { CrowdStage } from "@/components/crowd-canvas";
import Reveal from "@/components/reveal";
import { Bloom, Eyebrow, GhostButton, GlowButton, H2, Wrap } from "@/components/ui";
import { accentHex, capabilities, products, venues } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <CrowdStage>
        <Wrap className="relative z-30 pt-32 pb-9">
          <p className="label">
            Live event experience technology &nbsp;·&nbsp; {site.city}
          </p>
          <h1 className="mt-4 max-w-[14ch] text-[clamp(44px,8.4vw,116px)] text-balance">
            The crowd <em className="lit-text not-italic">is</em> the light show.
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(16px,1.6vw,20px)] text-mist">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlowButton href="/quote">Get a quote for your event</GlowButton>
            <GhostButton href="/products">See the products</GhostButton>
          </div>
        </Wrap>
      </CrowdStage>

      {/* ---------------- The shift ---------------- */}
      <section id="shift" className="relative py-[clamp(72px,11vw,150px)]">
        <Bloom color={accentHex.ember} className="-left-44 top-16" />
        <Wrap className="relative z-10">
          <Reveal>
            <Eyebrow>Why we exist</Eyebrow>
            <H2>At most events, the audience just watches.</H2>
            <p className="mt-6 max-w-[60ch] text-[clamp(16px,1.5vw,18.5px)] text-mist">
              The rig gets the applause. The performer carries the room. But the moment people
              actually take home is the one they were part of — the whole room singing, the whole
              room glowing. Lit Brand hands that moment to the audience.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
              <div className="bg-venue-2 p-[clamp(26px,4vw,46px)]">
                <h3 className="text-[clamp(19px,2.1vw,25px)]">Without</h3>
                <p className="mt-3 text-base text-mist">
                  A dark crowd lit by phone screens. The light show happens above people&apos;s
                  heads, and the video afterwards looks like everyone else&apos;s.
                </p>
              </div>
              <div className="bg-gradient-to-br from-ember/15 to-electric/15 p-[clamp(26px,4vw,46px)]">
                <h3 className="lit-text text-[clamp(19px,2.1vw,25px)]">With Lit Brand</h3>
                <p className="mt-3 text-base text-mist">
                  Every guest becomes a pixel. Colour moves through the room in time with the music,
                  and the crowd itself is the thing worth filming.
                </p>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* ---------------- Products ---------------- */}
      <section id="products" className="py-[clamp(72px,11vw,150px)]">
        <Wrap>
          <Reveal>
            <Eyebrow>What guests wear</Eyebrow>
            <H2>Three ways to light a room.</H2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[18px] border border-line bg-venue-2 p-[clamp(24px,3vw,34px)] no-underline transition hover:-translate-y-1 hover:border-line-strong"
                >
                  <span
                    aria-hidden
                    className="absolute -top-[70px] -right-[50px] h-[180px] w-[180px] rounded-full opacity-40 blur-[46px] transition group-hover:opacity-75"
                    style={{ background: accentHex[p.accent] }}
                  />
                  <span className="label relative">
                    Product {String(p.order).padStart(2, "0")} — {p.kicker}
                  </span>
                  <h3 className="relative mt-4 text-[clamp(21px,2.3vw,27px)]">{p.name}</h3>
                  <p className="relative mt-2.5 text-[15.5px] text-mist">{p.summary}</p>
                  <span className="relative mt-6 inline-block font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                    Read the spec →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------- Control ---------------- */}
      <section id="control" className="relative py-[clamp(72px,11vw,150px)]">
        <Bloom color={accentHex.electric} size={600} className="-right-56 top-0" opacity={0.14} />
        <Wrap className="relative z-10">
          <Reveal>
            <Eyebrow>Control</Eyebrow>
            <H2>Programmed to your show, not to a default setting.</H2>
          </Reveal>
          <div className="mt-12 border-t border-line">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="grid items-baseline gap-6 border-b border-line py-7 md:grid-cols-[1.1fr_1.6fr]">
                  <h3 className="text-[clamp(18px,2vw,23px)]">{c.title}</h3>
                  <p className="text-base text-mist">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------- Venues ---------------- */}
      <section id="events" className="py-[clamp(72px,11vw,150px)]">
        <Wrap>
          <Reveal>
            <Eyebrow>Where it works</Eyebrow>
            <H2>If people gather, they can light up together.</H2>
            <ul className="mt-11 flex list-none flex-wrap gap-2.5 p-0">
              {venues.map((v) => (
                <li
                  key={v}
                  className="rounded-full border border-line px-4.5 py-2.5 text-[14.5px] text-mist transition hover:border-transparent hover:bg-gradient-to-r hover:from-ember/90 hover:to-electric/90 hover:text-white"
                >
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </Wrap>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-venue-2 px-[clamp(22px,5vw,60px)] py-[clamp(40px,7vw,86px)] text-center">
              <Bloom
                color={accentHex.magenta}
                size={460}
                opacity={0.3}
                className="-top-40 left-1/2 -translate-x-1/2"
              />
              <p className="label relative">Get started</p>
              <H2 className="relative mx-auto mt-5">Tell us about your event.</H2>
              <p className="relative mx-auto mt-5 max-w-[52ch] text-mist">
                Send us the date, the venue and roughly how many people you expect. We&apos;ll come
                back with a quote and a suggested cue list.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <GlowButton href="/quote">Request a quote</GlowButton>
                <GhostButton href="/work">See past events</GhostButton>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
