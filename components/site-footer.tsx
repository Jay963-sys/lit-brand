import Link from "next/link";
import Logo, { Wordmark } from "./logo";
import { site, whatsappLink } from "@/lib/site";
import { products } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-[72px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[34ch] text-[15px] text-mist">{site.short}</p>
            <p className="label mt-6">{site.tagline}</p>
          </div>
          <div>
            <p className="label mb-4">Products</p>
            <ul className="space-y-2.5 text-[15px]">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-mist no-underline transition hover:text-haze">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-4">Talk to us</p>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a href={`mailto:${site.email}`} className="text-mist no-underline transition hover:text-haze">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={whatsappLink} className="text-mist no-underline transition hover:text-haze">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link href="/quote" className="text-mist no-underline transition hover:text-haze">
                  Request a quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="brand-pattern relative mt-14 overflow-hidden rounded-[28px] border border-line px-6 py-[clamp(40px,8vw,90px)]">
          <Wordmark title="LIT" className="mx-auto h-auto w-full max-w-[880px] text-core" />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <span className="label">{site.city}</span>
          <span className="label">© {new Date().getFullYear()} {site.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
