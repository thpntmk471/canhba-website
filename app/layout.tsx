import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MekongBackground from "./components/MekongBackground";
import ChatWidget from "./components/ChatWidget";

export const metadata: Metadata = {
  title: "CANH BA | Card Game miền Tây • Suy luận • Nhập vai",
  description:
    "Landing page quảng bá bộ card game lấy cảm hứng từ miền Tây Nam Bộ Việt Nam — chợ nổi, ghe xuồng, đèn đêm và những bí mật.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <MekongBackground />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6">{children}</main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}