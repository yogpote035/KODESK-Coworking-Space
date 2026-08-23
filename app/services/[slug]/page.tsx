import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetail } from "@/components/shared/ServiceDetail";
import { getServiceBySlug, services } from "@/data/service";
import { pageMetadata } from "@/lib/seo";
import { getPublicCmsData } from "@/lib/cms/public";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const { servicePages } = await getPublicCmsData();
  const cmsSlug = slug === "private-cabin" ? "private-office" : slug;
  const detail = servicePages.find((item) => item.service_slug === cmsSlug);

  if (!service) return {};

  return pageMetadata(detail?.seo_title || `${service.label} in Baner, Pune | KODESK`, detail?.seo_description || `${service.description} KODESK offers flexible workspace solutions in Baner, Pune.`, `/services/${slug}`);
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { servicePages } = await getPublicCmsData();
  const cmsSlug = slug === "private-cabin" ? "private-office" : slug;
  return <ServiceDetail service={service} detail={servicePages.find((item) => item.service_slug === cmsSlug)} />;
}
