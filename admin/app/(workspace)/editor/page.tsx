"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { LoadingState, PageHeader } from "../../../components/admin/ui";

type HeroDocument = {
  eyebrow: string;
  heading: string;
  highlight: string;
  subheading: string;
  cta_label: string;
};

type DocumentRow = {
  document_key: string;
  draft_content: HeroDocument;
  published_content: HeroDocument;
  published_version: number;
};

type Revision = { id: string; version: number; content: HeroDocument; action: "published" | "restored"; created_at: string };

const documentKey = "home.hero";
const fallback: HeroDocument = {
  eyebrow: "Achieving Success Together",
  heading: "Premium Coworking Space in Baner, Pune",
  highlight: "Flexible Workspaces",
  subheading: "Designed for Productivity",
  cta_label: "Book a Free Tour",
};

const visualSections = [
  { href: "/editor", label: "Homepage hero", copy: "Heading, supporting text and tour CTA" },
  { href: "/editor/home-amenities", label: "Homepage amenities", copy: "Visibility and card order" },
  { href: "/editor/home-testimonials", label: "Homepage testimonials", copy: "Verified member feedback" },
  { href: "/editor/home-faqs", label: "Homepage FAQs", copy: "Accordion questions and answers" },
  { href: "/editor/about-hero", label: "About hero", copy: "Hero copy, CTAs and image" },
  { href: "/editor/about-heritage", label: "About heritage", copy: "Heritage section content and image" },
  { href: "/editor/about-community", label: "About community", copy: "Growth copy and highlight list" },
  { href: "/editor/gallery-hero", label: "Gallery hero", copy: "Gallery introduction and CTAs" },
  { href: "/editor/contact-hero", label: "Contact hero", copy: "Contact introduction and image" },
  { href: "/editor/contact-form", label: "Contact form", copy: "Visible labels and button copy" },
  { href: "/editor/contact-support", label: "Contact support", copy: "Map, reasons and tour CTA" },
  { href: "/editor/contact-faqs", label: "Contact FAQs", copy: "Contact-page questions and answers" },
  { href: "/editor/footer", label: "Footer", copy: "Footer description and copyright" },
  { href: "/editor/navigation", label: "Navigation", copy: "Approved navigation labels" },
];
const visualEditorRoutes: Record<string, string> = { "global.navigation": "/editor/navigation", "global.footer": "/editor/footer", "home.hero": "/editor", "home.services": "/editor/home-services", "home.amenities": "/editor/home-amenities", "home.pricing": "/editor/home-pricing", "home.testimonials": "/editor/home-testimonials", "home.faq": "/editor/home-faqs", "about.hero": "/editor/about-hero", "about.heritage": "/editor/about-heritage", "about.mission": "/editor/about-mission", "about.values": "/editor/about-values", "about.community": "/editor/about-community", "about.cta": "/editor/about-cta", "gallery.hero": "/editor/gallery-hero", "gallery.content": "/editor/gallery-content", "gallery.filters": "/editor/gallery-filters", "pricing.hero": "/editor/pricing-hero", "services.overview": "/editor/services-overview", "contact.hero": "/editor/contact-hero", "contact.form": "/editor/contact-form", "contact.faq": "/editor/contact-faqs", "contact.support": "/editor/contact-support" };
const editorRouteFor = (section: string) => { if (section.startsWith("service.detail:") || section.startsWith("service.overview:")) return `/services/${section.split(":")[1]}`; return visualEditorRoutes[section] ?? "/editor"; };

function normalize(value: unknown): HeroDocument {
  const input = value && typeof value === "object" ? value as Partial<HeroDocument> : {};
  return { ...fallback, ...Object.fromEntries(Object.entries(input).filter(([, item]) => typeof item === "string")) } as HeroDocument;
}

export default function EditorPage() {
  const [draft, setDraft] = useState<HeroDocument>(fallback);
  const [published, setPublished] = useState<HeroDocument>(fallback);
  const [version, setVersion] = useState(0);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewPath, setPreviewPath] = useState("/");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const changed = useMemo(() => JSON.stringify(draft) !== JSON.stringify(published), [draft, published]);

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const [documentResult, heroResult, revisionResult] = await Promise.all([
      supabase.from("content_documents").select("document_key,draft_content,published_content,published_version").eq("document_key", documentKey).maybeSingle(),
      supabase.from("page_sections").select("content").eq("page_key", "home").eq("section_key", "hero").maybeSingle(),
      supabase.from("content_revisions").select("id,version,content,action,created_at").eq("document_key", documentKey).order("version", { ascending: false }).limit(8),
    ]);

    if (documentResult.error?.code === "42P01" || revisionResult.error?.code === "42P01") {
      setNotice("Apply migration 202608220007_cms_publication_workflow.sql to enable drafts and publishing.");
      setLoading(false);
      return;
    }

    const legacy = normalize(heroResult.data?.content);
    const document = documentResult.data as DocumentRow | null;
    setDraft(document ? normalize(document.draft_content) : legacy);
    setPublished(document && document.published_version > 0 ? normalize(document.published_content) : legacy);
    setVersion(document?.published_version ?? 0);
    setRevisions((revisionResult.data ?? []).map((item) => ({ ...item, content: normalize(item.content) })) as Revision[]);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);
  useEffect(() => { const onMessage = (event: MessageEvent) => { if (event.data?.type === "kodesk-cms-select" && typeof event.data.section === "string") setSelectedSection(event.data.section); }; window.addEventListener("message", onMessage); return () => window.removeEventListener("message", onMessage); }, []);

  const saveDraft = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();
    const result = await supabase.from("content_documents").upsert({
      document_key: documentKey,
      draft_content: draft,
      draft_updated_by: auth.user?.id ?? null,
    }, { onConflict: "document_key" });
    setSaving(false);
    setNotice(result.error ? "Unable to save the draft. Please try again." : "Draft saved. The public website has not changed.");
  };

  const publish = async () => {
    if (!supabase) return;
    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();
    const nextVersion = version + 1;
    const documentResult = await supabase.from("content_documents").upsert({
      document_key: documentKey,
      draft_content: draft,
      published_content: draft,
      draft_updated_by: auth.user?.id ?? null,
      published_by: auth.user?.id ?? null,
      published_at: new Date().toISOString(),
      published_version: nextVersion,
    }, { onConflict: "document_key" });
    const revisionResult = documentResult.error ? { error: documentResult.error } : await supabase.from("content_revisions").insert({ document_key: documentKey, version: nextVersion, content: draft, action: "published", created_by: auth.user?.id ?? null });
    setSaving(false);
    if (revisionResult.error) { setNotice("Publish could not be completed. The previous public content remains live."); return; }
    setPublished(draft); setVersion(nextVersion); setNotice("Homepage hero published successfully."); void load();
  };

  const restore = async (revision: Revision) => {
    setDraft(revision.content);
    setNotice(`Version ${revision.version} loaded into the draft. Save or publish it when ready.`);
  };

  if (loading) return <LoadingState rows={6} />;
  return <>
    <PageHeader title="Website Editor" subtitle="Edit a draft, preview the live page, then publish when you are ready." action={<div className="editor-header-actions"><Link className="button button-secondary" href="/editor/navigation">Navigation</Link><Link className="button button-secondary" href="/editor/footer">Footer</Link><Link className="button button-secondary" href="/editor/contact-hero">Contact hero</Link><Link className="button button-secondary" href="/editor/contact-faqs">Contact FAQs</Link><Link className="button button-secondary" href="/editor/gallery-hero">Gallery hero</Link><Link className="button button-secondary" href="/editor/pricing-hero">Pricing page</Link><Link className="button button-secondary" href="/editor/about-heritage">About heritage</Link><Link className="button button-secondary" href="/editor/about-hero">About hero</Link><Link className="button button-secondary" href="/editor/home-amenities">Amenities</Link><Link className="button button-secondary" href="/editor/home-faqs">Homepage FAQs</Link><a className="button button-secondary" href={process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_URL ?? "https://kodesk-coworking-space.vercel.app"} target="_blank" rel="noreferrer">Open public website</a></div>} />
    {notice && <div className="toast-message">{notice}</div>}
    <section className="surface visual-preview"><div className="surface-heading"><div><p className="section-kicker">LIVE VISUAL PREVIEW</p><h2>Website canvas</h2><p>Hover an outlined supported section, then click it to select its protected editor. Drafts remain private until published.</p></div><div className="preview-devices"><button className={previewPath === "/" ? "active" : ""} onClick={() => setPreviewPath("/")}>Home</button><button className={previewPath === "/about" ? "active" : ""} onClick={() => setPreviewPath("/about")}>About</button><button className={previewPath === "/gallery" ? "active" : ""} onClick={() => setPreviewPath("/gallery")}>Gallery</button><button className={previewPath === "/pricing" ? "active" : ""} onClick={() => setPreviewPath("/pricing")}>Pricing</button><button className={previewPath === "/services/coworking-space" ? "active" : ""} onClick={() => setPreviewPath("/services/coworking-space")}>Service detail</button><button className={previewPath === "/contact" ? "active" : ""} onClick={() => setPreviewPath("/contact")}>Contact</button><button className={previewDevice === "desktop" ? "active" : ""} onClick={() => setPreviewDevice("desktop")}>Desktop</button><button className={previewDevice === "tablet" ? "active" : ""} onClick={() => setPreviewDevice("tablet")}>Tablet</button><button className={previewDevice === "mobile" ? "active" : ""} onClick={() => setPreviewDevice("mobile")}>Mobile</button></div></div>{selectedSection && <div className="toast-message">Selected: {selectedSection}. <Link href={editorRouteFor(selectedSection)}>Open editor</Link></div>}<div className={`preview-frame preview-${previewDevice}`}><iframe title="KODESK visual editor preview" src={`${process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_URL ?? "https://kodesk-coworking-space.vercel.app"}${previewPath}?cmsPreview=1`} /></div></section>
    <section className="surface section-picker"><div className="surface-heading"><div><p className="section-kicker">SELECT A SECTION</p><h2>Edit website content</h2><p>Select a visible website area to open its protected draft editor. Layout, code and responsive styling cannot be changed from here.</p></div></div><div className="section-picker-grid">{visualSections.map((section) => <Link key={section.href} className="section-picker-card" href={section.href}><b>{section.label}</b><span>{section.copy}</span><em>Edit section →</em></Link>)}</div></section>
    <div className="editor-grid">
      <form className="surface editor-panel" onSubmit={(event) => void saveDraft(event)}>
        <div className="surface-heading"><div><p className="section-kicker">HOME · HERO</p><h2>Hero content</h2><p>Only content fields are editable. Existing animation, video, layout and responsive rules stay protected.</p></div><span className={`editor-state ${changed ? "draft" : "published"}`}>{changed ? "Draft changes" : "Published"}</span></div>
        <div className="settings-fields"><label>Eyebrow<input maxLength={90} value={draft.eyebrow} onChange={(event) => setDraft({ ...draft, eyebrow: event.target.value })} /></label><label>CTA label<input maxLength={50} value={draft.cta_label} onChange={(event) => setDraft({ ...draft, cta_label: event.target.value })} /></label></div>
        <label>Heading<input maxLength={120} value={draft.heading} onChange={(event) => setDraft({ ...draft, heading: event.target.value })} /></label>
        <div className="settings-fields"><label>Highlight<input maxLength={90} value={draft.highlight} onChange={(event) => setDraft({ ...draft, highlight: event.target.value })} /></label><label>Supporting heading<input maxLength={120} value={draft.subheading} onChange={(event) => setDraft({ ...draft, subheading: event.target.value })} /></label></div>
        <div className="editor-actions"><button className="button button-secondary" type="submit" disabled={saving}>{saving ? "Saving…" : "Save Draft"}</button><button className="button button-primary" type="button" disabled={saving} onClick={() => void publish()}>{saving ? "Publishing…" : "Publish"}</button></div>
      </form>
      <aside className="surface editor-panel"><div className="surface-heading"><div><p className="section-kicker">PUBLISHED HISTORY</p><h2>Versions</h2><p>Publishing creates an immutable content snapshot.</p></div></div>{revisions.length ? <div className="revision-list">{revisions.map((revision) => <div className="revision-item" key={revision.id}><div><b>Version {revision.version}</b><small>{new Date(revision.created_at).toLocaleString("en-IN")}</small></div><button className="button button-ghost" type="button" onClick={() => restore(revision)}>Restore to draft</button></div>)}</div> : <p className="editor-empty">No published versions yet. Your current public fallback remains in use until the first publish.</p>}</aside>
    </div>
  </>;
}
