"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import heroImage from "@/assets/images/our gallery/main.png";
import conferenceImage from "@/assets/images/our gallery/conference.png";
import meetingRoomImage from "@/assets/images/our gallery/meeting room.svg";
import loungeImage from "@/assets/images/our gallery/comfortable lounge.png";
import privateOfficeImage from "@/assets/images/our gallery/private office.png";
import creativeImage from "@/assets/images/our gallery/creative.png";
import workspaceImage from "@/assets/images/our gallery/Workspace.png";
import { ArcMenu } from "@/components/ui/arcmenu";

const filters = [
  { label: "All", value: "all" },
  { label: "Workspace", value: "workspace" },
  { label: "Meeting Rooms", value: "meeting-rooms" },
  { label: "Lounge Areas", value: "lounge-areas" },
  { label: "Amenities", value: "amenities" },
];

const galleryItems = [
  {
    title: "Executive Meeting Room",
    image: meetingRoomImage,
    category: "meeting-rooms",
  },
  {
    title: "Workspace",
    image: workspaceImage,
    category: "workspace",
  },
  {
    title: "Comfortable Lounge",
    image: loungeImage,
    category: "lounge-areas",
  },
  {
    title: "Private Office",
    image: privateOfficeImage,
    category: "workspace",
  },
  {
    title: "Creative Workspace",
    image: creativeImage,
    category: "amenities",
  },
  {
    title: "Conference Room",
    image: conferenceImage,
    category: "meeting-rooms",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("all");

  const visibleItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="bg-[#f2f2ef]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Kodesk gallery background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.28),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.55),rgba(15,23,42,0.18))]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/75">
            Our Gallery
          </p>
          <h1 className="mt-6 max-w-3xl font-[family:var(--font-kodchasan)] text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Take a visual tour of our premium workspace
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-full bg-[#14275f] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(20,43,119,0.28)] transition hover:bg-[#1e3a8a]"
            >
              Get Started - Book a Tour
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              View Memberships
            </Link>
          </div>
        </div>
              <div className="relative bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
                <ArcMenu />
              </div>
              


      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`min-w-[10.5rem] rounded-[0.6rem] border px-6 py-3 text-sm font-medium transition sm:text-[0.98rem] ${
                activeFilter === filter.value
                  ? "border-transparent bg-gradient-to-b from-[#263573] to-[#4a63cf] text-white shadow-[0_10px_24px_rgba(38,53,115,0.22)]"
                  : "border-[#9aa8e1] bg-white text-slate-800 hover:border-[#263573] hover:text-[#263573]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {visibleItems.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[1.2rem] bg-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.18)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/18 to-transparent opacity-85 transition duration-500 group-hover:from-black/85 group-hover:via-black/30" />
                <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                  <span className="max-w-[90%] translate-y-2 text-lg font-semibold text-white opacity-100 transition duration-500 group-hover:translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 sm:text-xl">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
