import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/data/service";
import ArrowIcon from "@/components/ui/arrowicon";

type ShowcaseService = ServiceItem & {
  title: string;
};

type ServiceShowcaseCardProps = {
  service: ShowcaseService;
};

export function ServiceShowcaseCard({ service }: ServiceShowcaseCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={service.title}
      className="group block"
    >
      <div className="relative overflow-visible">
        <div className="relative aspect-[1.53/1] overflow-hidden rounded-[2.4rem] bg-[#e9e3db] shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-500 ease-out group-hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
          <Image
            src={service.galleryImage}
            alt={service.label}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.06)_100%)] transition duration-500 ease-out group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.26)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center transition duration-500 ease-out group-hover:opacity-0">
            <h3 className="max-w-[14ch] text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#101c49] sm:text-[1.8rem] lg:text-[2rem]">
              {service.title}
            </h3>
          </div>

          <div className="absolute inset-0 flex items-center px-6 text-left opacity-0 transition duration-500 ease-out group-hover:opacity-100 sm:px-8">
            <div className="max-w-[80%]">
              <h3 className="max-w-[14ch] text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-[#101c49] sm:text-[1.8rem] lg:text-[2rem]">
                {service.title}
              </h3>
              <p className="mt-4 max-w-[22ch] text-[0.98rem] leading-7 text-white transition duration-500 ease-out">
                {service.description}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 h-[4.9rem] w-[4.9rem] overflow-hidden rounded-tl-[2.9rem] bg-white p-2">
            <div className="flex h-full w-full items-end justify-end">
              <div className="gradient-card flex h-14 w-14 items-center justify-center rounded-full text-white transition duration-500 ease-out group-hover:scale-[1.04]">
                <ArrowIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
