import { FixedSectionEditor } from "../../../../components/admin/FixedSectionEditor";

export default function AboutCommunityEditorPage() {
  return <FixedSectionEditor title="About community section" subtitle="Manage the growth section’s content while its responsive visual composition remains protected." documentKey="about.community" fields={[{ key: "title", label: "Heading", type: "text", maxLength: 120 }, { key: "description", label: "Description", type: "textarea", maxLength: 400 }, { key: "points", label: "Highlights (one per line)", type: "textarea", maxLength: 500 }]} fallback={{ title: "Work, Connect and Grow", description: "KODESK brings flexible workspace options together in a professional Baner, Pune environment designed for focused work and growing businesses.", points: "Flexible workspace options\nProfessional work environment\nModern amenities" }} />;
}
