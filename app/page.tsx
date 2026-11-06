import Link from "next/link";
import { CrowdStage, MiniCrowd } from "@/components/crowd-canvas";
import FeelList from "@/components/feel-list";
import LitWords from "@/components/lit-words";
import Marquee from "@/components/marquee";
import ProductVisual from "@/components/product-visual";
import Reveal from "@/components/reveal";
import { Bloom, Eyebrow, GhostButton, GlowButton, H2, Wrap } from "@/components/ui";
import { accentHex, capabilities, experiences, feelings, products, steps, venues } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

const featured = ["silent-disco", "weddings", "concerts"]
  .map((s) => experiences.find((e) => e.slug === s))
  .filter((e) => e !== undefined);

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <CrowdStage>
        <Wrap className="relative z-30 w-full pt-32 pb-10">
          <p className="label">
            Live event experience technology &nbsp;·&nbsp; {site.city}
          </p>
          <h1 className="mt-5 max-w-[11ch] text-[clamp(48px,10vw,150px)] leading-[0.9] text-balance">
            Lit the moment <span className="lit-text serif">forever.</span>
          </h1>
          <p className="mt-7 max-w-[50ch] text-[clamp(16px,1.6vw,20px)] text-mist [text-shadow:0_2px_18px_rgba(5,5,10,0.95)]">
            Smart LED wristbands, lanyards and headsets that pulse, sweep and change colour together.
            In most events the audience watches.{" "}
            <span className="text-haze">With Lit Brand, the audience participates.</span>
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <GlowButton href="/quote">Book Lit Brand for your event</GlowButton>
            <GhostButton href="#products">See the products</GhostButton>
          </div>
        </Wrap>
      </CrowdStage>

      {/* ---------------- Marquee ---------------- */}
      <section aria-label="Where Lit Brand works" className="border-b border-line py-8">
        <Marquee items={venues} />
      </section>

      {/* ---------------- Statement ---------------- */}
      <section id="shift" className="relative overflow-hidden py-[clamp(90px,14vw,190px)]">
        <Bloom color={accentHex.magenta} size={680} opacity={0.12} className="-left-60 top-10" />
        <Wrap className="relative z-10">
          <Eyebrow>Why we exist</Eyebrow>
          <LitWords
            className="max-w-[22ch] font-display text-[clamp(34px,5.6vw,80px)] leading-[1.02] font-semibold tracking-[-0.035em]"
            text="In many events, the audience simply watches. With Lit Brand, the audience *participates.* Every flash, pulse and colour shift turns the crowd into *part of the show.*"
          />
          <Reveal delay={60}>
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
              <div className="bg-venue-2 p-[clamp(26px,4vw,48px)]">
                <p className="label">Without</p>
                <p className="mt-4 text-[clamp(17px,1.7vw,21px)] text-mist">
                  A dark crowd lit by phone screens. The light show happens above people&apos;s heads,
                  and the video afterwards looks like everyone else&apos;s.
                </p>
              </div>
              <div className="relative overflow-hidden bg-venue-2 p-[clamp(26px,4vw,48px)]">
                <div className="lit-fill absolute inset-0 opacity-20" />
                <p className="label relative !text-haze">With Lit Brand</p>
                <p className="relative mt-4 text-[clamp(17px,1.7vw,21px)] text-haze">
                  Every guest becomes a pixel. Colour moves through the room in time with the music,
                  and the crowd itself is the thing everyone films.
                </p>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* ---------------- Products ---------------- */}
      <section id="products" className="relative scroll-mt-20 py-[clamp(72px,11vw,150px)]">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <Eyebrow>What guests wear</Eyebrow>
              <H2>Three ways to <span className="serif">light up</span> a room.</H2>
            </Reveal>
            <Reveal delay={60}>
              <p className="max-w-[38ch] text-mist">
                All three run on the same control system, so they mix in one venue and fire from one
                cue list.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-venue-2 no-underline transition duration-500 hover:-translate-y-1.5 hover:border-line-strong"
                >
                  <div className="relative flex h-[260px] items-center justify-center overflow-hidden border-b border-line bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]">
                    <span
                      aria-hidden
                      className="absolute h-[200px] w-[200px] rounded-full opacity-30 blur-[60px] transition duration-500 group-hover:scale-125 group-hover:opacity-60"
                      style={{ background: accentHex[p.accent] }}
                    />
                    <ProductVisual slug={p.slug} delay={i * 3} className="relative h-[190px] w-[230px]" />
                    <span className="label absolute top-5 left-6">
                      {String(p.order).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-[clamp(24px,3vw,34px)]">
                    <span className="label">{p.kicker}</span>
                    <h3 className="mt-3 text-[clamp(24px,2.6vw,32px)]">{p.name}</h3>
                    <p className="mt-3 flex-1 text-[15.5px] text-mist">{p.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                      Explore
                      <span className="transition group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------- Experiences ---------------- */}
      <section id="experiences" className="relative overflow-hidden py-[clamp(72px,11vw,150px)]">
        <Bloom color={accentHex.electric} size={620} opacity={0.12} className="-right-60 top-20" />
        <Wrap className="relative z-10">
          <Reveal>
            <Eyebrow>The experience</Eyebrow>
            <H2>Moments people feel, then <span className="serif lit-text">film.</span></H2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {featured.map((e, i) => (
              <Reveal key={e.slug} delay={i * 90}>
                <Link
                  href={`/experiences/${e.slug}`}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[22px] border border-line bg-venue no-underline transition duration-500 hover:border-line-strong"
                >
                  <MiniCrowd cue={e.scene} className="transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-venue via-venue/60 to-transparent" />
                  <div className="relative p-7">
                    <span className="label">{e.name}</span>
                    <h3 className="mt-3 text-[clamp(22px,2.3vw,28px)] leading-[1.05]">{e.moment}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                      See how we light it
                      <span className="transition group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <GhostButton href="/experiences">All experiences</GhostButton>
          </div>
        </Wrap>
      </section>

      {/* ---------------- Feelings ---------------- */}
      <section className="relative overflow-hidden border-y border-line py-[clamp(90px,13vw,180px)]">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Why it matters</Eyebrow>
              <p className="max-w-[30ch] text-[clamp(17px,1.6vw,20px)] text-mist">
                People don&apos;t remember events because they attended. They remember how the
                moment made them feel. Lit Brand helps create:
              </p>
            </div>
            <FeelList items={feelings} />
          </div>
        </Wrap>
      </section>

      {/* ---------------- Control ---------------- */}
      <section id="control" className="relative overflow-hidden py-[clamp(72px,11vw,150px)]">
        <Bloom color={accentHex.ember} size={560} className="-left-56 top-10" opacity={0.12} />
        <Wrap className="relative z-10">
          <Reveal>
            <Eyebrow>Control</Eyebrow>
            <H2>Programmed to <span className="serif">your</span> show, not a default setting.</H2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="group relative h-full overflow-hidden rounded-[22px] border border-line bg-venue-2 p-[clamp(24px,3vw,36px)] transition hover:border-line-strong">
                  <span className="lit-fill absolute inset-x-0 top-0 h-px opacity-0 transition group-hover:opacity-100" />
                  <span className="font-mono text-[12px] tracking-[0.2em] text-magenta">
                    CUE {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[clamp(20px,2.2vw,26px)]">{c.title}</h3>
                  <p className="mt-3 text-base text-mist">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how" className="scroll-mt-20 py-[clamp(72px,11vw,150px)]">
        <Wrap>
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <H2>From brief to <span className="serif">blackout</span> in four steps.</H2>
          </Reveal>
          <ol className="relative mt-16 grid list-none gap-10 p-0 md:grid-cols-4 md:gap-6">
            <span
              aria-hidden
              className="lit-fill absolute top-[22px] right-0 left-0 hidden h-px opacity-60 md:block"
            />
            {steps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 90} className="relative">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-venue font-mono text-[13px] text-haze shadow-[0_0_30px_rgba(255,46,147,0.35)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[clamp(19px,1.9vw,23px)]">{s.title}</h3>
                <p className="mt-3 text-[15.5px] text-mist">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-line bg-venue px-[clamp(22px,5vw,60px)] py-[clamp(60px,10vw,130px)] text-center">
              <MiniCrowd cue="sweep" className="opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,10,0.85),rgba(5,5,10,0.35)_70%)]" />
              <p className="label relative">{site.altTagline}</p>
              <h2 className="relative mx-auto mt-6 max-w-[14ch] text-[clamp(40px,7vw,104px)] leading-[0.92] text-balance">
                Ready to light up <span className="lit-text serif">your crowd?</span>
              </h2>
              <p className="relative mx-auto mt-6 max-w-[48ch] text-mist">
                Send the date, the venue and roughly how many guests. We&apos;ll come back with a
                quote and a suggested cue list.
              </p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-3">
                <GlowButton href="/quote">Get a quote</GlowButton>
                <GhostButton href={whatsappLink} external>
                  Chat on WhatsApp
                </GhostButton>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
