import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/data/service";
import { serviceDetailContent, services } from "@/data/service";
import communityImage from "@/assets/images/about/Community.png";
import { ArcMenu } from "@/components/ui/arcmenu";
import { ServiceShowcaseCard } from "@/components/shared/ServiceShowcaseCard";
import keybenefits from "@/assets/icons/services/keybenefits.svg";
import { siteUrl } from "@/lib/seo";
import type { ServicePageDetail } from "@/lib/cms/types";



export function ServiceDetail({ service, heading, heroDescription, detail }: { service: ServiceItem; heading?: string; heroDescription?: string; detail?: ServicePageDetail }) {
  const content = serviceDetailContent[service.slug];
  const pageTitle = detail?.hero_title || heading || service.pdfTitle;
  const ctaHref = detail?.cta_url || "/contact";
  const benefits = detail?.benefits?.length ? detail.benefits : content.benefits;
  const audience = detail?.audience?.length ? detail.audience : content.audience;
  const features = detail?.features?.length ? detail.features : content.features;
  const faqs = detail?.faq_items?.filter((item) => item.question.trim() && item.answer.trim()) ?? [];

  const related = content.relatedSlugs
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is ServiceItem => Boolean(item));

  return (
    <div className="bg-[#f5f3ee]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` }, { "@type": "ListItem", position: 3, name: pageTitle }] }) }} />
      {faqs.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} /> : null}
      <section data-cms-section={`service.detail:${service.slug}`} className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          {detail?.hero_image_url ? <img src={detail.hero_image_url} alt={`${service.label} at KODESK Coworking Space in Baner, Pune`} className="h-full w-full object-cover object-center" /> : <Image src={service.image} alt={`${service.label} at KODESK Coworking Space in Baner, Pune`} fill priority sizes="100vw" className="object-cover object-center" />}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgba(79,119,255,0.34),transparent_34%),radial-gradient(circle_at_86%_34%,rgba(255,161,63,0.28),transparent_26%),linear-gradient(90deg,rgba(16,27,74,0.62)_0%,rgba(56,94,212,0.18)_42%,rgba(255,145,41,0.42)_100%)]" />
          <div className="absolute inset-0 bg-black/8" />
        </div>

        <div className="relative mx-auto min-h-[560px] max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:min-h-[680px] lg:px-8 lg:pt-32">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-medium text-white/88">{detail?.subtitle || "KODESK Service"}</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)] sm:text-6xl lg:text-[4.6rem]">
              {pageTitle}
            </h1>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-8 text-white/84 sm:text-[1.05rem]">
              {detail?.hero_description || heroDescription || content.heroDescription}
            </p>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex rounded-[0.8rem] border border-white/35 bg-[#152153]/80 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(10,16,40,0.18)] transition hover:bg-[#152153]"
            >
              {detail?.cta_label || "Book a Free Tour"}
            </Link>
          </div>
          <ArcMenu />
        </div>
      </section>

      <section data-cms-section={`service.overview:${service.slug}`} className="bg-[#fbfaf7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <article>
              <p className="text-lg font-medium ">Service Overview</p>
              <h2 className="mt-8 text-2xl font-medium tracking-tight text-slate-900 sm:text-[1.7rem]">
                {detail?.overview_title || content.overviewTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 ">
                {detail?.overview_body || content.overviewBody}
              </p>

              <div className="mt-9">
                <h3 className="text-lg font-medium ">Key Benefits</h3>
                <ul className="mt-5 space-y-4">
                  {benefits.map((item) => (
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

            <aside className="lg:pt-2">
              <div className="gradient-card relative min-h-[420px] overflow-hidden rounded-[18px] p-6 text-white sm:min-h-0 sm:h-[520px] sm:p-10">
                {/* Content */}
                <h3 className="relative z-10 text-xl font-semibold tracking-tight">
                  {detail?.audience_title || content.audienceTitle}
                </h3>

                <ul className="relative z-10 mt-8 space-y-5 text-[1rem] leading-relaxed text-white/90">
                  {audience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link
                  href={ctaHref}
                  className="relative z-10 mt-10 flex w-full items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:mx-auto sm:w-fit sm:px-18"
                >
                  {detail?.cta_label || "Enquire Now"}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {detail?.gallery_image_urls?.length ? (
        <section className="bg-[#f5f3ee] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-lg font-medium bg-[linear-gradient(90deg,#2947AA_0%,#FC7B1B_100%)] bg-clip-text text-transparent inline-block">Workspace gallery</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-slate-900 sm:text-[2.1rem]">Explore the space</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detail.gallery_image_urls.map((url, index) => <div key={url} className={`overflow-hidden rounded-[1.25rem] bg-slate-200 shadow-[0_16px_34px_rgba(10,16,40,0.10)] ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}><img src={url} alt={`${service.label} workspace gallery image ${index + 1}`} className={`w-full object-cover ${index === 0 ? "h-64 sm:h-80" : "h-56 sm:h-80"}`}/></div>)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[rgba(229,229,229,1)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-medium bg-[linear-gradient(90deg,#2947AA_0%,#FC7B1B_100%)] bg-clip-text text-transparent inline-block">
            What's Included
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-slate-900 sm:text-[2.1rem]">
            Features & Inclusions
          </h2>
          <div className="mt-10 grid gap-5 sm:mt-15 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {features.map((item) => (
              <article
                key={item.title}
                className="rounded-[1rem] border border-white/70 bg-white px-5 py-8 text-slate-900 shadow-[0_12px_30px_rgba(10,16,40,0.05)] sm:px-6"
              >
                <h3 className="text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <div className="mx-auto mt-3 h-px w-56 max-w-full bg-gradient-to-r from-[#FC7B1B] to-[#2947AA]" />
                <p className="mx-auto mt-5 max-w-[25ch] text-md leading-7 text-slate-500">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {faqs.length ? (
        <section className="bg-[#fbfaf7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-lg font-medium bg-[linear-gradient(90deg,#2947AA_0%,#FC7B1B_100%)] bg-clip-text text-transparent inline-block">Helpful details</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-slate-900 sm:text-[2.1rem]">Frequently asked questions</h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => <details key={`${faq.question}-${index}`} className="group rounded-[0.9rem] border border-slate-200 bg-white px-6 shadow-[0_10px_30px_rgba(10,16,40,0.06)]"><summary className="cursor-pointer list-none py-5 text-left text-base font-medium text-slate-900 marker:content-none"><span className="flex items-center justify-between gap-4">{faq.question}<span className="text-xl text-[#1b2c70] transition group-open:rotate-45">+</span></span></summary><p className="border-t border-slate-100 py-5 text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}
            </div>
          </div>
        </section>
      ) : null}

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
            {detail?.cta_title || content.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            {detail?.cta_body || content.ctaBody}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={ctaHref}
              className="rounded-[0.6rem] bg-[#18265c] px-8 py-3 text-sm font-medium text-white shadow-[0_10px_18px_rgba(12,18,42,0.22)] transition hover:bg-[#111c48]"
            >
              {detail?.cta_label || "Book a Tour"}
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
