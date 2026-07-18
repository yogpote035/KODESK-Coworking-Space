import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/about/main.png";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PlaceholderPageProps) {
  return (
    <section className="bg-[#f2f2ef]">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_30%),linear-gradient(180deg,rgba(18,18,18,0.28),rgba(18,18,18,0.56))]" />
        </div>

        <div className="relative mx-auto flex min-h-[56vh] max-w-4xl flex-col justify-center px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-32">
          <p className="text-sm uppercase tracking-[0.35em] text-white/78">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={primaryHref}
              className="rounded-full bg-[#24316d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d2757]"
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="rounded-full border border-white/35 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
