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

const contactCards = [
  {
    title: "Visit Us",
    description: "KODESK Coworking Space — Baner, Pune",
    icon: visitIcon,
  },
  {
    title: "Call Us",
    description: "+1 (555) 123-4567",
    descriptionAlt: "+1 (555) 123-4567",
    icon: callIcon,
  },
  {
    title: "Email Us",
    description: "hello@kodesk.com",
    descriptionAlt: "support@kodesk.com",
    icon: emailIcon,
  },
  {
    title: "Working Hours",
    description: "Mon - Sat / 8:00 AM - 8:00 PM",
    icon: workingIcon,
  },
];

const reasons = [
  "Premium locations in business districts",
  "24/7 secure access",
  "World-class amenities",
  "Vibrant professional community",
  "Flexible membership plans",
  "Dedicated support team",
];

export default function ContactPage() {
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
              We’d love to hear from you. Let’s discuss your workspace needs.
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#121E46] border border-white px-12 py-3 text-sm font-semibold text-white transition hover:bg-[#1e40af]"
              >
                Get Started — Book a Tour
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[12px] border-2 border-white/50 bg-transparent px-12 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Memberships
              </Link>
            </div>
          </div>

        </div>
                      <div className="relative bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
                <ArcMenu />
              </div>

      </section>

      <section className="mx-auto w-full max-w-5xl px-12 py-16 sm:px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-4 ">
          {contactCards.map((card) => (
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
            <form className="mt-10 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Rahul Pradeep Despande"
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="hello@kodesk.com"
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Services
                </label>
                <select className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10">
                  <option value="">Select Services</option>
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
                  rows={5}
                  placeholder="Tell us about your requirement"
                  className="mt-2 w-full rounded-[0.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1b2c70] focus:ring-2 focus:ring-[#1b2c70]/10"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-[0.75rem] bg-[#1b2c70] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(20,43,119,0.28)] transition hover:bg-[#16245d]"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <Link
              href="https://maps.google.com/?q=KODESK+Coworking+Space+Baner+Pune"
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
