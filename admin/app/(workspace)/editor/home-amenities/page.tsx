"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { LoadingState, PageHeader } from "../../../../components/admin/ui";

type Amenity = { icon_index: number; label: string; title: string; description: string; is_active: boolean; sort_order: number };
type DocumentRow = { draft_content: { items?: Amenity[] }; published_content: { items?: Amenity[] }; published_version: number };
const documentKey = "home.amenities";
const fallback: Amenity[] = [
  ["High-speed internet", "Ultra-fast fiber internet", "Gigabit connectivity ensures seamless collaboration and fast file transfers."],
  ["Parking", "Secure Parking Space", "Dedicated, well-lit parking bays for members and guests right at your doorstep."],
  ["Power Backup", "24/7 Power Backup", "Uninterrupted power supply keeps your team productive through any outage."],
  ["Security", "Round-the-clock Security", "CCTV surveillance and keycard access keep your workspace safe at all hours."],
  ["Reception Support", "Dedicated Reception", "A professional front desk to greet your guests and handle your visitors."],
  ["Cafeteria", "In-house Cafeteria", "Freshly brewed coffee, snacks, and meals to keep you energised all day."],
  ["Air Conditioning", "Climate Controlled", "Fully air-conditioned floors maintain the perfect working temperature."],
  ["Printing Services", "Printing & Scanning", "High-volume printers, scanners, and copiers available whenever you need them."],
].map(([label, title, description], icon_index) => ({ icon_index, label, title, description, is_active: true, sort_order: icon_index + 1 }));
const normalize = (value: unknown) => {
  const items = value && typeof value === "object" && Array.isArray((value as { items?: unknown }).items) ? (value as { items: unknown[] }).items : fallback;
  const clean = items.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const candidate = item as Partial<Amenity>;
    if (typeof candidate.icon_index !== "number" || typeof candidate.label !== "string" || typeof candidate.title !== "string" || typeof candidate.description !== "string") return [];
    return [{ icon_index: candidate.icon_index, label: candidate.label.trim(), title: candidate.title.trim(), description: candidate.description.trim(), is_active: candidate.is_active !== false, sort_order: Number(candidate.sort_order) || index + 1 }];
  });
  return clean.length ? clean : fallback;
};

export default function HomeAmenitiesEditorPage() {
  const [draft, setDraft] = useState<Amenity[]>(fallback); const [published, setPublished] = useState<Amenity[]>(fallback); const [version, setVersion] = useState(0); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [notice, setNotice] = useState("");
  const changed = useMemo(() => JSON.stringify(draft) !== JSON.stringify(published), [draft, published]);
  const load = async () => { if (!supabase) return; setLoading(true); const result = await supabase.from("content_documents").select("draft_content,published_content,published_version").eq("document_key", documentKey).maybeSingle(); if (result.error?.code === "42P01") { setNotice("Apply migration 202608220007_cms_publication_workflow.sql to enable drafts and publishing."); setLoading(false); return; } const row = result.data as DocumentRow | null; if (row) { setDraft(normalize(row.draft_content)); setPublished(row.published_version ? normalize(row.published_content) : fallback); setVersion(row.published_version); } setLoading(false); };
  useEffect(() => { void load(); }, []);
  const update = (index: number, field: keyof Amenity, value: string | boolean) => setDraft((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  const move = (index: number, direction: -1 | 1) => { const target = index + direction; if (target < 0 || target >= draft.length) return; const items = [...draft]; [items[index], items[target]] = [items[target], items[index]]; setDraft(items.map((item, itemIndex) => ({ ...item, sort_order: itemIndex + 1 }))); };
  const saveDraft = async () => { if (!supabase) return; setSaving(true); const { data: auth } = await supabase.auth.getUser(); const result = await supabase.from("content_documents").upsert({ document_key: documentKey, draft_content: { items: draft }, draft_updated_by: auth.user?.id ?? null }, { onConflict: "document_key" }); setSaving(false); setNotice(result.error ? "Unable to save the amenities draft." : "Amenities draft saved. The public website has not changed."); };
  const publish = async () => { if (!supabase || draft.some((item) => !item.label.trim() || !item.title.trim() || !item.description.trim())) { setNotice("Every amenity needs a label, title and description before publishing."); return; } setSaving(true); const { data: auth } = await supabase.auth.getUser(); const nextVersion = version + 1; const documentResult = await supabase.from("content_documents").upsert({ document_key: documentKey, draft_content: { items: draft }, published_content: { items: draft }, draft_updated_by: auth.user?.id ?? null, published_by: auth.user?.id ?? null, published_at: new Date().toISOString(), published_version: nextVersion }, { onConflict: "document_key" }); const revisionResult = documentResult.error ? { error: documentResult.error } : await supabase.from("content_revisions").insert({ document_key: documentKey, version: nextVersion, content: { items: draft }, action: "published", created_by: auth.user?.id ?? null }); setSaving(false); if (revisionResult.error) { setNotice("Publish could not be completed. The current public amenities remain live."); return; } setPublished(draft); setVersion(nextVersion); setNotice("Homepage amenities published successfully."); };
  if (loading) return <LoadingState rows={7} />;
  return <><PageHeader title="Homepage Amenities" subtitle="Edit the content, display order and visibility of approved amenity cards. Icons remain tied to the KODESK design system." action={<Link className="button button-secondary" href="/editor">Back to Website Editor</Link>} />{notice && <div className="toast-message">{notice}</div>}<section className="surface editor-panel editor-wide"><div className="surface-heading"><div><p className="section-kicker">HOME · AMENITIES</p><h2>World-class amenities</h2><p>Use the arrow controls to change card order. Hiding an item removes it from both mobile and desktop versions.</p></div><span className={`editor-state ${changed ? "draft" : "published"}`}>{changed ? "Draft changes" : "Published"}</span></div><div className="amenity-editor-list">{draft.map((item, index) => <article className="amenity-editor-item" key={item.icon_index}><div className="amenity-editor-title"><b>{String(index + 1).padStart(2, "0")}</b><div><button className="button button-ghost" type="button" disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button className="button button-ghost" type="button" disabled={index === draft.length - 1} onClick={() => move(index, 1)}>↓</button></div></div><div className="settings-fields"><label>Vertical label<input maxLength={60} value={item.label} onChange={(event) => update(index, "label", event.target.value)} /></label><label>Title<input maxLength={90} value={item.title} onChange={(event) => update(index, "title", event.target.value)} /></label></div><label>Description<textarea maxLength={300} value={item.description} onChange={(event) => update(index, "description", event.target.value)} /></label><label className="switch service-active"><input type="checkbox" checked={item.is_active} onChange={(event) => update(index, "is_active", event.target.checked)} /><span />Visible on public website</label></article>)}</div><div className="editor-actions"><button className="button button-secondary" type="button" disabled={saving} onClick={() => void saveDraft()}>{saving ? "Saving…" : "Save Draft"}</button><button className="button button-primary" type="button" disabled={saving} onClick={() => void publish()}>{saving ? "Publishing…" : "Publish amenities"}</button></div></section></>;
}
