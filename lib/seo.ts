import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kodesk-coworking-space.vercel.app").replace(/\/$/, "");

export const localSeoPages = {
  "coworking-space-baner": { serviceSlug: "coworking-space", title: "Coworking Space in Baner, Pune", description: "Explore a professional coworking space for single professionals, women, freelancers, startups and teams in Baner, Pune." },
  "dedicated-desk-baner": { serviceSlug: "dedicated-desk", title: "Dedicated Desk in Baner, Pune", description: "Reserve a dedicated desk in a professional coworking environment in Baner, Pune." },
  "private-office-baner": { serviceSlug: "private-cabin", title: "Private Office in Baner, Pune", description: "Find private office workspace options for teams and professionals in Baner, Pune." },
  "meeting-room-baner": { serviceSlug: "meeting-room", title: "Meeting Room in Baner, Pune", description: "Book a professional meeting room in Baner, Pune. Contact KODESK for current availability and duration." },
  "managed-office-baner": { serviceSlug: "managed-office", title: "Managed Office in Baner, Pune", description: "Explore managed office spaces for rent and shared office space options in Baner, Pune, with flexible professional workspace arrangements." },
  "day-pass-baner": { serviceSlug: "day-pass", title: "Coworking Day Pass in Baner, Pune", description: "Get a productive coworking day pass in Baner, Pune for ₹599 per day, subject to availability." },
} as const;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url, title, description, siteName: "KODESK Coworking Space", locale: "en_IN" },
    twitter: { card: "summary", title, description },
  };
}
