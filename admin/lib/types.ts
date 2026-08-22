export type InquiryStatus = "new" | "contacted" | "closed";
export type Inquiry = { id: string; name: string; phone: string; email: string | null; interested_in: string | null; message: string | null; status: InquiryStatus; created_at: string; updated_at: string };
export type Pricing = { id: string; service_key: string; service_name: string; price: number | null; price_label: string | null; currency: string; billing_period: string | null; description: string | null; is_active: boolean; sort_order: number };
export type GalleryCategory = "workspace" | "meeting-rooms" | "lounge-areas" | "amenities";
export type Media = { id: string; name: string; storage_path: string; public_url: string; alt_text: string | null; category: "hero" | "gallery" | "service" | "other"; gallery_category: GalleryCategory | null; is_active: boolean; sort_order: number };
export type Service = { id: string; slug: string; name: string; short_description: string; image_url: string | null; is_active: boolean; sort_order: number; created_at: string; updated_at: string };
export type SettingRow = { id: string; key: string; value: Record<string, string>; updated_at: string };
export type AdminProfile = { id: string; email: string; role: "admin"; is_active: boolean };
