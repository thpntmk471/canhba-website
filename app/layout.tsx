import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ChatWidget from "./components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CANH BA | Board Game • AR • AI",
  description: "Board game Canh Ba - chợ đêm, suy luận, hidden role và hỏi luật bằng AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#140607] font-sans text-[#f3ddb5] antialiased`}
      >
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#140607]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,138,0,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(120,8,18,0.22),transparent_40%)]" />
          <SiteHeader />
          <div className="relative flex-1">{children}</div>
          <SiteFooter />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}