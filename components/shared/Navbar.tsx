"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import serviceLogo from "@/assets/icons/navbar/Services/kodesklogo.png";
import servicePageLogo from "@/assets/icons/services/kodeskserviceslogo.png";
import { ServiceStrip } from "@/components/shared/ServiceStrip";
import { usePublicCms } from "@/lib/cms/client";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { settings } = usePublicCms();
  const logoUrl = settings.branding?.logo_url?.trim();
  const isServiceRoute = pathname === "/services" || pathname.startsWith("/services/");
  const [showServiceStrip, setShowServiceStrip] = useState(isServiceRoute);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowServiceStrip(isServiceRoute);
    setMobileMenuOpen(false);
  }, [isServiceRoute]);

  useEffect(() => {
    if (!showServiceStrip) return;

    const closeWhenClickingOutside = (event: PointerEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setShowServiceStrip(false);
      }
    };

    document.addEventListener("pointerdown", closeWhenClickingOutside);
    return () => document.removeEventListener("pointerdown", closeWhenClickingOutside);
  }, [showServiceStrip]);

  const servicesNavbarOpen = isServiceRoute && showServiceStrip;

  const wrapperClasses = servicesNavbarOpen
    ? "mx-auto flex w-full max-w-[1400px] flex-col rounded-[1.25rem] border border-white/70 bg-[rgba(255,255,255,0.96)] px-4 py-3 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:px-6"
    : "mx-auto flex w-full max-w-[1400px] flex-col rounded-[1rem] border border-white/20  px-4 py-3 text-white backdrop-blur-xl bg-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.3)] lg:px-6"

  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div ref={navbarRef} className={`${wrapperClasses} ${servicesNavbarOpen ? "pb-2" : ""}`}>
        <div className="flex min-h-[2px] items-center justify-between gap-2 lg:min-h-[4rem] lg:gap-4">
          <Link href="/" className="flex shrink-0 items-center">
            <span className={`flex flex-col items-start leading-none ${servicesNavbarOpen ? "text-[#1f2d62]" : "text-white"}`}>
              {logoUrl ? <img src={logoUrl} alt="Kodesk" className="mt-0 h-auto w-[126px] object-contain sm:ml-2 sm:mt-3 sm:w-45 sm:h-9" /> : <Image
                src={isServiceRoute ? servicePageLogo : serviceLogo}
                alt="Kodesk"
                priority
                className="mt-0 h-auto w-[126px] px-0 py-0 sm:ml-2 sm:mt-3 sm:w-45 sm:px-8 sm:py-2 sm:h-9"
              />}
                <span className="mt-1 px-0 text-[0.34rem] tracking-[0.1em] sm:px-10 sm:text-[0.42rem]">
                  ACHIEVING SUCCESS TOGETHER
                </span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-10">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/services"
                    ? isServiceRoute
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

              let linkClass = "";

              if (item.href === "/services") {
                if (servicesNavbarOpen) {
                  linkClass = "text-[#2453f5] underline decoration-[#2453f5] decoration-2 underline-offset-8";
                } else {
                  linkClass = "text-white decoration-2 underline-offset-8";
                }
              } else {
                linkClass = active
                  ? servicesNavbarOpen
                    ? "text-[#2453f5] underline decoration-[#2453f5] decoration-2 underline-offset-8"
                    : "text-white underline decoration-white/80 decoration-2 underline-offset-8"
                  : servicesNavbarOpen
                    ? "text-slate-900 hover:text-[#2453f5]"
                    : "text-white/90 hover:text-white";
              }

              if (item.href === "/services") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (isServiceRoute) {
                        e.preventDefault();
                        setShowServiceStrip((current) => !current);
                      }
                    }}
                    aria-expanded={showServiceStrip}
                    className={`cursor-pointer text-[0.98rem] font-medium transition xl:text-[1rem] ${linkClass}`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.98rem] font-medium transition xl:text-[1rem] ${linkClass}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="hidden shrink-0 items-center justify-center whitespace-nowrap rounded-[0.6rem] gradient-card px-5 py-3 text-sm font-medium text-white shadow-[0_12px_24px_rgba(36,49,109,0.22)] lg:inline-flex"
          >
            Book a Tour
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${
              servicesNavbarOpen
                ? "border-slate-200 bg-slate-100 text-[#1f2d62]"
                : "border-white/25 bg-white/10 text-white"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden border-t transition-all duration-300 ease-out ${
            servicesNavbarOpen
              ? "border-slate-200/80"
              : "border-white/15"
          } ${
            showServiceStrip
              ? "mt-0 max-h-[160px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className={showServiceStrip ? "pointer-events-auto" : "pointer-events-none"}>
            <ServiceStrip />
          </div>
        </div>

      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 cursor-default bg-[#08102d]/55 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute bottom-3 right-3 top-3 flex w-[min(21rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.5rem] border border-white/20 bg-[linear-gradient(160deg,#14245a_0%,#0c1537_62%,#101a40_100%)] p-5 text-white shadow-[0_28px_80px_rgba(4,10,30,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="text-sm font-semibold tracking-[0.16em] text-white/70">KODESK</span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-5 space-y-2" aria-label="Mobile navigation">
              {navItems.map((item, index) => {
                const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition ${
                      active ? "bg-white text-[#17275f] shadow-[0_12px_26px_rgba(0,0,0,0.16)]" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-xs ${active ? "text-[#f28c28]" : "text-white/45"}`}>0{index + 1}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-5">
              <p className="text-xs leading-5 text-white/55">Find the workspace that works for you.</p>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center rounded-xl gradient-card px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,0,0,0.22)]"
              >
                Book a Free Tour
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
