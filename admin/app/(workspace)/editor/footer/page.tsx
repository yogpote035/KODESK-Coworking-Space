import { FixedSectionEditor } from "../../../../components/admin/FixedSectionEditor";

export default function FooterEditorPage() {
  return <FixedSectionEditor title="Footer content" subtitle="Update the footer copy and hide approved links while the premium layout and social/contact integrations remain consistent." documentKey="global.footer" fields={[{ key: "description", label: "Footer description", type: "textarea", maxLength: 280 }, { key: "copyright", label: "Copyright line", type: "text", maxLength: 120 }, { key: "hidden_links", label: "Hidden quick-link keys (comma separated)", type: "text", maxLength: 180 }]} fallback={{ description: "Flexible workspace solutions for professionals, startups and businesses in Baner, Pune.", copyright: "© 2026 KODESK. All rights reserved.", hidden_links: "" }} />;
}
