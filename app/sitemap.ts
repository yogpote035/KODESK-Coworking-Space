import type { MetadataRoute } from "next";
import { services } from "@/data/service";
import { localSeoPages, siteUrl } from "@/lib/seo";
import { getPublicCmsData } from "@/lib/cms/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const pages = ["", "/about", "/services", "/pricing", "/gallery", "/contact"];
  const cms = await getPublicCmsData();
  const localSeoSlugs = Array.from(new Set([...Object.keys(localSeoPages), ...cms.localSeoPages.map((page) => page.slug)]));
  return [
    ...pages.map((path, index) => ({ url: `${siteUrl}${path}`, lastModified, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : 0.8 })),
    ...services.map((service) => ({ url: `${siteUrl}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...localSeoSlugs.map((slug) => ({ url: `${siteUrl}/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
