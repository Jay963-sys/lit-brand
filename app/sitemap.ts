import type { MetadataRoute } from "next";
import { experiences, products } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: base, priority: 1 },
    { url: `${base}/products`, priority: 0.8 },
    { url: `${base}/experiences`, priority: 0.8 },
    { url: `${base}/quote`, priority: 0.9 },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, priority: 0.7 })),
    ...experiences.map((e) => ({ url: `${base}/experiences/${e.slug}`, priority: 0.6 })),
  ];
}
