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
/* Experiences                                                         */
/* ------------------------------------------------------------------ */
/*
 * Use cases drawn from the brand profile, not past events. They describe how
 * a room would be lit, so nothing here claims a client or a headcount. When
 * real events are delivered, add a `caseStudy` field or a separate list.
 */

export type Experience = {
  slug: string;
  name: string;
  kicker: string;
  headline: string;
  moment: string;
  summary: string;
  body: string[];
  cueList: { cue: string; moment: string }[];
  products: string[];
  accent: Accent;
  /** Which hero cue the mini crowd runs on cards for this experience. */
  scene: "wave" | "channels" | "glow" | "split" | "sweep" | "pulse";
};

export const experiences: Experience[] = [
  {
    slug: "concerts",
    name: "Concerts & festivals",
    kicker: "Arena · open air",
    headline: "The entire crowd pulses with the beat.",
    moment: "An arena where every wrist hits on the drop.",
    summary:
      "From the front row to the back seats, every guest becomes a pixel in a light show the artist can see from the stage.",
    body: [
      "At a concert the rig gets the applause and the performer carries the room. With LitBands, the audience gets a part to play too. Colour rolls front to back on the opening track, the whole venue drops to black before the walk-out, and the encore lands in a full-room colour sweep.",
      "We build the cue list against the setlist with your production team, then run it live from the booth so it follows the show, not a pre-recorded timeline.",
    ],
    cueList: [
      { cue: "Blackout", moment: "Walk-out, a few seconds before the first note" },
      { cue: "Wave", moment: "Opening track, rolling front to back" },
      { cue: "Split the room", moment: "Call and response between sections" },
      { cue: "Colour sweep", moment: "Encore" },
    ],
    products: ["litbands", "lanyards"],
    accent: "ember",
    scene: "wave",
  },
  {
    slug: "silent-disco",
    name: "Silent disco",
    kicker: "Three channels · one floor",
    headline: "Every headset glows with the rhythm of the DJ.",
    moment: "A silent disco where you can see which DJ is winning.",
    summary:
      "Each channel has its own colour, so the floor becomes a live chart of what everyone is listening to.",
    body: [
      "Silent disco works best when the crowd can feel the competition. Switch channel and your headset changes colour with you, so from anywhere in the room you can see the split between DJs shift in real time.",
      "Add LitBands and the whole floor can be pulled onto one colour for a takeover moment, then released back to the battle.",
    ],
    cueList: [
      { cue: "Channel colour", moment: "Live all night, follows each listener" },
      { cue: "Takeover", moment: "One DJ claims the whole floor" },
      { cue: "Strobe", moment: "Midnight drop" },
    ],
    products: ["headsets", "litbands"],
    accent: "electric",
    scene: "channels",
  },
  {
    slug: "weddings",
    name: "Weddings",
    kicker: "Receptions · first dance",
    headline: "Guests light up during the couple's first dance.",
    moment: "A reception that glows in the couple's colours.",
    summary:
      "Matched to the wedding palette and timed to the run sheet, so the big moments feel bigger and the photos look unreal.",
    body: [
      "We match the light to your colours — the aso-ebi, the décor, the cake — and work from the planner's run sheet so every key moment has a cue waiting for it.",
      "Tables can be lit one by one for the entrance, the whole room can slow-glow for the first dance, and the dance floor can go full party once the DJ takes over.",
    ],
    cueList: [
      { cue: "Pulse", moment: "Couple's grand entrance" },
      { cue: "Slow glow", moment: "First dance" },
      { cue: "Colour sweep", moment: "Cake cutting" },
      { cue: "Party mode", moment: "Dance floor opens" },
    ],
    products: ["litbands", "headsets"],
    accent: "magenta",
    scene: "glow",
  },
  {
    slug: "brand-activations",
    name: "Brand activations & corporate",
    kicker: "Launches · conferences",
    headline: "Your brand colours on every guest in the room.",
    moment: "A launch where the reveal happens on every wrist at once.",
    summary:
      "Custom colours and logo placement turn the audience into a brand asset — and the content people post afterwards carries your colours.",
    body: [
      "Bands and lanyards are printed in your brand colours and programmed with your palette, so the room is on-brand before anyone says a word.",
      "Time the product reveal, the sponsor moment or the CEO walk-on to a single cue, and every guest becomes part of the announcement — and part of the video that goes out afterwards.",
    ],
    cueList: [
      { cue: "Brand colour hold", moment: "Doors open" },
      { cue: "Countdown", moment: "Before the reveal" },
      { cue: "Reveal flash", moment: "Product or sponsor reveal" },
    ],
    products: ["lanyards", "litbands"],
    accent: "magenta",
    scene: "sweep",
  },
  {
    slug: "church",
    name: "Church programmes",
    kicker: "Worship · crusades · conventions",
    headline: "A congregation that shines together.",
    moment: "Worship where the whole hall lifts its light at once.",
    summary:
      "Gentle, unified light for worship moments, and full colour for praise — controlled live by your media team.",
    body: [
      "Large gatherings live on moments of unity. A soft glow through the hall during worship, a wave of colour through praise, and a single moment where every light rises together.",
      "We work with your media and programme team so the cues follow the service, not the other way round.",
    ],
    cueList: [
      { cue: "Soft glow", moment: "Worship" },
      { cue: "Wave", moment: "Praise session" },
      { cue: "All lights up", moment: "Altar call or closing" },
    ],
    products: ["litbands", "lanyards"],
    accent: "electric",
    scene: "pulse",
  },
  {
    slug: "sports-campus",
    name: "Sports & campus",
    kicker: "Stadiums · matric · homecoming",
    headline: "Split the stands. Light up the win.",
    moment: "A stadium where each side wears its colours in light.",
    summary:
      "Run a colour war across the stands, light the goal, or turn a campus night into the event everyone posts about.",
    body: [
      "Section-based control means each half of the venue can carry its own team or faculty colour, then come together for the winning moment.",
      "For campus nights and homecomings, combine LitBands with silent disco headsets and the whole night becomes one shareable moment.",
    ],
    cueList: [
      { cue: "Split the room", moment: "Team walk-out" },
      { cue: "Flash", moment: "Goal, point or win" },
      { cue: "Colour sweep", moment: "Trophy lift or closing" },
    ],
    products: ["litbands", "headsets"],
    accent: "ember",
    scene: "split",
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Brand lines                                                         */
/* ------------------------------------------------------------------ */

export const feelings = [
  "Goosebump moments",
  "Crowd unity",
  "Visual excitement",
  "Content worth posting",
  "A premium, futuristic atmosphere",
];

export const steps = [
  {
    title: "Plan the moments",
    body: "Tell us the event, the run of show and the moments that matter. We build the cue list and match the palette to your brand or theme.",
  },
  {
    title: "Brand the kit",
    body: "Bands, lanyards and headsets are prepared in your colours, with your logo where you want it.",
  },
  {
    title: "Hand out at the door",
    body: "Guests put them on as they arrive. Nothing to download, nothing to set up on their side.",
  },
  {
    title: "Run it live",
    body: "Our operator drives the room from the booth on the night, firing cues on the beat and on your call.",
  },
];
