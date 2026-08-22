import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/about/main.png";
import storyImage from "@/assets/images/about/Story.png";
import communityImage from "@/assets/images/about/Community.png";
import growthOneImage from "@/assets/images/about/Growth1.png";
import growthTwoImage from "@/assets/images/about/Growth2.png";
import rajeshImage from "@/assets/images/about/Rajesh.png";
import rajeshHoverImage from "@/assets/images/about/Rajesh1.png";
import vikramImage from "@/assets/images/about/Vikram.png";
import vikramHoverImage from "@/assets/images/about/Vikram1.png";
import missionIcon from "@/assets/icons/about/mission.png";
import visionIcon from "@/assets/icons/about/Vision.png";
import innovationIcon from "@/assets/icons/about/Innovation.png";
import collaborationIcon from "@/assets/icons/about/collaboration.png";
import flexibilityIcon from "@/assets/icons/about/flexiblity.png";
import excellenceIcon from "@/assets/icons/about/excellence.png";
import { ArcMenu } from "@/components/ui/arcmenu";

const stats = [
  { value: "—", label: "Details available on request" },
  { value: "—", label: "Details available on request" },
  { value: "—", label: "Details available on request" },
  { value: "—", label: "Details available on request" },
];

const missionCards = [
  {
    icon: missionIcon,
    eyebrow: "Our Mission",
    title: "Productive, Flexible and Professional Workspaces",
    text: "Create productive, flexible and professional workspaces where people can focus on their work and businesses can grow.",
  },
  {
    icon: visionIcon,
    eyebrow: "Our Vision",
    title: "A Workspace Environment to Connect and Grow",
    text: "Build a workspace environment where professionals and businesses can work, connect and grow.",
  },
];

const values = [
  {
    icon: innovationIcon,
    title: "Productivity",
    text: "Spaces designed to support focused work.",
  },
  {
    icon: collaborationIcon,
    title: "Community",
    text: "A professional environment for people and teams.",
  },
  {
    icon: flexibilityIcon,
    title: "Flexibility",
    text: "Workspaces that scale with you, from hot desks to custom-built suites.",
  },
  {
    icon: excellenceIcon,
    title: "Professionalism",
    text: "A dependable setting for modern work.",
  },
];

const communityPoints = [
  "Flexible workspace options",
  "Professional work environment",
  "Modern amenities",
];

// Team biographies remain unpublished until verified by the business owner.
const team: { image: typeof rajeshImage; hoverImage: typeof rajeshHoverImage; name: string; role: string; text: string }[] = [];

export default function AboutPage() {
  return (
    <div className="bg-[#f2f2ef]">
      <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 ">
          <Image
            src={heroImage}
            alt="Kodesk office interior"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%),linear-gradient(180deg,rgba(18,18,18,0.16),rgba(18,18,18,0.54))]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col items-center justify-center px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8">

          <h1 className="max-w-4xl mt-38 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl mt-8">
            About KODESK
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/78 sm:text-base mt-19">
            Flexible workspace solutions for professionals, startups and businesses in Baner, Pune.
          </p>

          <div className="mt-18 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[#24316d] px-6 py-2.5 text-sm font-medium text-white shadow-[0_10px_20px_rgba(12,20,56,0.18)] transition-colors duration-200 hover:bg-[#1d2757]"
            >
              Book a Tour
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-md bg-white px-6 py-2.5 text-sm font-medium text-[#24316d] border-2 border-[#24316d] transition-colors duration-200 hover:bg-[#f8fbff]"
            >
              View Pricing Plans
            </Link>
          </div>

        </div>
                      <div className="relative bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
                <ArcMenu />
              </div>

      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="self-center">
            <p className="text-sm text-slate-500">Our Heritage</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-slate-900">
              Built Around the Way You Work
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
              <p>
                KODESK provides flexible workspace options designed to support different ways of working — from individual professionals and freelancers to startups, teams and growing businesses.
              </p>
              <p>
                Our Baner, Pune workspace brings together coworking, dedicated desks, private offices and managed workspaces in one professional environment.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex -space-x-3">
                <Image
                  src={rajeshImage}
                  alt="Rajesh"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src={vikramImage}
                  alt="Vikram"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-semibold text-white">
                  +2k
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Flexible workspace solutions in Baner, Pune
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <Image
                src={storyImage}
                alt="Conference room interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-5 left-1 rounded-[4px] bg-[linear-gradient(135deg,#3555ff_0%,#ff8a24_100%)] px-6 py-5 text-white border border-white hover:bg-[linear-gradient(90deg,#3651AD_5.09%,#16214794_82%)] ">
              <p className="text-3xl font-semibold leading-none">—</p>
              <p className="mt-1 text-sm text-white/85">Details on request</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebea] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-medium tracking-tight text-slate-900">
              Our Mission &amp; Vision
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {missionCards.map((card) => (
              <article
                key={card.eyebrow}
                className="group relative overflow-hidden rounded-[1.5rem] bg-white p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.09)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,23,42,0.16)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#354bbf_0%,#6c6ba5_45%,#ff841f_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full min-h-[320px] flex-col">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={card.icon}
                        alt=""
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <p className="text-base font-medium text-slate-600 transition-colors duration-500 group-hover:text-white/88">
                      {card.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-8 max-w-xl text-[clamp(1.55rem,2.2vw,2.15rem)] font-medium leading-[1.15] tracking-tight text-slate-900 transition-colors duration-500 group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 transition-colors duration-500 group-hover:text-white/88">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-[linear-gradient(90deg,#152153_0%,#3555ff_55%,#5d63d1_100%)] py-10 text-white">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
            {stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`}>
                <p className="text-4xl font-medium tracking-tight">{stat.value}</p>
                <p className="mt-2 text-sm text-white/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-[#5d63d1]">Our Core Pillars</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-slate-900">
              The Values That Drive Us
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="group relative overflow-hidden rounded-[1.5rem] bg-white p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.09)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,23,42,0.16)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#354bbf_0%,#6c6ba5_45%,#ff841f_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full min-h-[290px] flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={value.icon}
                      alt=""
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <h3 className="mt-8 text-[clamp(1.4rem,2vw,1.9rem)] font-medium leading-tight tracking-tight text-slate-900 transition-colors duration-500 group-hover:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-5 max-w-xs text-base leading-8 text-slate-500 transition-colors duration-500 group-hover:text-white/88">
                    {value.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebea] py-20"> 
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="overflow-hidden py-5  sm:row-span-2">
              <Image
                src={growthOneImage}
                alt="Private meeting room"
                className="  object-contain transition duration-500 hover:scale-[1.02]"
              />
            </div>
            <div className="overflow-hidden  sm:mt-16">
              <Image
                src={growthTwoImage}
                alt="Workspace interior"
                className="object-cover transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="self-center lg:pl-6">
            <h2 className="max-w-3xl text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[1.04] tracking-tight text-slate-900">
              Work, Connect and Grow
            </h2>
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-8 text-slate-700">
              KODESK brings flexible workspace options together in a professional Baner, Pune environment designed for focused work and growing businesses.
            </p>

            <ul className="mt-10 space-y-6">
              {communityPoints.map((point) => (
                <li key={point} className="flex items-center gap-4 text-base text-slate-800">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#ff8a24] text-[12px] leading-none text-[#ff8a24]">
                    &#10003;
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-[#5d63d1]">KODESK Coworking Space</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-slate-900">
              Our Workspace
            </h2>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {team.map((member) => (
              <article
                key={member.name}
                className="group mx-auto max-w-md rounded-[1rem] bg-white p-4"
              >
                <div className="overflow-hidden rounded-[0.95rem] bg-slate-100">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale transition duration-500  group-hover:grayscale-0"
                    />
                    <Image
                      src={member.hoverImage}
                      alt={member.name}
                      fill
                      className="absolute inset-0 object-cover opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-base font-medium text-slate-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{member.role}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {member.text}
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
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#101a43]/72" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium tracking-tight">
            Ready to Find Your Ideal Workspace?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80">
            Schedule a free tour and see the space for yourself. Our team is
            ready to help you get set up.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-[0.9rem] bg-[#24316d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d2757]"
            >
              Book a Tour
            </Link>
            <Link
              href="/pricing"
              className="rounded-[0.9rem] border border-white/50 bg-white px-6 py-3 text-sm font-medium text-[#24316d] transition hover:bg-white/90"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
