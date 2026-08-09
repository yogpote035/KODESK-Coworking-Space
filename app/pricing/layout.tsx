import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Workspace Plans in Baner, Pune | KODESK", "Explore flexible workspace plans at KODESK in Baner, Pune, including day passes and dedicated desks.", "/pricing");
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
