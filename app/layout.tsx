import type { Metadata } from "next";
import { Geist, Geist_Mono, Kodchasan } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { business } from "@/lib/business";
import { siteUrl } from "@/lib/seo";
import { getPublicCmsData } from "@/lib/cms/public";
import { resolvePublicContact } from "@/lib/cms/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kodchasan = Kodchasan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kodchasan",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Coworking Space in Baner, Pune | KODESK",
  description: "KODESK offers coworking spaces, dedicated desks, private offices, meeting rooms and flexible workspace solutions in Baner, Pune.",
  keywords: ["coworking space", "coworking space Baner", "coworking spaces in Pune", "coworking space for rent", "coworking space for single person", "coworking space for women", "managed office spaces", "managed spaces for rent", "shared office space", "shared office for rent"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Coworking Space in Baner, Pune | KODESK", description: "KODESK offers coworking spaces, dedicated desks, private offices, meeting rooms and flexible workspace solutions in Baner, Pune.", siteName: business.name, locale: "en_IN" },
  twitter: { card: "summary", title: "Coworking Space in Baner, Pune | KODESK", description: "Flexible workspace solutions in Baner, Pune." },
  icons: {
    icon: "/kodeskserviceslogo2.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings } = await getPublicCmsData();
  const contact = resolvePublicContact(settings);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "LocalBusiness", name: business.name, url: siteUrl, telephone: contact.phone, email: contact.email, address: { "@type": "PostalAddress", streetAddress: contact.address, addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } },
    { "@context": "https://schema.org", "@type": "WebSite", name: business.name, url: siteUrl },
  ];
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${kodchasan.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#f2f2ef] font-sans text-slate-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
