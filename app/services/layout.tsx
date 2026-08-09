import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Workspace Solutions for Modern Businesses | KODESK", "Explore coworking, dedicated desks, private offices, meeting rooms and flexible workspace solutions in Baner, Pune.", "/services");
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
