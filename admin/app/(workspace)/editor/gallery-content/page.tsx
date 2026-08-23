import { FixedSectionEditor } from "../../../../components/admin/FixedSectionEditor";

export default function GalleryContentEditorPage() {
  return <FixedSectionEditor title="Gallery heading and intro" subtitle="Edit the gallery introduction while the premium gallery layout and filtering behavior remain protected." documentKey="gallery.content" fields={[{ key: "heading", label: "Gallery heading", type: "text", maxLength: 120 }, { key: "description", label: "Gallery introduction", type: "textarea", maxLength: 320 }]} fallback={{ heading: "A closer look at KODESK", description: "Browse our coworking spaces, meeting rooms, private offices and member amenities in Baner, Pune." }} />;
}
