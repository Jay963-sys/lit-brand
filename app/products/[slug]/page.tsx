import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductVisual from "@/components/product-visual";
import Reveal from "@/components/reveal";
import { Bloom, Eyebrow, GhostButton, GlowButton, H2, Wrap } from "@/components/ui";
import { accentHex, getProduct, products } from "@/lib/content";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-[clamp(50px,8vw,90px)]">
        <Bloom
          color={accentHex[product.accent]}
          size={620}
          opacity={0.22}
          className="-top-40 -right-40"
        />
        <Wrap className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
          <Link href="/products" className="label no-underline transition hover:text-haze">
            ← All products
          </Link>
          <p className="label mt-8">
            Product {String(product.order).padStart(2, "0")} — {product.kicker}
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(38px,6.4vw,84px)] text-balance">
            {product.headline}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(16px,1.6vw,19px)] text-mist">
            {product.summary}
          </p>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center rounded-full border border-line bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_65%)]">
            <span className="absolute inset-8 rounded-full border border-line" />
            <ProductVisual slug={product.slug} className="relative w-[78%]" />
          </div>
        </Wrap>
      </section>

      <section className="pb-[clamp(50px,8vw,90px)]">
        <Wrap>
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
            <Reveal>
              <div className="space-y-6">
                {product.body.map((para, i) => (
                  <p key={i} className="text-[clamp(16px,1.5vw,18.5px)] text-mist">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="rounded-2xl border border-line bg-venue-2 p-7">
                <Eyebrow>Specification</Eyebrow>
                <dl className="divide-y divide-[color:var(--color-line)]">
                  {product.specs.map((s) => (
                    <div key={s.label} className="py-3.5">
                      <dt className="font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
                        {s.label}
                      </dt>
                      <dd className="mt-1.5 text-[15.5px] text-haze">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="label mt-7 mb-3">Best for</p>
                <ul className="flex list-none flex-wrap gap-2 p-0">
                  {product.bestFor.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-mist"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <GlowButton href={`/quote?product=${product.slug}`}>Quote this product</GlowButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      <section className="pb-[clamp(72px,11vw,150px)]">
        <Wrap>
          <div className="border-t border-line pt-12">
            <Eyebrow>Also available</Eyebrow>
            <div className="grid gap-5 md:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group relative overflow-hidden rounded-[18px] border border-line bg-venue-2 p-8 no-underline transition hover:-translate-y-1 hover:border-line-strong"
                >
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-12 h-40 w-40 rounded-full opacity-30 blur-[44px] transition group-hover:opacity-60"
                    style={{ background: accentHex[p.accent] }}
                  />
                  <ProductVisual slug={p.slug} delay={3} className="relative mb-4 h-20 w-24" />
                  <span className="label relative">{p.kicker}</span>
                  <h3 className="relative mt-3 text-[clamp(20px,2.2vw,26px)]">{p.name}</h3>
                  <p className="relative mt-2 text-[15px] text-mist">{p.summary}</p>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <GhostButton href="/experiences">See experiences</GhostButton>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
