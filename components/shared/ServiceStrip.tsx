"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { serviceNavItems } from "@/data/service";

function buildHref(slug: string) {
  return `/services/${slug}`;
}

function ChevronButton({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M14 6L8 12l6 6" : "M10 6l6 6-6 6";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FallbackServiceIcon({ slug }: { slug: string }) {
  const paths = {
    "meeting-room": <><path d="M4 19h16M6 19v-7h12v7M9 12V7h6v5M12 4v3" /></>,
    "private-cabin": <><path d="M5 20V5h14v15M9 20v-5h6v5M8 9h.01M16 9h.01" /></>,
    "flexible-seating": <><path d="M7 19v-4a5 5 0 0110 0v4M5 19h14M9 8a3 3 0 116 0v2H9V8z" /></>,
  } as const;

  const icon = paths[slug as keyof typeof paths];

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#1f2d62]">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {icon ?? <path d="M6 19V7h12v12M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />}
      </svg>
    </span>
  );
}

export function ServiceStrip() {
  const pathname = usePathname();
  const rowRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (amount: number) => {
    rowRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className=" px-3 py-3  sm:px-4">
      <div className="flex items-start gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Scroll services left"
          onClick={() => scrollByAmount(-280)}
          className="mt-6 hidden h-10 w-10 shrink-0 items-center justify-center text-slate-800  md:flex"
        >
          <ChevronButton direction="left" />
        </button>

        <div
          ref={rowRef}
          className="flex flex-1 gap-3 overflow-x-auto scroll-smooth px-2 pb-2 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
        >
          {serviceNavItems.map((item) => {
            const href = buildHref(item.slug);
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`)

            return (
              <Link
                key={item.slug}
                href={href}
                className={`flex min-w-[108px] flex-col items-center gap-2   px-3 py-3 text-center transition hover:border-[#2453f5] hover:bg-slate-50 sm:min-w-[132px] ${active
                    ? "text-[#2453f5] shadow-[0_10px_28px_rgba(36,49,109,0.08)]"
                    : "text-slate-800"
                  }`}
              >
                {"icon" in item && item.icon ? (
                  <span className="flex h-10 w-10 items-center justify-center">
                    <img
                      src={item.icon.src}
                      alt=""
                      className="h-10 w-10 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ) : (
                  <FallbackServiceIcon slug={item.slug} />
                )}
                <span
                  className={`text-[0.88rem] font-medium leading-tight sm:text-[0.95rem] ${active ? "border-b border-current pb-0.5" : ""
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll services right"
          onClick={() => scrollByAmount(280)}
          className="mt-9 hidden h-10 w-10 shrink-0 items-center  text-slate-800 transition hover:bg-slate-50 md:flex"
        >
          <ChevronButton direction="right" />
        </button>
      </div>
    </div>
  );
}
