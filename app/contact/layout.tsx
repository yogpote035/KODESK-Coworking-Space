import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact KODESK Coworking Space | Baner, Pune", "Contact KODESK to book a free tour or enquire about flexible workspace solutions in Baner, Pune.", "/contact");
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
