import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/shared/ServiceDetail";
import { getServiceBySlug, services } from "@/data/service";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
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
