import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/data/service";
import { serviceDetailContent, services } from "@/data/service";
import communityImage from "@/assets/images/about/Community.png";
import { ArcMenu } from "@/components/ui/arcmenu";
import { ServiceShowcaseCard } from "@/components/shared/ServiceShowcaseCard";
import keybenefits from "@/assets/icons/services/keybenefits.svg";



export function ServiceDetail({ service }: { service: ServiceItem }) {
  const content = serviceDetailContent[service.slug];

  const related = content.relatedSlugs
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is ServiceItem => Boolean(item));

  return (
    <div className="bg-[#f5f3ee]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(79,119,255,0.34),transparent_34%),radial-gradient(circle_at_86%_34%,rgba(255,161,63,0.28),transparent_26%),linear-gradient(90deg,rgba(16,27,74,0.62)_0%,rgba(56,94,212,0.18)_42%,rgba(255,145,41,0.42)_100%)]" />
          <div className="absolute inset-0 bg-black/8" />
        </div>

        <div className="relative mx-auto min-h-[560px] max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:min-h-[680px] lg:px-8 lg:pt-32">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-medium text-white/88">Kodesk Service</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)] sm:text-6xl lg:text-[4.6rem]">
              {service.pdfTitle}
            </h1>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-8 text-white/84 sm:text-[1.05rem]">
              {content.heroDescription}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-[0.8rem] border border-white/35 bg-[#152153]/80 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(10,16,40,0.18)] transition hover:bg-[#152153]"
            >
              Get Started - Book a Tour
            </Link>
          </div>
          <ArcMenu />
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <article>
              <p className="text-lg font-medium ">Service Overview</p>
              <h2 className="mt-8 text-2xl font-medium tracking-tight text-slate-900 sm:text-[1.7rem]">
                {content.overviewTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 ">
                {content.overviewBody}
              </p>

              <div className="mt-9">
                <h3 className="text-lg font-medium ">Key Benefits</h3>
                <ul className="mt-5 space-y-4">
                  {content.benefits.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3  leading-7 t"
                    >
                      <Image src={keybenefits} alt="checkmark" />
                      <span>{item}</span>
                    </div>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="lg:pt-2 ">
              <div className="gradient-card relative overflow-hidden rounded-[18px] mx-18 h-[520px] text-white sm:p-10">
                {/* Content */}
                <h3 className="relative z-10 text-xl font-semibold tracking-tight">
                  {content.audienceTitle}
                </h3>

                <ul className="relative z-10 mt-8 space-y-5 text-[1rem] leading-relaxed text-white/90">
                  {content.audience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="relative z-10 mt-10 mx-auto flex w-fit px-18  items-center justify-center rounded-xl border border-white/30 bg-white/10  py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Enquire Now
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[rgba(229,229,229,1)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-medium bg-[linear-gradient(90deg,#2947AA_0%,#FC7B1B_100%)] bg-clip-text text-transparent inline-block">
            What's Included
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-slate-900 sm:text-[2.1rem]">
            Features & Inclusions
          </h2>
          <div className="mt-15 grid gap-8 mx-15 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((item) => (
              <article
                key={item.title}
                className="rounded-[1rem] border border-white/70 bg-white px-2 py-8  text-slate-900 shadow-[0_12px_30px_rgba(10,16,40,0.05)]"
              >
                <h3 className="text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <div className="mx-auto mt-3 h-px w-62 bg-gradient-to-r   from-[#FC7B1B] to-[#2947AA]" />
                <p className="mx-auto mt-5 max-w-[25ch] text-md leading-7 text-slate-500">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={communityImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative px-4 py-14 text-center text-white sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-light tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)] sm:text-[2.15rem]">
            {content.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            {content.ctaBody}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-[0.6rem] bg-[#18265c] px-8 py-3 text-sm font-medium text-white shadow-[0_10px_18px_rgba(12,18,42,0.22)] transition hover:bg-[#111c48]"
            >
              Book a Tour
            </Link>
            <Link
              href="/pricing"
              className="rounded-[0.6rem] border border-white/70 bg-white px-8 py-3 text-sm font-medium text-[#18265c] shadow-[0_10px_18px_rgba(12,18,42,0.14)] transition hover:bg-white/92"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-lg font-medium bg-[linear-gradient(90deg,#2947AA_0%,#FC7B1B_100%)] bg-clip-text text-transparent inline-block">
              Explore More
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-slate-900 sm:text-[2.05rem]">
              Other Services You May Like
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ServiceShowcaseCard
                key={item.slug}
                service={{ ...item, title: item.label }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
