"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import serviceLogo from "@/assets/icons/navbar/Services/kodesklogo.png";
import servicePageLogo from "@/assets/icons/services/kodeskserviceslogo.png";
import { ServiceStrip } from "@/components/shared/ServiceStrip";

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
  const isServiceRoute = pathname === "/services" || pathname.startsWith("/services/");
  const [showServiceStrip, setShowServiceStrip] = useState(isServiceRoute);

  useEffect(() => {
    setShowServiceStrip(isServiceRoute);
  }, [isServiceRoute]);

  const servicesNavbarOpen = isServiceRoute && showServiceStrip;

  const wrapperClasses = servicesNavbarOpen
    ? "mx-auto flex w-full max-w-[1400px] flex-col rounded-[1.25rem] border border-white/70 bg-[rgba(255,255,255,0.96)] px-4 py-3 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:px-6"
    : "mx-auto flex w-full max-w-[1400px] flex-col rounded-[1rem] border border-white/20  px-4 py-3 text-white backdrop-blur-xl bg-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.3)] lg:px-6"

  return (
    <header className="absolute left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div className={`${wrapperClasses} ${servicesNavbarOpen ? "pb-2" : ""}`}>
        <div className="flex min-h-[2px] items-center justify-between gap-4 lg:min-h-[4rem]">
          <Link href="/" className="flex shrink-0 items-center">
            <span className={`flex flex-col items-start leading-none ${servicesNavbarOpen ? "text-[#1f2d62]" : "text-white"}`}>
              <Image
                src={isServiceRoute ? servicePageLogo : serviceLogo}
                alt="Kodesk"
                priority
                className=" w-45 px-8 py-2  ml-2 sm:h-9 mt-3 "
              />
                <span className="mt-1 tracking-[0.1em] px-10 sm:text-[0.42rem]">
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
            className="inline-flex items-center justify-center rounded-[0.6rem] gradient-card px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_24px_rgba(36,49,109,0.22)] sm:px-5 sm:py-3"
          >
            Book a Tour
          </Link>
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
    </header>
  );
}
