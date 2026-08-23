import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetail } from "@/components/shared/ServiceDetail";
import { getServiceBySlug } from "@/data/service";
import { localSeoPages, pageMetadata } from "@/lib/seo";
import { getPublicCmsData } from "@/lib/cms/public";

export function generateStaticParams() {
  return Object.keys(localSeoPages).map((localSeo) => ({ localSeo }));
}

export async function generateMetadata({ params }: { params: Promise<{ localSeo: string }> }): Promise<Metadata> {
  const { localSeo } = await params;
  const cms = await getPublicCmsData();
  const cmsPage = cms.localSeoPages.find((item) => item.slug === localSeo);
  const page = localSeoPages[localSeo as keyof typeof localSeoPages];
  const title = cmsPage?.seo_title || cmsPage?.title || page?.title;
  const description = cmsPage?.seo_description || cmsPage?.description || page?.description;
  return title && description ? pageMetadata(title, description, `/${localSeo}`) : {};
}

export default async function LocalSeoPage({ params }: { params: Promise<{ localSeo: string }> }) {
  const { localSeo } = await params;
  const cms = await getPublicCmsData();
  const cmsPage = cms.localSeoPages.find((item) => item.slug === localSeo);
  const page = localSeoPages[localSeo as keyof typeof localSeoPages];
  if (!cmsPage && !page) notFound();
  const service = getServiceBySlug(cmsPage?.service_slug ?? page.serviceSlug);
  if (!service) notFound();
  return <ServiceDetail service={service} heading={cmsPage?.title ?? page.title} heroDescription={cmsPage?.description ?? page.description} />;
}
