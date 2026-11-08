import Link from "next/link";
import { CrowdStage, MiniCrowd } from "@/components/crowd-canvas";
import FeelList from "@/components/feel-list";
import LitWords from "@/components/lit-words";
import Marquee from "@/components/marquee";
import PosterWall from "@/components/poster-wall";
import BrandVideo from "@/components/brand-video";
import ProductVisual from "@/components/product-visual";
import Reveal from "@/components/reveal";
import {
  Bloom,
  Eyebrow,
  GhostButton,
  GlowButton,
  SectionHead,
  Wrap,
} from "@/components/ui";
import {
  accentHex,
  capabilities,
  experiences,
  feelings,
  products,
  steps,
  venues,
} from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

const featured = ["silent-disco", "weddings", "concerts"]
  .map((s) => experiences.find((e) => e.slug === s))
  .filter((e) => e !== undefined);

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <CrowdStage>
        <Wrap className="relative z-30 flex w-full flex-col items-center pt-32 pb-10 text-center">
          <h1 className="mx-auto mt-5 max-w-[12ch] text-[clamp(36px,7.2vw,112px)] leading-[0.9] text-balance">
            Lit the moment <span className="lit-text">forever.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[50ch] text-[clamp(16px,1.6vw,20px)] text-mist [text-shadow:0_2px_18px_rgba(5,5,10,0.95)]">
            Smart LED wristbands, lanyards and headsets that pulse, sweep and
            change colour together. In most events the audience watches.{" "}
            <span className="text-haze">
              With Lit Brand, the audience participates.
            </span>
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <GlowButton href="/quote">Book Lit Brand for your event</GlowButton>
            <GhostButton href="#products">See the products</GhostButton>
          </div>
        </Wrap>
      </CrowdStage>

      {/* ---------------- Marquee ---------------- */}
      <section
        aria-label="Where Lit Brand works"
        className="border-b border-line py-8"
      >
        <Marquee items={venues} />
      </section>

      {/* ---------------- Statement ---------------- */}
      <section
        id="shift"
        className="relative overflow-hidden py-[clamp(90px,14vw,190px)]"
      >
        <Bloom
          color={accentHex.ember}
          size={680}
          opacity={0.1}
          className="-left-60 top-10"
        />
        <Wrap className="relative z-10 text-center">
          <Eyebrow>Why we exist</Eyebrow>
          <LitWords
            className="mx-auto max-w-[22ch] font-display text-[clamp(24px,4vw,56px)] leading-[1.02] font-semibold tracking-[-0.035em]"
            text="In many events, the audience simply watches. With Lit Brand, the audience *participates.* Every flash, pulse and colour shift turns the crowd into *part of the show.*"
          />
          <Reveal delay={60}>
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
              <div className="bg-venue-2 p-[clamp(26px,4vw,48px)] text-center">
                <p className="label">Without</p>
                <p className="mt-4 text-[clamp(17px,1.7vw,21px)] text-mist">
                  A dark crowd lit by phone screens. The light show happens
                  above people&apos;s heads, and the video afterwards looks like
                  everyone else&apos;s.
                </p>
              </div>
              <div className="relative overflow-hidden bg-venue-2 p-[clamp(26px,4vw,48px)] text-center">
                <div className="lit-fill absolute inset-0 opacity-20" />
                <p className="label relative !text-haze">With Lit Brand</p>
                <p className="relative mt-4 text-[clamp(17px,1.7vw,21px)] text-haze">
                  Every guest becomes a pixel. Colour moves through the room in
                  time with the music, and the crowd itself is the thing
                  everyone films.
                </p>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* ---------------- Crowd photo ---------------- */}
      <section aria-label="A crowd wearing LIT wristbands" className="relative">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden sm:px-8 lg:px-[72px]">
          <Reveal>
            <div className="relative overflow-hidden border-y border-line sm:rounded-[28px] sm:border">
              <img
                src="/brand/crowd-bands.webp"
                alt="A crowd with raised hands, every wrist glowing with a LIT band"
                width={1600}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover sm:aspect-[2/1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-venue/90 via-venue/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-[clamp(20px,4vw,48px)] text-center">
                <p className="label !text-haze">Every wrist</p>
                <p className="mx-auto mt-3 max-w-[20ch] font-display text-[clamp(22px,3.4vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em]">
                  Part of the show,{" "}
                  <span className="text-ember">not just in the room.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Products ---------------- */}
      <section
        id="products"
        className="relative scroll-mt-20 py-[clamp(72px,11vw,150px)]"
      >
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="What guests wear"
              title={
                <>
                  Three ways to <span className="text-ember">light up</span> a
                  room.
                </>
              }
              intro="All three run on the same control system, so they mix in one venue and fire from one cue list."
            />
          </Reveal>
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
                    <ProductVisual
                      slug={p.slug}
                      delay={i * 3}
                      className="relative h-[190px] w-[230px]"
                    />
                    <span className="label absolute top-5 left-6">
                      {String(p.order).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col items-center p-[clamp(24px,3vw,34px)] text-center">
                    <span className="label">{p.kicker}</span>
                    <h3 className="mt-3 text-[clamp(19px,2vw,24px)]">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[15.5px] text-mist">
                      {p.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                      Explore
                      <span className="transition group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------- Experiences ---------------- */}
      <section
        id="experiences"
        className="relative overflow-hidden py-[clamp(72px,11vw,150px)]"
      >
        <Bloom
          color={accentHex.electric}
          size={620}
          opacity={0.12}
          className="-right-60 top-20"
        />
        <Wrap className="relative z-10">
          <Reveal>
            <SectionHead
              eyebrow="The experience"
              title={
                <>
                  Moments people feel, then{" "}
                  <span className="lit-text-pulse">film.</span>
                </>
              }
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {featured.map((e, i) => (
              <Reveal key={e.slug} delay={i * 90}>
                <Link
                  href={`/experiences/${e.slug}`}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[22px] border border-line bg-venue no-underline transition duration-500 hover:border-line-strong"
                >
                  <MiniCrowd
                    cue={e.scene}
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-venue via-venue/60 to-transparent" />
                  <div className="relative p-7 text-center">
                    <span className="label">{e.name}</span>
                    <h3 className="mt-3 text-[clamp(17px,1.8vw,21px)] leading-[1.05]">
                      {e.moment}
                    </h3>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                      See how we light it
                      <span className="transition group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <GhostButton href="/experiences">All experiences</GhostButton>
          </div>
        </Wrap>
      </section>

      {/* ---------------- Identity ---------------- */}
      <section
        aria-labelledby="identity"
        className="overflow-hidden pb-[clamp(72px,11vw,150px)]"
      >
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="The identity"
              title={
                <span id="identity">
                  Made for the dark. Made to be{" "}
                  <span className="lit-text-pulse">seen.</span>
                </span>
              }
              intro="Five lights, one crowd. The mark is people coming together — and every one of them is lit."
            />
          </Reveal>
        </Wrap>
        <Wrap className="mt-14">
          <Reveal>
            <img
              src="/brand/poster-mockup.webp"
              alt="Three LIT posters lit up on a dark wall"
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-[28px] border border-line object-cover"
            />
          </Reveal>
        </Wrap>
        <div className="mt-5">
          <PosterWall />
        </div>
      </section>

      {/* ---------------- Feelings ---------------- */}
      <section className="relative overflow-hidden border-y border-line py-[clamp(90px,13vw,180px)]">
        <Wrap>
          <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-12 text-center">
            <div className="flex flex-col items-center">
              <Eyebrow>Why it matters</Eyebrow>
              <p className="max-w-[46ch] text-[clamp(17px,1.6vw,20px)] text-mist">
                People don&apos;t remember events because they attended. They
                remember how the moment made them feel. Lit Brand helps create:
              </p>
            </div>
            <FeelList items={feelings} />
          </div>
        </Wrap>
      </section>

      {/* ---------------- Control ---------------- */}
      <section
        id="control"
        className="relative overflow-hidden py-[clamp(72px,11vw,150px)]"
      >
        <Bloom
          color={accentHex.ember}
          size={560}
          className="-left-56 top-10"
          opacity={0.12}
        />
        <Wrap className="relative z-10">
          <Reveal>
            <SectionHead
              eyebrow="Control"
              title={
                <>
                  Programmed to <span className="text-ember">your</span> show,
                  not a default setting.
                </>
              }
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="group relative h-full overflow-hidden rounded-[22px] border border-line bg-venue-2 p-[clamp(24px,3vw,36px)] text-center transition hover:border-line-strong">
                  <span className="lit-fill absolute inset-x-0 top-0 h-px opacity-0 transition group-hover:opacity-100" />
                  <span className="font-mono text-[12px] tracking-[0.2em] text-ember">
                    CUE {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[clamp(17px,1.8vw,20px)]">
                    {c.title}
                  </h3>
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
            <SectionHead
              eyebrow="How it works"
              title={
                <>
                  From brief to <span className="text-ember">blackout</span> in
                  four steps.
                </>
              }
            />
          </Reveal>
          <ol className="relative mt-16 grid list-none gap-10 p-0 md:grid-cols-4 md:gap-6">
            <span
              aria-hidden
              className="lit-fill absolute top-[22px] right-0 left-0 hidden h-px opacity-60 md:block"
            />
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 90}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-venue font-mono text-[13px] text-haze shadow-[0_0_30px_rgba(255,81,31,0.35)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[clamp(16px,1.6vw,18px)]">
                  {s.title}
                </h3>
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
            <div className="relative grid overflow-hidden rounded-[32px] border border-line bg-venue md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative z-10 flex flex-col items-center justify-center px-[clamp(22px,5vw,64px)] py-[clamp(48px,8vw,110px)] text-center">
                <p className="label">{site.altTagline}</p>
                <h2 className="mx-auto mt-6 max-w-[13ch] text-[clamp(30px,5vw,72px)] leading-[0.98] text-balance">
                  Ready to light up{" "}
                  <span className="lit-text">your crowd?</span>
                </h2>
                <p className="mt-6 max-w-[44ch] text-mist">
                  Send the date, the venue and roughly how many guests.
                  We&apos;ll come back with a quote and a suggested cue list.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <GlowButton href="/quote">Get a quote</GlowButton>
                  <GhostButton href={whatsappLink} external>
                    Chat on WhatsApp
                  </GhostButton>
                </div>
              </div>
              <div className="relative min-h-[360px] border-t border-line bg-black md:border-t-0 md:border-l">
                <BrandVideo className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
