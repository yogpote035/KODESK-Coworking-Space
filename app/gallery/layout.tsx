import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("KODESK Workspace Gallery | Baner, Pune", "Explore the KODESK coworking space, private office, meeting room and workspace gallery in Baner, Pune.", "/gallery");
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
