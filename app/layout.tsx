import type { Metadata } from "next";
import { Geist, Geist_Mono,Kodchasan } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

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
  title: "Kodesk",
  description: "Premium coworking spaces designed for modern professionals and innovative teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kodchasan.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#f2f2ef] font-sans text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
