import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Kodchasan } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { business } from "@/lib/business";
import { siteUrl } from "@/lib/seo";
import { getPublicCmsData } from "@/lib/cms/public";
import { resolvePublicContact } from "@/lib/cms/contact";
import { PreviewSelectionBridge } from "@/components/cms/PreviewSelectionBridge";

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

const fallbackTitle = "Coworking Space in Baner, Pune | KODESK";
const fallbackDescription = "KODESK offers coworking spaces, dedicated desks, private offices, meeting rooms and flexible workspace solutions in Baner, Pune.";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPublicCmsData();
  const branding = settings.branding ?? {};
  const seo = settings.seo_defaults ?? {};
  const title = seo.default_title?.trim() || fallbackTitle;
  const description = seo.default_description?.trim() || fallbackDescription;
  const siteName = branding.site_name?.trim() || business.name;
  const ogImage = branding.default_og_image_url?.trim();
  const favicon = branding.favicon_url?.trim() || "/kodeskserviceslogo2.png";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: ["coworking space", "coworking space Baner", "coworking spaces in Pune", "coworking space for rent", "coworking space for single person", "coworking space for women", "managed office spaces", "managed spaces for rent", "shared office space", "shared office for rent"],
    alternates: { canonical: seo.canonical_url?.trim() || "/" },
    openGraph: { type: "website", url: "/", title, description, siteName, locale: "en_IN", images: ogImage ? [{ url: ogImage }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: ogImage ? [ogImage] : undefined },
    icons: { icon: favicon },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings } = await getPublicCmsData();
  const contact = resolvePublicContact(settings);
  const siteName = settings.branding?.site_name?.trim() || business.name;
  const structuredData = [
    { "@context": "https://schema.org", "@type": "LocalBusiness", name: siteName, url: siteUrl, telephone: contact.phone, email: contact.email, address: { "@type": "PostalAddress", streetAddress: contact.address, addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" } },
    { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl },
  ];
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${kodchasan.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#f2f2ef] font-sans text-slate-900">
        <Suspense fallback={null}>
          <PreviewSelectionBridge />
        </Suspense>
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
