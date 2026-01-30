import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
  description: "Website quảng cáo board game, tích hợp AR và Chat AI hỏi luật.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-zinc-950 text-zinc-100`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src="/images/canhba-logo.jpg"
                  alt="CANHBA logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="leading-tight">
                <div className="text-lg font-bold tracking-wide">CANHBA</div>
                <div className="text-xs text-zinc-400">
                  Board Game • AR • AI
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/games"
                className="rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
              >
                Board games
              </Link>
              <Link
                href="/chat"
                className="rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
              >
                Hỏi luật
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Liên hệ
              </Link>
            </nav>
          </div>
        </header>

        {/* Page */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-400">
            © {new Date().getFullYear()} CANHBA — Board game hub
          </div>
        </footer>
      </body>
    </html>
  );
}
