"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Run layout effects after hydration on the client, but fall back to a normal
// effect during SSR so React doesn't warn.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import heroImage from "@/assets/images/hero.png";
import aboutImage from "@/assets/images/about/main.png";
import aboutheroImage from "@/assets/images/about/abouthero.png";
import coworkingImg from "@/assets/images/Services/Coworking.png";
import managedImg from "@/assets/images/Services/ManageOffice.png";
import meetingImg from "@/assets/images/Services/MeetingRoom.png";
import dayPassImg from "@/assets/images/Services/DayPass.png";
import eventImg from "@/assets/images/Services/EventSpace.png";
import dedicatedImg from "@/assets/images/Services/DedicatedDesk.png";
import coworkingCutImg from "@/assets/images/Services/cut/Coworking.png";
import managedCutImg from "@/assets/images/Services/cut/Managed.png";
import flexibleCutImg from "@/assets/images/Services/cut/Flexible Sitting.png";
import { priceLabel, usePublicCms } from "@/lib/cms/client";
import { resolvePublicContact } from "@/lib/cms/contact";
const homeServices = [
  {
    title: "Coworking Space",
    description: "Flexible workspaces for professionals, freelancers, startups and growing teams.",
    galleryImage: coworkingCutImg,
    href: "/services/coworking-space",
    bubbleClass: "bg-[#ff8a24]",
  },
  {
    title: "Managed Office",
    description: "Fully managed workspace solutions for businesses that want a ready-to-use professional office environment.",
    galleryImage: managedCutImg,
    href: "/services/managed-office",
    bubbleClass: "bg-[#1f2d62]",
  },
  {
    title: "Flexible Seating",
    description: "Flexible workspace options for professionals who need a productive place to work without a fixed long-term setup.",
    galleryImage: flexibleCutImg,
    href: "/services/flexible-seating",
    bubbleClass: "bg-[#ff8a24]",
  },
];

const galleryImages = [
  { src: coworkingImg, alt: "KODESK coworking space in Baner Pune" },
  { src: meetingImg, alt: "KODESK meeting room in Baner" },
  { src: dayPassImg, alt: "KODESK coworking day pass workspace" },
  { src: managedImg, alt: "KODESK managed office in Baner" },
  { src: dedicatedImg, alt: "KODESK dedicated desk" },
  { src: eventImg, alt: "KODESK event space" },
];

const amenities = [
  {
    label: "High-speed internet",
    title: "Ultra-fast fiber internet",
    description: "Gigabit connectivity ensures seamless collaboration and fast file transfers.",
    icon: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
  },
  {
    label: "Parking",
    title: "Secure Parking Space",
    description: "Dedicated, well-lit parking bays for members and guests right at your doorstep.",
    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
  {
    label: "Power Backup",
    title: "24/7 Power Backup",
    description: "Uninterrupted power supply keeps your team productive through any outage.",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    label: "Security",
    title: "Round-the-clock Security",
    description: "CCTV surveillance and keycard access keep your workspace safe at all hours.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  {
    label: "Reception Support",
    title: "Dedicated Reception",
    description: "A professional front desk to greet your guests and handle your visitors.",
    icon: "M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    label: "Cafeteria",
    title: "In-house Cafeteria",
    description: "Freshly brewed coffee, snacks, and meals to keep you energised all day.",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  },
  {
    label: "Air Conditioning",
    title: "Climate Controlled",
    description: "Fully air-conditioned floors maintain the perfect working temperature.",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  },
  {
    label: "Printing Services",
    title: "Printing & Scanning",
    description: "High-volume printers, scanners, and copiers available whenever you need them.",
    icon: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z",
  },
];

const faqs = [
  {
    q: "What is included in the coworking package?",
    a: "Coworking includes a professional workspace and access to confirmed on-site amenities. Please contact our team for current package details.",
  },
  {
    q: "Do you offer a day pass?",
    a: "Yes. A KODESK day pass is ₹599 per day, subject to availability.",
  },
  {
    q: "What is the price of a dedicated desk?",
    a: "A dedicated desk is ₹7,499 per month. Please contact our team to check availability.",
  },
  {
    q: "What are the reception hours?",
    a: "Reception is open Monday to Saturday, 8:00 AM to 8:00 PM.",
  },
];

// Testimonials remain empty until verified member feedback is approved for publication.
const testimonials: { name: string; role: string; rating: number; quote: string }[] = [];

const serviceStrip = [
  { label: "Coworking Space", slug: "coworking-space" },
  { label: "Dedicated Desk", slug: "dedicated-desk" },
  { label: "Private Office", slug: "private-cabin" },
  { label: "Managed Office", slug: "managed-office" },
  { label: "Flexible Seating", slug: "flexible-seating" },
  { label: "Meeting Room", slug: "meeting-room" },
  { label: "Event Space", slug: "event-space" },
  { label: "Day Pass", slug: "day-pass" },
  { label: "Virtual Office", slug: "virtual-office" },
  { label: "Podcast Studio", slug: "podcast-studio" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeAmenity, setActiveAmenity] = useState(0);
  const [tourMessage, setTourMessage] = useState("");
  const [sendingTour, setSendingTour] = useState(false);
  const { pricing, media, settings } = usePublicCms();
  const contact = resolvePublicContact(settings);
  const rootRef = useRef<HTMLDivElement>(null);

  const submitTour = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSendingTour(true);
    setTourMessage("Sending your enquiry…");
    const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), email: data.get("email"), interestedIn: data.get("workspace"), message: "Free tour request from the KODESK homepage." }) });
    const result = await response.json().catch(() => ({ error: "We could not send your enquiry." })) as { success?: boolean; error?: string };
    setSendingTour(false);
    if (!response.ok || !result.success) { setTourMessage(result.error ?? "We could not send your enquiry. Please try again."); return; }
    form.reset();
    setTourMessage("Thank you! Your enquiry has been sent. Our KODESK team will contact you shortly.");
    window.setTimeout(() => setTourMessage(""), 2000);
  };

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Respect users who prefer reduced motion — show everything, no animation.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // ── Hero: smooth entrance on first paint (above the fold) ──
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.16,
            delay: 0.15,
          }
        );
      }

      // ── Scroll reveals (bidirectional) ──
      // Each element animates when IT (not its section) enters the viewport, so
      // content low in tall sections still animates as you reach it. `batch`
      // groups elements that enter together (e.g. a row of cards) and staggers
      // them for a polished, professional cascade. The reveal replays every time
      // an element enters view — whether you scroll down or back up.
      const fadeEls = gsap.utils.toArray<HTMLElement>("[data-fade]");
      gsap.set(fadeEls, { y: 48, autoAlpha: 0 });

      const reveal = (batch: Element[]) =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true,
        });

      const hide = (batch: Element[]) =>
        gsap.to(batch, {
          y: 48,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.in",
          overwrite: true,
        });

      ScrollTrigger.batch(fadeEls, {
        start: "top 88%",
        end: "bottom 12%",
        // Entering from below (scroll down) or from above (scroll up) → animate in.
        onEnter: reveal,
        onEnterBack: reveal,
        // Leaving the viewport in either direction → reset so it animates again.
        onLeave: hide,
        onLeaveBack: hide,
      });

      // ── Stat counters (e.g. "08+", "145") tick up from 0 when in view ──
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix ?? "";
        const pad = Number(el.dataset.pad) || 0;
        const counter = { value: 0 };

        const render = () => {
          el.textContent =
            String(Math.round(counter.value)).padStart(pad, "0") + suffix;
        };

        const countUp = () =>
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: render,
            overwrite: true,
          });

        const resetCount = () => {
          gsap.killTweensOf(counter);
          counter.value = 0;
          render();
        };

        render(); // start at zero before it enters view

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          end: "bottom 12%",
          onEnter: countUp,
          onEnterBack: countUp,
          onLeave: resetCount,
          onLeaveBack: resetCount,
        });
      });

      // Reveal anything already in view on load, then recalc trigger positions
      // once images/fonts have settled so start points are accurate.
      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-[#f2f2ef]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }) }} />

      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.find((item) => item.category === "hero")?.public_url || heroImage.src}
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: "50% 80%" }}
        >
          <source src="/media/kodesk-intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/40 to-black/70" />

        {/* Hero text */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:py-28">
          <p data-hero-item className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/55 sm:text-[0.7rem] sm:tracking-[0.4em]">
            Achieving Success Together
          </p>
          <h1 data-hero-item className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium Coworking Space in Baner, Pune
          </h1>
          <h2 data-hero-item className="mt-2 text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-[#F28C28]">Flexible Workspaces</span>
            <span className="text-white"> Designed for Productivity</span>
          </h2>
        </div>

        {/* Booking bar */}
        <div className="px-4 pb-10 sm:pb-12">
          <div className="mx-auto max-w-5xl">
            <form onSubmit={submitTour} data-hero-item className="grid grid-cols-1 gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:grid-cols-2 lg:flex lg:items-center">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20 focus:outline-none transition"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone / WhatsApp"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20 focus:outline-none transition"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/20 focus:outline-none transition"
              />
              <select name="workspace" required defaultValue="" className="min-w-0 flex-1 appearance-none rounded-xl border border-[#f2c18e]/70 bg-[#182553]/80 px-4 py-3 text-sm font-medium text-white shadow-inner outline-none transition focus:border-[#f6ae59] focus:ring-2 focus:ring-[#f6ae59]/35">
                <option value="" disabled className="bg-[#182553] text-white/70">Workspace Required</option>
                {homeServices.map((service) => <option key={service.title} value={service.title} className="bg-[#182553] text-white">{service.title}</option>)}
                <option value="Dedicated Desk" className="bg-[#182553] text-white">Dedicated Desk</option>
                <option value="Private Office" className="bg-[#182553] text-white">Private Office</option>
                <option value="Day Pass" className="bg-[#182553] text-white">Day Pass</option>
                <option value="Other" className="bg-[#182553] text-white">Other / Not sure yet</option>
              </select>
              <button type="submit" disabled={sendingTour} className="shrink-0 rounded-xl bg-[#141f49] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1c2d63] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 lg:col-span-1">
                {sendingTour ? "Sending…" : "Book a Free Tour"}
              </button>
              {tourMessage ? <p role="status" className={`sm:col-span-2 lg:col-span-5 text-center text-sm font-medium ${tourMessage.startsWith("Thank") || tourMessage.startsWith("Sending") ? "text-emerald-200" : "text-rose-200"}`}>{tourMessage}</p> : null}
            </form>
          </div>
        </div>
      </section>

      {/* ── Service Strip — swipeable on phones, marquee on larger screens ── */}
      <div
        className="py-4"
        style={{ background: "linear-gradient(90deg, #121E46 0%, #3651AD 100%)" }}
      >
        <div className="flex touch-pan-x snap-x snap-mandatory overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {serviceStrip.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="flex shrink-0 snap-start items-center whitespace-nowrap px-5 text-sm font-medium text-white/85 transition active:text-white"
            >
              <span className="mr-4 select-none text-white/30">✦</span>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden overflow-hidden md:block">
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}
          >
            {[...serviceStrip, ...serviceStrip].map((item, i) => (
              <Link
                key={i}
                href={`/services/${item.slug}`}
                className="flex shrink-0 items-center whitespace-nowrap px-6 text-sm font-medium text-white/75 transition hover:text-white"
              >
                <span className="mr-5 select-none text-white/30">✦</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Our Services ── */}
      <section data-animate className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div data-fade className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Workspace Solutions for Every Stage of Your Business</h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            From flexible day passes to private offices and managed workspaces, choose a workspace that fits the way you work.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 pb-6 sm:gap-7 md:grid-cols-3 lg:gap-8">
          {homeServices.map((svc) => (
            <Link
              key={svc.title}
              data-fade
              href={svc.href}
              className="group flex flex-col rounded-[1.5rem] bg-white p-5 shadow-[0_4px_24px_rgba(10,16,40,0.07)] transition hover:shadow-[0_8px_40px_rgba(10,16,40,0.13)] sm:p-6"
            >
              {/* Text top */}
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{svc.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{svc.description}</p>

              {/* Image with notch + arrow */}
              <div className="relative mt-5 sm:mt-6">
                <div className="relative h-44 overflow-hidden rounded-[1.2rem] sm:h-48 lg:h-52">
                  <Image
                    src={svc.galleryImage}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                {/* White concave notch carved into bottom-right corner */}
                <div
                  className="absolute bottom-0 right-0 h-14 w-14 bg-white"
                  style={{ borderTopLeftRadius: "1.2rem" }}
                />
                {/* Arrow button */}
                <span
                  className={`absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_8px_18px_rgba(15,23,42,0.25)] transition group-hover:scale-105 sm:h-12 sm:w-12 ${svc.bubbleClass}`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={1.9}>
                    <path d="M7 17L17 7" strokeLinecap="round" />
                    <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div data-fade className="mt-10 text-center sm:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-[#141f49] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1c2d63] sm:px-8"
          >
            View All Services
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── About ── */}
      {/* About Section */}

      <section data-animate className="bg-[#f3f3f3] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div data-fade className="text-center">
            <h2 className="text-3xl font-medium text-black sm:text-4xl lg:text-[42px]">About KODESK</h2>
            <p className="mt-3 text-base text-black/70">Flexible workspace solutions in Baner, Pune.</p>
          </div>

          <div className="mt-12 grid items-center gap-14 sm:mt-16 lg:grid-cols-2">

            {/* Left */}

            <div>

              <h3 data-fade className="max-w-[620px] text-2xl font-medium leading-[1.2] text-black sm:text-3xl lg:text-[40px]">
                A Better Place to Work, Connect and Grow
              </h3>

              <p data-fade className="mt-6 max-w-[620px] text-base leading-8 text-black/75 sm:mt-8">
                KODESK provides flexible workspace solutions in Baner, Pune for freelancers, professionals, startups and growing businesses. From coworking and dedicated desks to private offices and managed workspaces, KODESK provides the infrastructure and flexibility businesses need to work efficiently.
              </p>


              <div className="mt-10 space-y-5">

                {[
                  "Prime location in Baner, Pune",
                  "High-speed internet",
                  "Flexible workspace options",
                  "Professional work environment",
                  "Meeting facilities",
                  "Modern amenities"
                ].map((item) => (

                  <div key={item} data-fade className="flex items-center gap-4">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff8426]">

                      <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                    </div>

                    <span className="text-[18px] text-black/85">
                      {item}
                    </span>

                  </div>

                ))}

              </div>



              <Link
                href="/about"
                data-fade
                className="mt-12 inline-flex items-center rounded-md bg-[#13204b] px-9 py-4 text-[17px] text-white transition hover:bg-[#20316c]"
              >
                Learn More About Us
              </Link>

            </div>



            {/* Right */}

            <div className="flex justify-center lg:justify-end">

              <div className="relative w-full max-w-[540px]">

                <Image
                  src={aboutheroImage}
                  alt=""
                  width={540}
                  height={640}
                  sizes="(max-width: 1024px) 100vw, 540px"
                  data-fade
                  className="h-auto w-full rounded-[10px] object-cover"
                  style={{ width: "100%", height: "auto" }}
                />


                {/* Stats */}

                <div className="mt-6 grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-md lg:mt-0 lg:max-w-none lg:grid-cols-1 lg:gap-[18px] lg:absolute lg:-left-40 lg:top-[285px]">


                  <div data-fade className="rounded-[10px] bg-gradient-to-r from-[#2147FF] to-[#F47A2A] px-6 py-5 shadow-xl sm:px-8 lg:w-[220px]">

                    <h3
                      data-count="8"
                      data-suffix="+"
                      data-pad="2"
                      className="text-3xl font-medium leading-none text-white sm:text-4xl lg:text-[44px]"
                    >
                      —
                    </h3>

                    <p className="mt-1 text-base text-white sm:text-[17px]">
                      Details available on request
                    </p>

                  </div>



                  <div data-fade className="rounded-[10px] bg-gradient-to-r from-[#2147FF] to-[#F47A2A] px-6 py-5 shadow-xl sm:px-8 lg:ml-20 lg:w-[220px]">

                    <h3
                      data-count="145"
                      className="text-3xl font-medium leading-none text-white sm:text-4xl lg:text-[44px]"
                    >
                      —
                    </h3>

                    <p className="mt-1 text-base text-white sm:text-[17px]">
                      Details available on request
                    </p>

                  </div>

                </div>


              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── Our Spaces (Gallery) ── */}
      <section data-animate className="bg-[#141f49] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-fade className="text-center">
            <h2 className="text-3xl font-bold text-white">Find the Workspace That Fits You</h2>
            <p className="mt-3 text-sm text-white/60">
              Explore flexible spaces designed for focused work, productive meetings and growing teams.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div key={i} data-fade className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div data-fade className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── World Class Amenities ── */}
      <section data-animate className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div data-fade className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">World-Class Amenities</h2>
          <p className="mt-3 text-sm text-slate-500">
            Everything you need to stay productive and comfortable throughout your workday.
          </p>
        </div>
        {/* Mobile / small tablet — stacked cards */}
        <div data-fade className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {amenities.map((amenity, i) => (
            <div
              key={amenity.label}
              className="relative overflow-hidden rounded-[1.5rem] p-6 text-white"
              style={{ background: "linear-gradient(180deg, #F7841E 0%, #8E54A8 52%, #1B3CFF 100%)" }}
            >
              <span className="text-xl font-medium text-white/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold leading-snug">{amenity.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/85">{amenity.description}</p>
              <svg
                viewBox="0 0 24 24"
                className="mt-5 h-14 w-14 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
              >
                <path d={amenity.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>

        {/* Tablet & desktop — horizontal accordion */}
        <div data-fade className="mt-12 hidden h-[440px] gap-3 md:flex">
          {amenities.map((amenity, i) => {
            const active = i === activeAmenity;
            return (
              <div
                key={amenity.label}
                onMouseEnter={() => setActiveAmenity(i)}
                onClick={() => setActiveAmenity(i)}
                className={`relative cursor-pointer overflow-hidden rounded-[1.5rem] transition-[flex-grow] duration-500 ease-in-out ${active
                  ? "flex-[6] text-white"
                  : "flex-[1] bg-[#ececec] hover:bg-[#e4e4e4]"
                  }`}
                style={
                  active
                    ? { background: "linear-gradient(180deg, #F7841E 0%, #8E54A8 52%, #1B3CFF 100%)" }
                    : undefined
                }
              >
                {/* Number — top-left */}
                <span
                  className={`absolute left-5 top-5 text-2xl font-medium tracking-tight ${active ? "text-white" : "text-slate-800"
                    }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Expanded content */}
                <div
                  className={`absolute inset-0 flex flex-col px-8 pt-20 transition-opacity duration-300 ${active ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
                    }`}
                >
                  <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">{amenity.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/85">
                    {amenity.description}
                  </p>
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-10 h-20 w-20 text-white sm:h-24 sm:w-24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                  >
                    <path d={amenity.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Vertical label — bottom-left */}
                <span
                  className={`absolute bottom-5 left-5 whitespace-nowrap text-sm font-medium [writing-mode:vertical-rl] rotate-180 ${active ? "text-white/90" : "text-slate-700"
                    }`}
                >
                  {amenity.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Workspace Plans ── */}
      <section data-animate className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div data-fade className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Workspace Plans</h2>
          <p className="mt-3 text-sm text-slate-500">
            Flexible workspace options designed around the way you work.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* Card 1 — New Member */}
          <div data-fade className="flex flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-slate-400">New Member</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Dedicated Desk</h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              A reserved workspace designed for professionals who need consistency, productivity, and a dedicated business setup.
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-600">
              {priceLabel(pricing, "dedicated_desk", "₹7,499 / month")}
            </p>
            <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-widest text-slate-400">Features</p>
            <ul className="mt-3 flex-1 space-y-2">
              {["Personal dedicated desk", "Storage locker", "Meeting room credits", "Printing services", "24/7 workspace access", "Business address usage"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-[#2453f5]">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/contact" className="w-full rounded-xl border border-slate-300 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-[#2453f5] hover:text-[#2453f5]">
                Check Availability
              </Link>
            </div>
          </div>

          {/* Card 2 — Popular / Enterprise */}
          <div data-fade className="relative flex flex-col rounded-[1.75rem] bg-[#141f49] p-6 shadow-[0_20px_60px_rgba(13,18,39,0.25)] sm:p-8">
            <span className="absolute right-6 top-6 rounded-full bg-[#F28C28] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
              Popular
            </span>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/50">Enterprise</p>
            <h3 className="mt-3 text-xl font-bold text-white">Managed Office</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Custom office solutions for growing enterprises requiring scalable infrastructure and premium business facilities.
            </p>
            <p className="mt-6 text-sm font-semibold text-white/80">{priceLabel(pricing, "managed_office", "Request a Quote")}</p>
            <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-widest text-white/40">Features</p>
            <ul className="mt-3 flex-1 space-y-2">
              {["Custom office setup", "Dedicated support team", "Branding options", "Conference room access", "IT infrastructure", "Premium lounge access"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-[#F28C28]">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/contact" className="flex-1 rounded-xl border border-white/20 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                Request a Quote
              </Link>
              {/* <Link href="/contact" className="flex-1 rounded-xl bg-[#F28C28] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#e07d20]">
                Request Proposal
              </Link> */}
            </div>
          </div>

          {/* Card 3 — Private Cabin */}
          <div data-fade className="flex flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-slate-400">Exclusive</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Private Office</h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Premium fully furnished private cabins for startups and teams needing privacy, comfort, and a professional environment.
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-600">
              {priceLabel(pricing, "private_office", "Request Pricing")}
            </p>
            <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-widest text-slate-400">Features</p>
            <ul className="mt-3 flex-1 space-y-2">
              {["Fully private cabin", "Team seating setup", "Premium interiors", "Air conditioning", "Reception support", "Housekeeping services"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-[#2453f5]">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/contact" className="w-full rounded-xl border border-slate-300 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-[#2453f5] hover:text-[#2453f5]">
                Request Pricing
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 ? (
      <section data-animate className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div data-fade className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">What Our Members Say</h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Hear from professionals and businesses working from KODESK.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-fade
              className="flex flex-col rounded-[1.25rem] p-8 shadow-[0_18px_50px_rgba(10,16,40,0.18)] sm:p-10"
              style={{ background: "linear-gradient(160deg, #131f4a 0%, #1c2c63 55%, #2f47a3 100%)" }}
            >
              {/* Avatar */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-lg font-semibold text-white ring-2 ring-white/20">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Stars */}
              <div className="mt-6 flex gap-1 text-xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < t.rating ? "text-[#F5C518]" : "text-white/25"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Name + role */}
              <p className="mt-5 text-lg font-semibold text-white">{t.name}</p>
              <p className="mt-1 text-sm text-white/55">{t.role}</p>

              {/* Quote */}
              <p className="mt-6 text-sm leading-7 text-white/85">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
      ) : null}

      {/* ── FAQ ── */}
      <section data-animate className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div data-fade className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Everything you need to know about working at Kodesk. Can't find your answer? Reach out to our team.
          </p>
        </div>
        <div className="mt-14 space-y-5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              data-fade
              className="overflow-hidden rounded-[0.9rem] shadow-[0_10px_30px_rgba(10,16,40,0.12)]"
              style={{ background: "linear-gradient(90deg, #0f1a40 0%, #1c2c63 55%, #34499d 100%)" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-7 py-6 text-left"
              >
                <span className="text-base font-medium text-white sm:text-lg">{faq.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`ml-4 h-5 w-5 shrink-0 text-white transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-7 pb-6 text-sm leading-7 text-white/80">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Get in Touch ── */}
      <section data-animate className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 data-fade className="text-3xl font-bold text-slate-900 sm:text-4xl">Get in touch</h2>
        <p data-fade className="mt-3 text-sm text-slate-500 sm:text-base">
          We're here to answer your questions and help you find the right workspace.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">

          {/* Left — contact details */}
          <div data-fade className="space-y-10">

            {/* Email */}
            <div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-bold text-slate-900">Email</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">Send us a message</p>
              <a href={contact.emailHref} className="mt-2 block text-sm font-medium text-[#2453f5] hover:underline">
                {contact.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-bold text-slate-900">Phone</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">Call us directly</p>
              <a href={contact.phoneHref} className="mt-2 block text-sm font-medium text-[#2453f5] hover:underline">
                {contact.phone}
              </a>
            </div>

            {/* Office */}
            <div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-bold text-slate-900">Office</span>
              </div>
              <a
                href="https://maps.google.com/?q=KODESK+Coworking+Space+Baner+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block max-w-xs text-sm font-medium text-[#2453f5] hover:underline"
              >
                Vasukamal Express, behind Beverly Hills Society, Samarth Colony, Baner, Pune, Maharashtra
              </a>
              <a
                href="https://maps.google.com/?q=KODESK+Coworking+Space+Baner+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-[#2453f5]"
              >
                View location
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — map */}
          <div data-fade className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="Kodesk Coworking Space location"
              src="https://www.google.com/maps?q=KODESK+Coworking+Space+Baner+Pune&output=embed"
              className="h-[420px] w-full lg:h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
