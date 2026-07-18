export type {
  ServiceDetailContent,
  ServiceItem,
  ServiceNavItem,
  ServiceSlug,
} from "@/data/service/types";

export {
  getServiceBySlug,
  serviceNavItems,
  services,
  servicesOverview,
} from "@/data/service/service";

import type { ServiceDetailContent, ServiceSlug } from "@/data/service/types";
import { coworkingSpaceDetailContent } from "@/data/service/coworking-space";
import { dayPassDetailContent } from "@/data/service/day-pass";
import { dedicatedDeskDetailContent } from "@/data/service/dedicated-desk";
import { eventSpaceDetailContent } from "@/data/service/event-space";
import { flexibleSeatingDetailContent } from "@/data/service/flexible-seating";
import { managedOfficeDetailContent } from "@/data/service/managed-office";
import { meetingRoomDetailContent } from "@/data/service/meeting-room";
import { podcastStudioDetailContent } from "@/data/service/podcast-studio";
import { privateCabinDetailContent } from "@/data/service/private-cabin";
import { virtualOfficeDetailContent } from "@/data/service/virtual-office";

export const serviceDetailContent: Record<ServiceSlug, ServiceDetailContent> = {
  "day-pass": dayPassDetailContent,
  "meeting-room": meetingRoomDetailContent,
  "private-cabin": privateCabinDetailContent,
  "coworking-space": coworkingSpaceDetailContent,
  "managed-office": managedOfficeDetailContent,
  "dedicated-desk": dedicatedDeskDetailContent,
  "event-space": eventSpaceDetailContent,
  "virtual-office": virtualOfficeDetailContent,
  "podcast-studio": podcastStudioDetailContent,
  "flexible-seating": flexibleSeatingDetailContent,
};
