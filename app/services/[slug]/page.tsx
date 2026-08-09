import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetail } from "@/components/shared/ServiceDetail";
import { getServiceBySlug, services } from "@/data/service";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return pageMetadata(`${service.label} in Baner, Pune | KODESK`, `${service.description} KODESK offers flexible workspace solutions in Baner, Pune.`, `/services/${slug}`);
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

  return <ServiceDetail service={service} />;
}
