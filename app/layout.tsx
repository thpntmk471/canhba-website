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
  title: "CANHBA | Board Game • AR • AI",
  description: "Website quảng cáo board game Canh Ba, tích hợp AR và Chat AI hỏi luật.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050505] font-sans text-[#f2f2f2] antialiased`}
      >
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#050505]">
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,174,23,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,174,23,0.06),transparent_34%)]" />
          <SiteHeader />
          <main className="relative flex-1 pb-28 md:pb-0">{children}</main>
          <SiteFooter />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
