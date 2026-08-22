"use client";

import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/contact/main.png";
import mapImage from "@/assets/images/contact/map.png";
import callIcon from "@/assets/icons/contact/call.png";
import emailIcon from "@/assets/icons/contact/email.png";
import visitIcon from "@/assets/icons/contact/visit.png";
import workingIcon from "@/assets/icons/contact/working.png";
import { ArcMenu } from "@/components/ui/arcmenu";
import { services } from "@/data/service";
import keybenefitIcon from "@/assets/icons/services/keybenefits.svg";
import Community from "@/assets/images/about/Community.png"
import { business } from "@/lib/business";
import { useState } from "react";
import { usePublicCms } from "@/lib/cms/client";
import { resolvePublicContact } from "@/lib/cms/contact";

const contactCards = [
  {
    title: "Visit Us",
    description: business.address,
    icon: visitIcon,
  },
  {
    title: "Call Us",
    description: business.phone,
    descriptionAlt: "",
    icon: callIcon,
  },
  {
    title: "Email Us",
    description: business.email,
    icon: emailIcon,
  },
  {
    title: "Working Hours",
    description: business.receptionHours,
    icon: workingIcon,
  },
];

const reasons = [
  "Prime location in Baner, Pune",
  "High-speed internet",
  "Flexible workspace options",
  "Professional work environment",
  "Meeting facilities",
  "Modern amenities",
];

const contactFaqs = [
  { question: "Which workspace options are available at KODESK?", answer: "KODESK offers coworking space, dedicated desks, private offices, managed offices, meeting rooms, day passes and other flexible workspace options. Please contact our team for current availability." },
  { question: "Is KODESK a good fit for startups and freelancers?", answer: "Yes. Flexible workspace options are available for independent professionals, freelancers, startups and growing teams." },
  { question: "Is professional support available for managed office teams?", answer: "Reception support is available at KODESK. Please contact our team to confirm the support available for your managed office requirement." },
  { question: "Can a managed office be arranged around my team’s needs?", answer: "Please contact our team to discuss your team’s workspace requirements and the currently available managed office options." },
  { question: "What is the per-seat cost for a managed office?", answer: "Managed office pricing is based on current requirements and availability. Please contact our team for a quote." },
];

export default function ContactPage() {
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { settings } = usePublicCms();
  const contact = resolvePublicContact(settings);
  const hours = settings.business_hours?.reception ?? business.receptionHours;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setFormMessage("Sending your enquiry…");
    const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), email: data.get("email"), interestedIn: data.get("interest"), message: data.get("message") }) });
    const result = await response.json().catch(() => ({ error: "We could not send your enquiry." })) as { success?: boolean; error?: string };
    if (!response.ok || !result.success) { setFormMessage(result.error ?? "We could not send your enquiry. Please try again."); setSubmitting(false); return; }
    form.reset();
    setSubmitting(false);
    setFormMessage("Thank you. Your enquiry has been received.");
    window.setTimeout(() => setFormMessage(""), 4000);
  };

  return (
    <div>
      <section className="relative isolate overflow-hidden pt-2">
        <div className="absolute  inset-0 ">
          <Image
            src={heroImage}
            alt="Kodesk contact background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-ful max-w-6xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full  sm:px-12 sm:py-20">
            <p className="text-sm font-medium  text-white text-center sm:text-base lg:text-lg">
              Get In Touch
            </p>
            <h1 className="mt-8 text-4xl font-[var(--font-kodchasan)] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-tight max-w-9xl w-full text-center">
              Let&apos;s Find the Right Workspace for You
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#121E46] border border-white px-12 py-3 text-sm font-semibold text-white transition hover:bg-[#1e40af]"
              >
                Book a Free Tour
              </Link>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[12px] border-2 border-white/50 bg-transparent px-12 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
                      <div className="relative bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
                <ArcMenu />
              </div>

      </section>

      <section className="mx-auto w-full max-w-5xl px-12 py-16 sm:px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-4 ">
          {[...contactCards.slice(0, 1).map((card) => ({ ...card, description: contact.address })), { ...contactCards[1], description: contact.phone }, { ...contactCards[2], description: contact.email }, { ...contactCards[3], description: hours }].map((card) => (
            <article
              key={card.title}
              className="group rounded-[12px] border border-slate-200 bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-b hover:from-[#1b2c70] hover:to-[#152055] hover:shadow-[0_30px_60px_rgba(15,23,42,0.18)]"
            >
              <div className="flex mx-auto h-12 w-12 items-center justify-center rounded-2xl  transition duration-300 ease-out group-hover:bg-white">
                <Image src={card.icon} alt={card.title} className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-slate-900 text-center transition duration-300 ease-out group-hover:text-white">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 text-center transition duration-300 ease-out group-hover:text-slate-200">
                {card.description}
              </p>
              {card.descriptionAlt ? (
                <p className="mt-2 text-sm text-slate-500 text-center transition duration-300 ease-out group-hover:text-slate-300">
                  {card.descriptionAlt}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
            <p className="text-[25px]  ">Send Us a Message</p>
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Rahul Pradeep Despande"
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={contact.phone}
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={contact.email}
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Interested In
                </label>
                <select name="interest" className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10">
                  <option value="">Select a workspace</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your requirement"
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-[0.75rem] bg-[#1b2c70] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(20,43,119,0.28)] transition hover:bg-[#16245d]"
              >
                {submitting ? "Sending Enquiry…" : "Send Enquiry"}
              </button>
              {formMessage ? <p role="status" className={`text-center text-sm font-medium ${formMessage.startsWith("Thank") || formMessage.startsWith("Sending") ? "text-green-700" : "text-red-700"}`}>{formMessage}</p> : null}
            </form>
          </div>

          <div className="space-y-6">
            <Link
              href={business.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open KODESK Coworking Space in Google Maps"
              className="block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
            >
              <Image
                src={mapImage}
                alt="Kodesk location map"
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-[25px] ">Why Choose Kodesk?</p>
              <ul className="mt-6 space-y-4">
                {reasons.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span>
                      <Image src={keybenefitIcon} alt="Checkmark icon" />
                    </span>
                    <span className="text-sm leading-7 text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[25px]">Frequently Asked Questions</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">Helpful details about KODESK workspaces and managed office options.</p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {contactFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-[0.9rem] border border-slate-200 bg-white px-6 shadow-[0_10px_30px_rgba(10,16,40,0.06)]">
                <summary className="cursor-pointer list-none py-5 text-left text-base font-medium text-slate-900 marker:content-none">
                  <span className="flex items-center justify-between gap-4">{faq.question}<span className="text-xl text-[#1b2c70] transition group-open:rotate-45">+</span></span>
                </summary>
                <p className="border-t border-slate-100 py-5 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>

      <section className="relative isolate overflow-hidden py-24">
        {/* Background Image */}
        <Image
          src={Community}
          alt="Kodesk community"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8 z-10">
          <p className="text-[25px]  text-white ">Schedule a Tour Today</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
            Schedule a free tour and see the space for yourself.Our team is
            ready to help you get set up.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-[12px] bg-[#121E46] px-12 py-3 text-sm font-semibold text-white transition hover:bg-[#16245d]"
            >
              Book a Tour
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-[12px] border border-blue bg-white px-12 py-3 text-sm font-semibold text-[#103BC9] transition hover:bg-white/15"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
