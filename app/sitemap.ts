import type { MetadataRoute } from "next";
import { caseStudies, products } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: base, priority: 1 },
    { url: `${base}/products`, priority: 0.8 },
    { url: `${base}/work`, priority: 0.8 },
    { url: `${base}/quote`, priority: 0.9 },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, priority: 0.7 })),
    ...caseStudies
      .filter((c) => c.published)
      .map((c) => ({ url: `${base}/work/${c.slug}`, priority: 0.6 })),
  ];
}
