"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { submitQuote } from "@/app/quote/actions";
import type { QuoteState } from "@/lib/quote-schema";
import { eventTypes, site, whatsappLink } from "@/lib/site";
import { products } from "@/lib/content";

const initial: QuoteState = { status: "idle" };

const field =
  "w-full rounded-xl border border-line bg-venue-2 px-4 py-3 text-[15px] text-haze placeholder:text-dim transition focus:border-line-strong focus:outline-none";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="label mb-2 block">
      {children}
    </label>
  );
}

function Error({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-[13px] text-ember">{children}</p>;
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="lit-fill cursor-pointer rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_34px_rgba(255,46,147,0.35)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send request"}
    </button>
  );
}

function Preselect({ children }: { children: (slug?: string) => React.ReactNode }) {
  const params = useSearchParams();
  return <>{children(params.get("product") ?? undefined)}</>;
}

export default function QuoteForm({ withSearchParams = false }: { withSearchParams?: boolean }) {
  if (withSearchParams) return <Preselect>{(slug) => <QuoteFormInner preselect={slug} />}</Preselect>;
  return <QuoteFormInner />;
}

function QuoteFormInner({ preselect }: { preselect?: string }) {
  const [state, formAction] = useActionState(submitQuote, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-venue-2 p-10 text-center">
        <p className="label">Request sent</p>
        <h3 className="lit-text mt-4 text-[clamp(24px,3vw,34px)]">Talk soon.</h3>
        <p className="mx-auto mt-4 max-w-[42ch] text-mist">{state.message}</p>
        <a
          href={whatsappLink}
          className="mt-7 inline-block rounded-full border border-line px-5 py-3 text-sm font-semibold text-haze no-underline transition hover:border-line-strong"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <input id="name" name="name" className={field} placeholder="Victor Ayoola" required />
          <Error>{state.errors?.name}</Error>
        </div>
        <div>
          <Label htmlFor="organisation">Organisation</Label>
          <input
            id="organisation"
            name="organisation"
            className={field}
            placeholder="Optional"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <input id="email" name="email" type="email" className={field} placeholder="you@company.com" required />
          <Error>{state.errors?.email}</Error>
        </div>
        <div>
          <Label htmlFor="phone">Phone or WhatsApp</Label>
          <input id="phone" name="phone" type="tel" className={field} placeholder="+234 800 000 0000" required />
          <Error>{state.errors?.phone}</Error>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="eventType">Event type</Label>
          <select id="eventType" name="eventType" className={field} defaultValue="" required>
            <option value="" disabled>
              Choose one
            </option>
            {eventTypes.map((t) => (
              <option key={t} value={t} className="bg-venue-2">
                {t}
              </option>
            ))}
          </select>
          <Error>{state.errors?.eventType}</Error>
        </div>
        <div>
          <Label htmlFor="eventDate">Event date</Label>
          <input id="eventDate" name="eventDate" className={field} placeholder="12 December 2026, or not set" required />
          <Error>{state.errors?.eventDate}</Error>
        </div>
        <div>
          <Label htmlFor="venue">Venue or city</Label>
          <input id="venue" name="venue" className={field} placeholder="Eko Convention Centre, Lagos" required />
          <Error>{state.errors?.venue}</Error>
        </div>
        <div>
          <Label htmlFor="guests">Expected guests</Label>
          <input id="guests" name="guests" type="number" min={1} className={field} placeholder="2000" required />
          <Error>{state.errors?.guests}</Error>
        </div>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="label mb-3">What do you need?</legend>
        <div className="flex flex-wrap gap-2.5">
          {products.map((p) => (
            <label
              key={p.slug}
              className="group cursor-pointer rounded-full border border-line px-4 py-2.5 text-[14px] text-mist transition has-checked:border-transparent has-checked:bg-gradient-to-r has-checked:from-ember has-checked:to-electric has-checked:text-white hover:border-line-strong"
            >
              <input
                type="checkbox"
                name="products"
                value={p.name}
                defaultChecked={preselect === p.slug}
                className="sr-only"
              />
              {p.name}
            </label>
          ))}
        </div>
        <Error>{state.errors?.products}</Error>
      </fieldset>

      <div>
        <Label htmlFor="message">Anything else we should know?</Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={field}
          placeholder="Run of show, key moments you want lit, brand colours, budget range…"
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 opacity-0"
      />

      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-[14px] text-haze">
          {state.message} You can also email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Submit />
        <span className="text-[13.5px] text-dim">We reply within one working day.</span>
      </div>
    </form>
  );
}
