import { getPublicSupabase } from "@/lib/supabase/server";
import type { MediaRecord, PricingRecord, SiteSettings } from "@/lib/cms/types";

export async function getPublicCmsData() {
  const client = getPublicSupabase();
  if (!client) return { pricing: [] as PricingRecord[], media: [] as MediaRecord[], settings: {} as SiteSettings };
  const [pricingResult, mediaResult, settingsResult] = await Promise.all([
    client.from("pricing").select("id,service_key,service_name,price,price_label,currency,billing_period,description,is_active,sort_order").eq("is_active", true).order("sort_order"),
    client.from("media").select("id,name,storage_path,public_url,alt_text,category,gallery_category,is_active,sort_order").eq("is_active", true).order("sort_order"),
    client.from("site_settings").select("key,value"),
  ]);
  const settings: SiteSettings = {};
  for (const row of settingsResult.data ?? []) Object.assign(settings, { [row.key]: row.value });
  return { pricing: (pricingResult.data ?? []) as PricingRecord[], media: (mediaResult.data ?? []) as MediaRecord[], settings };
}
