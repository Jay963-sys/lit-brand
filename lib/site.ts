export const site = {
  name: "Lit Brand",
  legalName: "The Lit Brand",
  tagline: "Lit the moment forever",
  altTagline: "Illuminating people",
  short: "We are a live event experience technology company.",
  description:
    "Lit Brand puts a controllable light on every guest. Smart LED wristbands, lanyards and headsets that pulse, sweep and change colour together — on your cue, in your colours.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://litbrand.co",
  email: "hello@litbrand.co",
  whatsapp: "2348185157164",
  instagram: "https://instagram.com/thelitbrand",
  city: "Lagos, Nigeria",
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}`;

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/experiences", label: "Experiences" },
  { href: "/#how", label: "How it works" },
  { href: "/quote", label: "Get a quote" },
] as const;

export const eventTypes = [
  "Concert",
  "Silent disco",
  "Festival",
  "Wedding",
  "Brand activation",
  "Church programme",
  "Campus event",
  "Sports",
  "Corporate experience",
  "Product launch",
  "Other",
] as const;
