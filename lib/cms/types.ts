export type PricingRecord = { id: string; service_key: string; service_name: string; price: number | null; price_label: string | null; currency: string; billing_period: string | null; description: string | null; is_active: boolean; sort_order: number };
export type MediaRecord = { id: string; name: string; storage_path: string; public_url: string; alt_text: string | null; category: "hero" | "gallery" | "service" | "other"; gallery_category: "workspace" | "meeting-rooms" | "lounge-areas" | "amenities" | null; is_active: boolean; sort_order: number };
export type ContactSettings = { phone: string; email: string; address: string };
export type SiteSettings = { contact_information?: ContactSettings; business_hours?: { reception: string }; social_links?: Record<string, string> };
