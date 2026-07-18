import type { StaticImageData } from "next/image";

export type ServiceSlug =
  | "day-pass"
  | "meeting-room"
  | "private-cabin"
  | "coworking-space"
  | "managed-office"
  | "dedicated-desk"
  | "event-space"
  | "virtual-office"
  | "podcast-studio"
  | "flexible-seating";

export type ServiceItem = {
  slug: ServiceSlug;
  label: string;
  shortLabel: string;
  pdfTitle: string;
  description: string;
  image: StaticImageData;
  galleryImage: StaticImageData;
  accent: string;
  features: string[];
};

export type ServiceDetailContent = {
  heroDescription: string;
  overviewTitle: string;
  overviewBody: string;
  audienceTitle: string;
  audience: string[];
  benefits: string[];
  features: {
    title: string;
    copy: string;
  }[];
  ctaTitle: string;
  ctaBody: string;
  relatedSlugs: ServiceSlug[];
};

export type ServiceNavItem = {
  slug: ServiceSlug;
  label: string;
  icon?: StaticImageData;
};
