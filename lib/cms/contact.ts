import { business } from "@/lib/business";
import type { SiteSettings } from "@/lib/cms/types";

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+${digits}` : business.phoneHref;
}

export function whatsappHref(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const url = `https://wa.me/${digits || "919359805818"}`;
  return message.trim() ? `${url}?text=${encodeURIComponent(message.trim())}` : url;
}

export function resolvePublicContact(settings: SiteSettings) {
  const configured = settings.contact_information ?? {};
  const phone = configured.phone?.trim() || business.phone;
  const email = configured.email?.trim() || business.email;
  const address = configured.address?.trim() || business.address;
  const whatsappNumber = configured.whatsapp_number?.trim() || phone;
  const whatsappMessage = configured.whatsapp_message?.trim() || "Hello KODESK, I would like to know more about your coworking space and managed office options.";
  return { phone, email, address, phoneHref: phoneHref(phone), emailHref: `mailto:${email}`, whatsappNumber, whatsappMessage, whatsappHref: whatsappHref(whatsappNumber, whatsappMessage) };
}
