"use client";

import { useEffect, useState } from "react";
import type { MediaRecord, PageSection, PricingRecord, ServicePageDetail, SiteSettings } from "@/lib/cms/types";

type CmsState = { pricing: PricingRecord[]; media: MediaRecord[]; servicePages: ServicePageDetail[]; pageSections: PageSection[]; settings: SiteSettings; loading: boolean };
const initial: CmsState = { pricing: [], media: [], servicePages: [], pageSections: [], settings: {}, loading: true };

export function usePublicCms() {
  const [state, setState] = useState<CmsState>(initial);
  useEffect(() => {
    let active = true;
    fetch("/api/public-cms").then((response) => response.ok ? response.json() : null).then((data: Omit<CmsState, "loading"> | null) => { if (active && data) setState({ ...data, loading: false }); else if (active) setState((current) => ({ ...current, loading: false })); }).catch(() => active && setState((current) => ({ ...current, loading: false })));
    return () => { active = false; };
  }, []);
  return state;
}

export function priceLabel(pricing: PricingRecord[], key: string, fallback: string) {
  return pricing.find((item) => item.service_key === key)?.price_label || fallback;
}
