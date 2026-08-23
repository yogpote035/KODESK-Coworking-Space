import { getPublicSupabase } from "@/lib/supabase/server";
import type { MediaRecord, PageSection, PricingRecord, ServicePageDetail, SiteSettings } from "@/lib/cms/types";

export async function getPublicCmsData() {
  const client = getPublicSupabase();
  if (!client) return { pricing: [] as PricingRecord[], media: [] as MediaRecord[], servicePages: [] as ServicePageDetail[], pageSections: [] as PageSection[], settings: {} as SiteSettings };
  const [pricingResult, mediaResult, servicePagesResult, pageSectionsResult, settingsResult] = await Promise.all([
    client.from("pricing").select("id,service_key,service_name,price,price_label,currency,billing_period,description,is_active,sort_order").eq("is_active", true).order("sort_order"),
    client.from("media").select("id,name,storage_path,public_url,alt_text,category,gallery_category,is_active,sort_order").eq("is_active", true).order("sort_order"),
    client.from("service_page_details").select("service_slug,cover_image_url,hero_image_url,gallery_image_urls,hero_title,subtitle,hero_description,overview_title,overview_body,benefits,audience_title,audience,features,cta_title,cta_body,cta_label,cta_url,faq_items,seo_title,seo_description"),
    client.from("page_sections").select("page_key,section_key,content,is_active,sort_order").eq("is_active", true).order("sort_order"),
    client.from("site_settings").select("key,value"),
  ]);
  const settings: SiteSettings = {};
  for (const row of settingsResult.data ?? []) Object.assign(settings, { [row.key]: row.value });
  return { pricing: (pricingResult.data ?? []) as PricingRecord[], media: (mediaResult.data ?? []) as MediaRecord[], servicePages: (servicePagesResult.data ?? []) as ServicePageDetail[], pageSections: (pageSectionsResult.data ?? []) as PageSection[], settings };
}
