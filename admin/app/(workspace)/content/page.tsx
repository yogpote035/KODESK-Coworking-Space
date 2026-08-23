"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { LoadingState, PageHeader } from "../../../components/admin/ui";
import { MediaPicker } from "../../../components/admin/MediaPicker";

type HeroContent = { eyebrow: string; heading: string; highlight: string; subheading: string; cta_label: string };
type Branding = { site_name: string; tagline: string; logo_url: string; favicon_url: string; default_og_image_url: string; default_cta_label: string; default_cta_url: string };

const defaults: HeroContent = { eyebrow: "Achieving Success Together", heading: "Premium Coworking Space in Baner, Pune", highlight: "Flexible Workspaces", subheading: "Designed for Productivity", cta_label: "Book a Free Tour" };
const brandingDefaults: Branding = { site_name: "KODESK", tagline: "Achieving Success Together", logo_url: "", favicon_url: "", default_og_image_url: "", default_cta_label: "Book a Tour", default_cta_url: "/contact" };

export default function ContentPage() {
  const [hero, setHero] = useState<HeroContent>(defaults);
  const [branding, setBranding] = useState<Branding>(brandingDefaults);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!supabase) return;
    void (async () => {
      const [heroResult, brandingResult] = await Promise.all([
        supabase.from("page_sections").select("content,is_active").eq("page_key", "home").eq("section_key", "hero").maybeSingle(),
        supabase.from("site_settings").select("value").eq("key", "branding").maybeSingle(),
      ]);
      if (heroResult.error) setNotice("Run the Full Website CMS migration before editing page content.");
      if (heroResult.data) { setHero({ ...defaults, ...(heroResult.data.content as Partial<HeroContent>) }); setActive(heroResult.data.is_active); }
      if (brandingResult.data) setBranding({ ...brandingDefaults, ...(brandingResult.data.value as Partial<Branding>) });
      setLoading(false);
    })();
  }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const [heroResult, brandingResult] = await Promise.all([
      supabase.from("page_sections").upsert({ page_key: "home", section_key: "hero", content: hero, is_active: active, sort_order: 1 }, { onConflict: "page_key,section_key" }),
      supabase.from("site_settings").upsert({ key: "branding", value: branding }, { onConflict: "key" }),
    ]);
    setSaving(false);
    setNotice(heroResult.error || brandingResult.error ? "Unable to save. Confirm that the CMS migrations have run." : "Homepage hero and branding saved. The public site will use this content immediately.");
  };

  if (loading) return <LoadingState rows={5} />;
  return <>
    <PageHeader title="Website content" subtitle="Edit public website content while keeping the KODESK design intact" />
    {notice && <div className="toast-message">{notice}</div>}
    <form className="settings-list" onSubmit={save}>
      <section className="surface settings-card">
        <div className="surface-heading"><div><span className="section-kicker">GLOBAL</span><h2>Branding</h2><p>Choose brand media from the Media Library. Built-in KODESK assets remain safe fallbacks.</p></div></div>
        <div className="settings-fields">
          <label>Site name<input maxLength={80} value={branding.site_name} onChange={(event) => setBranding({ ...branding, site_name: event.target.value })} /></label>
          <label>Brand tagline<input maxLength={120} value={branding.tagline} onChange={(event) => setBranding({ ...branding, tagline: event.target.value })} /></label>
          <label>Default CTA label<input maxLength={50} value={branding.default_cta_label} onChange={(event) => setBranding({ ...branding, default_cta_label: event.target.value })} /></label>
          <label>Default CTA URL<input value={branding.default_cta_url} onChange={(event) => setBranding({ ...branding, default_cta_url: event.target.value })} /></label>
        </div>
        <MediaPicker label="Primary logo" value={branding.logo_url || null} onChange={(value) => setBranding({ ...branding, logo_url: typeof value === "string" ? value : "" })} />
        <MediaPicker label="Favicon" value={branding.favicon_url || null} onChange={(value) => setBranding({ ...branding, favicon_url: typeof value === "string" ? value : "" })} />
        <MediaPicker label="Default social sharing image" value={branding.default_og_image_url || null} onChange={(value) => setBranding({ ...branding, default_og_image_url: typeof value === "string" ? value : "" })} />
      </section>
      <section className="surface settings-card">
        <div className="surface-heading"><div><span className="section-kicker">HOMEPAGE</span><h2>Hero section</h2><p>These fields update the existing homepage hero without changing its animation, video, layout, or styling.</p></div></div>
        <div className="settings-fields">
          <label>Eyebrow<input maxLength={90} value={hero.eyebrow} onChange={(event) => setHero({ ...hero, eyebrow: event.target.value })} /></label>
          <label>Primary heading<input maxLength={120} value={hero.heading} onChange={(event) => setHero({ ...hero, heading: event.target.value })} /></label>
          <label>Highlight text<input maxLength={90} value={hero.highlight} onChange={(event) => setHero({ ...hero, highlight: event.target.value })} /></label>
          <label>Supporting heading<input maxLength={120} value={hero.subheading} onChange={(event) => setHero({ ...hero, subheading: event.target.value })} /></label>
          <label>Tour CTA label<input maxLength={50} value={hero.cta_label} onChange={(event) => setHero({ ...hero, cta_label: event.target.value })} /></label>
          <label className="switch service-active"><input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} /><span />Show CMS hero content publicly</label>
        </div>
        <button className="button button-primary" disabled={saving}>{saving ? "Saving…" : "Save website content"}</button>
      </section>
    </form>
  </>;
}
