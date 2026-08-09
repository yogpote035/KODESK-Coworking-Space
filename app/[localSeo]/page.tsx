import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetail } from "@/components/shared/ServiceDetail";
import { getServiceBySlug } from "@/data/service";
import { localSeoPages, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(localSeoPages).map((localSeo) => ({ localSeo }));
}

export async function generateMetadata({ params }: { params: Promise<{ localSeo: string }> }): Promise<Metadata> {
  const { localSeo } = await params;
  const page = localSeoPages[localSeo as keyof typeof localSeoPages];
  return page ? pageMetadata(page.title, page.description, `/${localSeo}`) : {};
}

export default async function LocalSeoPage({ params }: { params: Promise<{ localSeo: string }> }) {
  const { localSeo } = await params;
  const page = localSeoPages[localSeo as keyof typeof localSeoPages];
  if (!page) notFound();
  const service = getServiceBySlug(page.serviceSlug);
  if (!service) notFound();
  return <ServiceDetail service={service} heading={page.title} heroDescription={page.description} />;
}
