/**
 * Content layer.
 *
 * Everything the marketing site renders lives here as typed data. When the
 * client is ready for a CMS, swap these exports for Drizzle queries — the
 * component signatures do not change.
 */

export type Accent = "ember" | "magenta" | "electric";

export const accentHex: Record<Accent, string> = {
  ember: "#ff4d1c",
  magenta: "#ff2e93",
  electric: "#3d6bff",
};

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  order: number;
  name: string;
  kicker: string;
  headline: string;
  summary: string;
  body: string[];
  specs: Spec[];
  bestFor: string[];
  accent: Accent;
};

export const products: Product[] = [
  {
    slug: "litbands",
    order: 1,
    name: "LitBands",
    kicker: "LED wristbands",
    headline: "A light on every wrist, driven from the booth.",
    summary:
      "The core of the system. Handed out at the gate, worn all night, and controlled live. Thousands can run as one crowd or as separate sections.",
    body: [
      "LitBands are the piece most guests will remember. They go on at entry, stay on all night, and respond to a single operator running the room from the booth.",
      "Because control is centralised, the band is never just a glowing accessory — it is a channel. Colour can follow the setlist, mark a sponsor moment, split a venue into competing halves, or drop the whole room to black a half-second before a walk-out.",
    ],
    specs: [
      { label: "Control", value: "Radio-triggered, live from the booth" },
      { label: "Colour", value: "Full RGB, programmable per band or per section" },
      { label: "Runtime", value: "Rated for a full event day on one charge" },
      { label: "Branding", value: "Custom strap print and housing colour" },
      { label: "Scale", value: "Tens to tens of thousands of guests" },
    ],
    bestFor: ["Concerts", "Festivals", "Weddings", "Sports", "Brand activations"],
    accent: "ember",
  },
  {
    slug: "lanyards",
    order: 2,
    name: "Lanyards",
    kicker: "LED accreditation",
    headline: "Accreditation that lights up.",
    summary:
      "Guests, crew, press and VIP each get their own colour, so the room reads itself at a glance — and your logo sits on every neck in the venue.",
    body: [
      "Lanyards solve two problems at once. They are the credential your team already needed, and they are a light source that puts your identity at chest height across the whole floor.",
      "Assign a colour per tier and access becomes readable from across a room without anyone checking a badge. Run them on the same cues as the wristbands and your crew becomes part of the show rather than a break in it.",
    ],
    specs: [
      { label: "Control", value: "Runs on the same cue system as LitBands" },
      { label: "Tiers", value: "Colour-coded by access level" },
      { label: "Print", value: "Full-colour lanyard print, front and back" },
      { label: "Holder", value: "Standard badge holder, illuminated edge" },
    ],
    bestFor: ["Conferences", "Brand activations", "Corporate experiences", "Festivals"],
    accent: "magenta",
  },
  {
    slug: "headsets",
    order: 3,
    name: "Headsets",
    kicker: "Silent disco",
    headline: "You can see which DJ is winning the floor.",
    summary:
      "Built for silent disco. Every channel glows a different colour, so the split of the room is visible from anywhere in it.",
    body: [
      "Silent disco is a format that only works if the audience can feel the competition. Our headsets make the channel visible: switch from the house DJ to the afrobeats channel and your headset changes colour with you.",
      "From the stage or the balcony, the floor becomes a live chart of what people are listening to. It is the most direct version of the thing we are selling — the crowd showing you what it feels.",
    ],
    specs: [
      { label: "Channels", value: "Three channels, one colour each" },
      { label: "Range", value: "Venue-wide transmitter coverage" },
      { label: "Runtime", value: "Full-night runtime, hot-swap batteries" },
      { label: "Comfort", value: "Over-ear, adjustable, sanitised between events" },
    ],
    bestFor: ["Silent discos", "Campus events", "Weddings", "Rooftop parties"],
    accent: "electric",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export const capabilities = [
  {
    title: "Synchronised live control",
    body: "One operator drives the whole room from the booth. Cues fire on the beat, on the chorus, on the countdown, or on your call.",
  },
  {
    title: "Your colours, your logo",
    body: "Band housing, strap and lanyard print are matched to your brand. The crowd becomes a brand asset that people wear home.",
  },
  {
    title: "Section-based effects",
    body: "Split by tier, block, table or team. Run a colour war across a stadium, or light only the dance floor while the rest of the room stays still.",
  },
  {
    title: "Moment cues",
    body: "First dance, walk-out, altar call, trophy lift, sponsor reveal, midnight. We build the cue list with you before the doors open.",
  },
];

export const venues = [
  "Concerts",
  "Silent discos",
  "Festivals",
  "Weddings",
  "Brand activations",
  "Church programmes",
  "Campus events",
  "Sports",
  "Corporate experiences",
  "Product launches",
];

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */
/* PLACEHOLDER CONTENT — replace with real events before launch.       */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  location: string;
  date: string;
  guests: string;
  summary: string;
  brief: string;
  approach: string[];
  cueList: { cue: string; moment: string }[];
  products: string[];
  accent: Accent;
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-arena-night",
    title: "Twelve thousand wrists on the same beat",
    client: "Sample Client — Arena Night",
    category: "Concert",
    location: "Lagos",
    date: "2026",
    guests: "12,000",
    summary:
      "Placeholder case study. Replace with a real event once the first show is delivered.",
    brief:
      "Placeholder. Describe what the organiser came to us with — the venue, the constraint, and what they wanted the audience to feel.",
    approach: [
      "Placeholder. Describe the deployment: distribution at the gate, transmitter placement, section mapping.",
      "Placeholder. Describe the cue design and how it was rehearsed against the setlist.",
    ],
    cueList: [
      { cue: "Blackout", moment: "Walk-out, eight seconds before the first note" },
      { cue: "Wave", moment: "Opening track, front-to-back through the floor" },
      { cue: "Split the room", moment: "Call and response mid-set" },
      { cue: "Colour sweep", moment: "Encore" },
    ],
    products: ["litbands"],
    accent: "ember",
    published: true,
  },
  {
    slug: "sample-wedding",
    title: "The room lit up at the first dance",
    client: "Sample Client — Wedding",
    category: "Wedding",
    location: "Lagos",
    date: "2026",
    guests: "400",
    summary:
      "Placeholder case study. Replace with a real event once the first wedding is delivered.",
    brief: "Placeholder. What the couple and planner asked for.",
    approach: [
      "Placeholder. Table-by-table sectioning and the palette matched to the wedding colours.",
      "Placeholder. How the cue list was timed to the programme run sheet.",
    ],
    cueList: [
      { cue: "Pulse", moment: "Couple's entrance" },
      { cue: "Wave", moment: "First dance" },
      { cue: "Colour sweep", moment: "Cake cutting" },
    ],
    products: ["litbands", "headsets"],
    accent: "magenta",
    published: true,
  },
  {
    slug: "sample-silent-disco",
    title: "Three channels, three colours, one floor",
    client: "Sample Client — Campus Silent Disco",
    category: "Silent disco",
    location: "Lagos",
    date: "2026",
    guests: "1,500",
    summary:
      "Placeholder case study. Replace with a real event once the first silent disco is delivered.",
    brief: "Placeholder. The format and what made it a challenge.",
    approach: [
      "Placeholder. Channel assignment and transmitter coverage across the space.",
      "Placeholder. How headset colour was used to drive the competition between DJs.",
    ],
    cueList: [
      { cue: "Channel colour", moment: "Live throughout, follows listener choice" },
      { cue: "Strobe", moment: "Channel takeover" },
    ],
    products: ["headsets", "lanyards"],
    accent: "electric",
    published: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
