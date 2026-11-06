# Lit Brand — marketing site

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Resend / React Email

## Run it

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev
```

`npm run email` opens the React Email preview server for the two quote templates.

## Structure

| Path | What it is |
| --- | --- |
| `lib/content.ts` | All page content as typed data. Swap for Drizzle queries when the client wants a CMS — component signatures don't change. |
| `lib/site.ts` | Brand constants, nav, contact details, event-type list. |
| `lib/quote-schema.ts` | Zod schema shared by the server action and the form's error display. |
| `components/crowd-canvas.tsx` | The hero. Canvas simulation of ~900 wristbands plus the cue deck. |
| `app/quote/actions.ts` | Server action: validate → email the team → confirm to the requester. |
| `emails/` | React Email templates. |

## The hero

`CrowdStage` owns cue state. `CrowdCanvas` renders a perspective field of dots using
pre-rendered radial-gradient sprites drawn with `globalCompositeOperation = "lighter"`, so
~900 glowing points stay cheap. Cues auto-cycle every 5.5s until a visitor picks one, then
auto-cycling stops for good. `prefers-reduced-motion` paints a single static lit frame and
never starts the animation loop.

## Before launch

- [ ] **Replace the placeholder case studies** in `lib/content.ts` — all three are marked as
      samples. Nothing on `/work` should ship as-is.
- [ ] Confirm product specs with the client (runtime, channel counts, range are best guesses
      from the brand profile and need real numbers).
- [ ] Swap the CSS placeholder mark in `components/logo.tsx` for the real logo.
- [ ] Verify the sending domain in Resend and set `QUOTE_FROM_EMAIL`.
- [ ] Add real photography — the site currently carries no images at all.
