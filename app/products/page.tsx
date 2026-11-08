import Link from "next/link";
import type { Metadata } from "next";
import ProductVisual from "@/components/product-visual";
import Reveal from "@/components/reveal";
import { Eyebrow, GlowButton, H2, Wrap } from "@/components/ui";
import { accentHex, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "LED wristbands, LED lanyards and silent disco headsets — three ways to put a controllable light on every guest.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-40 pb-[clamp(40px,7vw,80px)]">
        <Wrap className="flex flex-col items-center text-center">
          <Eyebrow>Products</Eyebrow>
          <H2 className="mx-auto">Three ways to light up a room.</H2>
          <p className="mx-auto mt-6 max-w-[58ch] text-[clamp(16px,1.5vw,18.5px)] text-mist">
            Every product runs on the same control system, so they can be mixed in one venue and
            fired from one cue list.
          </p>
        </Wrap>
      </section>

      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <div className="border-t border-line">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative grid gap-6 overflow-hidden border-b border-line justify-items-center py-10 text-center no-underline md:grid-cols-[220px_1fr_1.4fr] md:items-center md:justify-items-start md:text-left"
                >
                  <span
                    aria-hidden
                    className="absolute top-0 -left-24 h-[220px] w-[220px] rounded-full opacity-0 blur-[70px] transition duration-500 group-hover:opacity-40"
                    style={{ background: accentHex[p.accent] }}
                  />
                  <ProductVisual slug={p.slug} delay={i * 3} className="relative h-[150px] w-[190px]" />
                  <div className="relative">
                    <span className="label">
                      Product {String(p.order).padStart(2, "0")} — {p.kicker}
                    </span>
                    <h3 className="mt-3 text-[clamp(22px,2.7vw,32px)]">{p.name}</h3>
                  </div>
                  <div className="relative">
                    <p className="text-[clamp(16px,1.5vw,18px)] text-mist">{p.summary}</p>
                    <ul className="mt-5 flex list-none flex-wrap justify-center gap-2 p-0 md:justify-start">
                      {p.bestFor.map((b) => (
                        <li
                          key={b}
                          className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-dim uppercase"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-block font-mono text-[11px] tracking-[0.2em] text-haze uppercase">
                      Read the spec →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <GlowButton href="/quote">Get a quote for your event</GlowButton>
          </div>
        </Wrap>
      </section>
    </>
  );
}
