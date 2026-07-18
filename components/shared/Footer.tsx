import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/icons/footer/facebook.svg";
import instagramIcon from "@/assets/icons/footer/instagram .svg";
import linkedinIcon from "@/assets/icons/footer/linkedin.svg";
import whatsappIcon from "@/assets/icons/footer/whatsapp.svg";
import kodeskLogo from "@/assets/icons/navbar/Services/kodesklogo.png";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { href: "/services/day-pass", label: "Day pass" },
  { href: "/services/coworking-space", label: "Coworking Space" },
  { href: "/services/managed-office", label: "Managed Office" },
  { href: "/services/flexible-seating", label: "Flexible Seating" },
  { href: "/services/dedicated-desk", label: "Dedicated Desk" },
  { href: "/services/meeting-room", label: "Meeting Room" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: instagramIcon },
  { label: "WhatsApp", href: "#", icon: whatsappIcon },
  { label: "Facebook", href: "#", icon: facebookIcon },
  { label: "LinkedIn", href: "#", icon: linkedinIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#142050] text-white">
      <div className="mx-auto w-full max-w-[1120px] px-6 pb-8 pt-14 sm:px-8 lg:px-6">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.8fr_0.95fr_0.75fr]">
          <div className="max-w-[280px]">
            <p className="text-sm leading-6 text-white/90 sm:text-[0.98rem]">
              Premium coworking spaces designed for modern professionals and
              innovative teams.
            </p>
          </div>

          <div>
            <h2 className="text-[1.05rem] font-medium text-white">Quick Links</h2>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-white/90">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[1.05rem] font-medium text-white">Services</h2>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-white/90">
              {services.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[1.05rem] font-medium text-white">Contact Us</h2>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-white/90">
              <li>
                <Link className="transition hover:text-white" href="/contact">
                  Support call
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/contact">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/contact">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/25 pt-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Image
                src={kodeskLogo}
                alt="Kodesk"
                className="h-auto w-[118px]"
                sizes="118px"
              />
            </div>

            <div className="flex items-center gap-5">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center  transition hover:bg-white/10"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-8"
                    sizes="20px"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/25 pt-6">
          <p className="text-center text-sm text-white/90">
            &copy; 2026 KODESK Coworking Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
