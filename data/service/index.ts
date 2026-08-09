import { services } from "@/data/service/service";
import type { ServiceDetailContent, ServiceSlug } from "@/data/service/types";

export type { ServiceDetailContent, ServiceItem, ServiceNavItem, ServiceSlug } from "@/data/service/types";
export { getServiceBySlug, serviceNavItems, services, servicesOverview } from "@/data/service/service";

const introductions: Record<ServiceSlug, string> = {
  "coworking-space": "Flexible workspaces for professionals, freelancers, startups and growing teams in Baner, Pune.",
  "managed-office": "Managed office spaces and shared office space options for rent, designed for businesses seeking a professional, ready-to-use workspace with flexible arrangements.",
  "flexible-seating": "Flexible workspace options for professionals who need a productive place to work without a fixed long-term setup.",
  "dedicated-desk": "A reserved workspace for professionals who need a consistent place to work in Baner, Pune.",
  "meeting-room": "Professional meeting room options for productive discussions, presentations and team sessions.",
  "event-space": "A flexible event space for business gatherings, workshops and events.",
  "virtual-office": "Virtual office solutions for businesses seeking a professional presence in Baner, Pune.",
  "podcast-studio": "A dedicated studio space for podcast recording and content creation.",
  "day-pass": "A flexible day pass for professionals who need a productive place to work for the day.",
  "private-cabin": "Private office workspace options for teams and professionals who need a focused, professional environment.",
};

export const serviceDetailContent = services.reduce<Record<ServiceSlug, ServiceDetailContent>>((content, service) => {
  const intro = introductions[service.slug];
  content[service.slug] = {
    heroDescription: intro,
    overviewTitle: `About ${service.label}`,
    overviewBody: `${intro} Please contact our team for current availability, inclusions and pricing.`,
    audienceTitle: "Who Is This For?",
    audience: ["Professionals", "Freelancers", "Startups", "Growing teams", "Businesses"],
    benefits: ["Baner, Pune location", "High-speed Internet", "Professional work environment", "Flexible workspace options", "Modern amenities", "Reception support"],
    features: [
      { title: "Flexible Options", copy: "Choose an arrangement that suits the way you work." },
      { title: "Professional Environment", copy: "A productive setting for focused work and business needs." },
      { title: "High-speed Internet", copy: "Connectivity to support your workday." },
      { title: "Modern Amenities", copy: "Access to confirmed on-site amenities." },
      { title: "Availability", copy: "Please contact our team for current availability and details." },
      { title: "Pricing", copy: service.slug === "day-pass" ? "₹599 per day." : service.slug === "dedicated-desk" ? "₹7,499 per month." : "Request pricing from our team." },
    ],
    ctaTitle: "Ready to Find Your Ideal Workspace?",
    ctaBody: "Book a free tour and our team will help you find the right workspace for your needs.",
    relatedSlugs: services.filter((item) => item.slug !== service.slug).slice(0, 3).map((item) => item.slug),
  };
  return content;
}, {} as Record<ServiceSlug, ServiceDetailContent>);
