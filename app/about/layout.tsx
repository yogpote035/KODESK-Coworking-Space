import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("About KODESK Coworking Space | Baner, Pune", "Learn about KODESK flexible workspace solutions for professionals, startups and businesses in Baner, Pune.", "/about");
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
