import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "@/components/quote-form";
import { Bloom, Eyebrow, Wrap } from "@/components/ui";
import { accentHex } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Tell us the date, the venue and roughly how many guests you expect. We'll come back with a quote and a suggested cue list.",
};

// Static page: the ?product= preselect is read in the browser, so visiting
// /quote never runs a server function. Only submitting the form does.
export default function QuotePage() {
  return (
    <section className="relative overflow-hidden pt-40 pb-[clamp(72px,11vw,150px)]">
      <Bloom color={accentHex.magenta} size={620} opacity={0.18} className="-top-52 right-0" />
      <Wrap className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Eyebrow>Get a quote</Eyebrow>
            <h1 className="max-w-[13ch] text-[clamp(28px,4.4vw,54px)] text-balance">
              Tell us about your event.
            </h1>
            <p className="mt-6 max-w-[42ch] text-[clamp(16px,1.5vw,18px)] text-mist">
              The more you give us now, the closer the first number will be. If the date is tight,
              message us on WhatsApp instead.
            </p>
            <div className="mt-9 space-y-3">
              <a
                href={whatsappLink}
                className="block text-[15px] text-haze no-underline transition hover:text-ember"
              >
                WhatsApp →
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-[15px] text-haze no-underline transition hover:text-ember"
              >
                {site.email} →
              </a>
              <p className="label pt-4">{site.city}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-venue-2 p-[clamp(24px,4vw,44px)]">
            <Suspense fallback={<QuoteForm />}>
              <QuoteForm withSearchParams />
            </Suspense>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
