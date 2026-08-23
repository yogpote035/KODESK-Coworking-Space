"use client";

import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { priceLabel, usePublicCms } from "@/lib/cms/client";

export default function PricingPage() {
  const { pricing, publishedDocuments } = usePublicCms();
  const pricingHeroDocument = publishedDocuments.find((document) => document.document_key === "pricing.hero")?.content;
  const pricingHero = pricingHeroDocument && typeof pricingHeroDocument === "object" ? pricingHeroDocument as Record<string, unknown> : {};
  const pricingText = (key: "eyebrow" | "title" | "description" | "primary_label" | "primary_url" | "secondary_label" | "secondary_url", fallback: string) => typeof pricingHero[key] === "string" && pricingHero[key].trim() ? pricingHero[key] : fallback;
  return (
    <PlaceholderPage
      eyebrow={pricingText("eyebrow", "Workspace Plans")}
      title={pricingText("title", "Flexible workspace options designed around the way you work.")}
      description={pricingText("description", "") || `Day Pass: ${priceLabel(pricing, "day_pass", "₹599 / day")}. Dedicated Desk: ${priceLabel(pricing, "dedicated_desk", "₹7,499 / month")}. Private Office: ${priceLabel(pricing, "private_office", "Request Pricing")}. Managed Office: ${priceLabel(pricing, "managed_office", "Request a Quote")}. Meeting Room: ${priceLabel(pricing, "meeting_room", "Request Pricing")}.`}
      primaryHref={pricingText("primary_url", "/contact")}
      primaryLabel={pricingText("primary_label", "Request Pricing")}
      secondaryHref={pricingText("secondary_url", "/services")}
      secondaryLabel={pricingText("secondary_label", "View Services")}
    />
  );
}
