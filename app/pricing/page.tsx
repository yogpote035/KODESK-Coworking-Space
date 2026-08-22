"use client";

import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { priceLabel, usePublicCms } from "@/lib/cms/client";

export default function PricingPage() {
  const { pricing } = usePublicCms();
  return (
    <PlaceholderPage
      eyebrow="Workspace Plans"
      title="Flexible workspace options designed around the way you work."
      description={`Day Pass: ${priceLabel(pricing, "day_pass", "₹599 / day")}. Dedicated Desk: ${priceLabel(pricing, "dedicated_desk", "₹7,499 / month")}. Private Office: ${priceLabel(pricing, "private_office", "Request Pricing")}. Managed Office: ${priceLabel(pricing, "managed_office", "Request a Quote")}. Meeting Room: ${priceLabel(pricing, "meeting_room", "Request Pricing")}.`}
      primaryHref="/contact"
      primaryLabel="Request Pricing"
      secondaryHref="/services"
      secondaryLabel="View Services"
    />
  );
}
