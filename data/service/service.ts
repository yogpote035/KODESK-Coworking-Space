import mainImage from "@/assets/images/Services/MainService.png";
import dayPassImage from "@/assets/images/Services/DayPass.png";
import meetingRoomImage from "@/assets/images/Services/MeetingRoom.png";
import privateCabinImage from "@/assets/images/Services/PrivateCabin.png";
import coworkingImage from "@/assets/images/Services/Coworking.png";
import managedOfficeImage from "@/assets/images/Services/ManageOffice.png";
import dedicatedDeskImage from "@/assets/images/Services/DedicatedDesk.png";
import eventSpaceImage from "@/assets/images/Services/EventSpace.png";
import virtualOfficeImage from "@/assets/images/Services/Subtract.png";
import podcastImage from "@/assets/images/Services/Podcast.png";
import flexibleSeatingImage from "@/assets/images/Services/FlexibleSeating.png";
import dayPassCutImage from "@/assets/images/Services/cut/DayPass.png";
import meetingRoomCutImage from "@/assets/images/Services/cut/Meeting.png";
import privateCabinCutImage from "@/assets/images/Services/cut/private.png";
import coworkingCutImage from "@/assets/images/Services/cut/Coworking.png";
import managedOfficeCutImage from "@/assets/images/Services/cut/Managed.png";
import dedicatedDeskCutImage from "@/assets/images/Services/cut/DedicatedDesk.png";
import eventSpaceCutImage from "@/assets/images/Services/cut/eventspace.png";
import virtualOfficeCutImage from "@/assets/images/Services/cut/Virtual.png";
import podcastCutImage from "@/assets/images/Services/cut/Podcast.png";
import flexibleSeatingCutImage from "@/assets/images/Services/cut/Flexible Sitting.png";
import dayPassNavIcon from "@/assets/icons/navbar/Services/Daypass.png";
import coworkingNavIcon from "@/assets/icons/navbar/Services/coworking.png";
import dedicatedNavIcon from "@/assets/icons/navbar/Services/dedicated.png";
import eventNavIcon from "@/assets/icons/navbar/Services/Event.png";
import managedNavIcon from "@/assets/icons/navbar/Services/managed.png";
import vectorNavIcon from "@/assets/icons/navbar/Services/Vector.png";
import virtualNavIcon from "@/assets/icons/navbar/Services/virtual.png";
import type { ServiceItem, ServiceNavItem } from "@/data/service/types";

export const serviceNavItems: readonly ServiceNavItem[] = [
  { slug: "day-pass", label: "Day Pass", icon: dayPassNavIcon },
  { slug: "meeting-room", label: "Meeting Room" },
  { slug: "private-cabin", label: "Private Office" },
  { slug: "coworking-space", label: "Coworking Space", icon: coworkingNavIcon },
  { slug: "managed-office", label: "Managed Office", icon: managedNavIcon },
  { slug: "dedicated-desk", label: "Dedicated Desk", icon: dedicatedNavIcon },
  { slug: "event-space", label: "Event Space", icon: eventNavIcon },
  { slug: "virtual-office", label: "Virtual Office", icon: virtualNavIcon },
  { slug: "podcast-studio", label: "Podcast Studio", icon: vectorNavIcon },
  { slug: "flexible-seating", label: "Flexible Seating" },
];

export const services: ServiceItem[] = [
  {
    slug: "day-pass",
    label: "Day Pass",
    shortLabel: "Day Pass",
    pdfTitle: "Day Pass",
    description:
      "A flexible workspace option for professionals who need a productive place to work for the day.",
    image: dayPassImage,
    galleryImage: dayPassCutImage,
    accent: "from-[#ff8a24] to-[#24316d]",
    features: ["Flexible access", "High-speed Internet", "Productive workspace", "Modern amenities"],
  },
  {
    slug: "meeting-room",
    label: "Meeting Room",
    shortLabel: "Meeting Room",
    pdfTitle: "Meeting Room / Conference Room",
    description:
      "Private meeting spaces for client presentations, planning sessions, and team workshops.",
    image: meetingRoomImage,
    galleryImage: meetingRoomCutImage,
    accent: "from-[#24316d] to-[#5d63d1]",
    features: ["Presentation screen", "Boardroom setup", "Whiteboard wall", "On-demand booking"],
  },
  {
    slug: "private-cabin",
    label: "Private Office",
    shortLabel: "Private Office",
    pdfTitle: "Private Office",
    description:
      "Private workspace options for teams and professionals who need a focused, professional environment.",
    image: privateCabinImage,
    galleryImage: privateCabinCutImage,
    accent: "from-[#ff8a24] to-[#3555ff]",
    features: ["Private workspace", "Professional environment", "Flexible arrangements", "Modern amenities"],
  },
  {
    slug: "coworking-space",
    label: "Coworking Space",
    shortLabel: "Coworking Space",
    pdfTitle: "Coworking Space",
    description:
      "Flexible workspaces for professionals, freelancers, startups and growing teams.",
    image: coworkingImage,
    galleryImage: coworkingCutImage,
    accent: "from-[#5d63d1] to-[#24316d]",
    features: ["Flexible seating", "High-speed Internet", "Professional environment", "Modern amenities"],
  },
  {
    slug: "managed-office",
    label: "Managed Office",
    shortLabel: "Managed Office",
    pdfTitle: "Managed Office",
    description:
      "Fully managed workspace solutions for businesses that want a ready-to-use professional office environment.",
    image: managedOfficeImage,
    galleryImage: managedOfficeCutImage,
    accent: "from-[#24316d] to-[#ff8a24]",
    features: ["Ready-to-use workspace", "Flexible arrangements", "Professional environment", "Modern amenities"],
  },
  {
    slug: "dedicated-desk",
    label: "Dedicated Desk",
    shortLabel: "Dedicated Desk",
    pdfTitle: "Dedicated Desk",
    description: "A reserved workspace for professionals who need a consistent place to work.",
    image: dedicatedDeskImage,
    galleryImage: dedicatedDeskCutImage,
    accent: "from-[#3555ff] to-[#5d63d1]",
    features: ["Reserved desk", "High-speed Internet", "Professional environment", "Modern amenities"],
  },
  {
    slug: "event-space",
    label: "Event Space",
    shortLabel: "Event Space",
    pdfTitle: "Event Space",
    description:
      "A flexible venue for networking events, launches, team offsites, and community gatherings.",
    image: eventSpaceImage,
    galleryImage: eventSpaceCutImage,
    accent: "from-[#ff8a24] to-[#3555ff]",
    features: ["Open lounge", "AV-friendly", "Event-friendly seating", "Brand activations"],
  },
  {
    slug: "virtual-office",
    label: "Virtual Office",
    shortLabel: "Virtual Office",
    pdfTitle: "Virtual Office",
    description:
      "Professional business presence and mailing support without the need for a full-time desk.",
    image: virtualOfficeImage,
    galleryImage: virtualOfficeCutImage,
    accent: "from-[#24316d] to-[#5d63d1]",
    features: ["Business address", "Mail handling", "Call support", "Flexible upgrades"],
  },
  {
    slug: "podcast-studio",
    label: "Podcast Studio",
    shortLabel: "Podcast Studio",
    pdfTitle: "Podcast Studio",
    description:
      "A quiet, production-ready room for recording conversations, interviews, and branded audio.",
    image: podcastImage,
    galleryImage: podcastCutImage,
    accent: "from-[#3555ff] to-[#ff8a24]",
    features: ["Recording setup", "Acoustic comfort", "Creator friendly", "Private sessions"],
  },
  {
    slug: "flexible-seating",
    label: "Flexible Seating",
    shortLabel: "Flexible Seating",
    pdfTitle: "Flexible Seating",
    description:
      "Flexible workspace options for professionals who need a productive place to work without a fixed long-term setup.",
    image: flexibleSeatingImage,
    galleryImage: flexibleSeatingCutImage,
    accent: "from-[#24316d] to-[#3555ff]",
    features: ["Drop-in seating", "Team flexibility", "Quiet corners", "Membership options"],
  },
];

export const servicesOverview = {
  title: "Services",
  subtitle: "Choose the space that fits the way you work.",
  description:
    "Swipe through the Kodesk service categories to explore focused work zones, meeting spaces, and flexible workspace options.",
  image: mainImage,
};

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
