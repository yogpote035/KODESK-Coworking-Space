import type { MetadataRoute } from "next";
import { services } from "@/data/service";
import { localSeoPages, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ["", "/about", "/services", "/pricing", "/gallery", "/contact"];
  return [
    ...pages.map((path, index) => ({ url: `${siteUrl}${path}`, lastModified, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.8 })),
    ...services.map((service) => ({ url: `${siteUrl}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...Object.keys(localSeoPages).map((slug) => ({ url: `${siteUrl}/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
