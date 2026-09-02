import Footer from "@/components/Footer"; // 1. استيراد المكون
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bruno_Ace, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bruno = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZEKA Store",
  description: "A store for all sports equipment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans dark", inter.variable)}>
      {/* 2. إضافة min-h-screen و flex flex-col للـ body */}
      <body className={cn("flex flex-col min-h-screen", bruno.className)}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster className="font-bruno!" />
        </Providers>
      </body>
    </html>
  );
}
