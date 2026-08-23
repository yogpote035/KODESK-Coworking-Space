"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { MediaPicker } from "./MediaPicker";
import { LoadingState, PageHeader } from "./ui";

export type FixedSectionField = { key: string; label: string; type: "text" | "textarea" | "url" | "image"; maxLength?: number };
type DocumentRow = { draft_content: Record<string, string>; published_content: Record<string, string>; published_version: number };

export function FixedSectionEditor({ title, subtitle, documentKey, fields, fallback }: { title: string; subtitle: string; documentKey: string; fields: FixedSectionField[]; fallback: Record<string, string> }) {
  const [draft, setDraft] = useState(fallback); const [published, setPublished] = useState(fallback); const [version, setVersion] = useState(0); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [notice, setNotice] = useState("");
  const changed = useMemo(() => JSON.stringify(draft) !== JSON.stringify(published), [draft, published]);
  const normalize = (value: unknown) => ({ ...fallback, ...(value && typeof value === "object" ? Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === "string")) : {}) });
  useEffect(() => { if (!supabase) return; void (async () => { const result = await supabase.from("content_documents").select("draft_content,published_content,published_version").eq("document_key", documentKey).maybeSingle(); if (result.error?.code === "42P01") setNotice("Apply migration 202608220007_cms_publication_workflow.sql to enable drafts and publishing."); const row = result.data as DocumentRow | null; if (row) { setDraft(normalize(row.draft_content)); setPublished(row.published_version ? normalize(row.published_content) : fallback); setVersion(row.published_version); } setLoading(false); })(); }, [documentKey]);
  const save = async (publish: boolean) => { if (!supabase) return; const missing = fields.filter((field) => field.key === "title" || field.key === "heading").some((field) => !draft[field.key]?.trim()); if (publish && missing) { setNotice("Complete the required heading before publishing."); return; } setSaving(true); const { data: auth } = await supabase.auth.getUser(); const nextVersion = version + 1;
    let documentError: unknown = null;
    if (publish) {
      const result = await supabase.from("content_documents").upsert({ document_key: documentKey, draft_content: draft, published_content: draft, draft_updated_by: auth.user?.id ?? null, published_by: auth.user?.id ?? null, published_at: new Date().toISOString(), published_version: nextVersion }, { onConflict: "document_key" });
      documentError = result.error;
    } else {
      const result = await supabase.from("content_documents").upsert({ document_key: documentKey, draft_content: draft, draft_updated_by: auth.user?.id ?? null }, { onConflict: "document_key" });
      documentError = result.error;
    }
    const revisionResult = !publish || documentError ? { error: documentError } : await supabase.from("content_revisions").insert({ document_key: documentKey, version: nextVersion, content: draft, action: "published", created_by: auth.user?.id ?? null });
    setSaving(false); if (documentError || revisionResult.error) { setNotice("Unable to save this section. The currently published website remains unchanged."); return; } if (publish) { setPublished(draft); setVersion(nextVersion); setNotice("Section published successfully."); } else setNotice("Draft saved. The public website has not changed.");
  };
  if (loading) return <LoadingState rows={6} />;
  return <><PageHeader title={title} subtitle={subtitle} action={<Link className="button button-secondary" href="/editor">Back to Website Editor</Link>} />{notice && <div className="toast-message">{notice}</div>}<section className="surface editor-panel editor-wide"><div className="surface-heading"><div><p className="section-kicker">FIXED PAGE SECTION</p><h2>{title}</h2><p>The KODESK layout, responsive behavior, styling and animations remain developer-controlled.</p></div><span className={`editor-state ${changed ? "draft" : "published"}`}>{changed ? "Draft changes" : "Published"}</span></div>{fields.map((field) => field.type === "image" ? <MediaPicker key={field.key} label={field.label} value={draft[field.key] || null} onChange={(value) => setDraft({ ...draft, [field.key]: typeof value === "string" ? value : "" })} /> : <label key={field.key}>{field.label}{field.type === "textarea" ? <textarea maxLength={field.maxLength} value={draft[field.key] ?? ""} onChange={(event) => setDraft({ ...draft, [field.key]: event.target.value })} /> : <input type={field.type === "url" ? "url" : "text"} maxLength={field.maxLength} value={draft[field.key] ?? ""} onChange={(event) => setDraft({ ...draft, [field.key]: event.target.value })} />}</label>)}<div className="editor-actions"><button className="button button-secondary" type="button" disabled={saving} onClick={() => void save(false)}>{saving ? "Saving…" : "Save Draft"}</button><button className="button button-primary" type="button" disabled={saving} onClick={() => void save(true)}>{saving ? "Publishing…" : "Publish section"}</button></div></section></>;
}
