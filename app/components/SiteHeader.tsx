import Image from "next/image";
import Link from "next/link";
import OpenChatButton from "./OpenChatButton";

const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/product", label: "Sản phẩm" },
    { href: "/contact", label: "Liên hệ" },
];

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#d7a33d]/10 bg-[#160809]/80 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="group flex min-w-0 items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden sm:h-12 sm:w-12">
                        <Image
                            src="/images/icon.png"
                            alt="Logo Canh Ba"
                            fill
                            className="object-cover"
                            sizes="48px"
                            priority
                        />
                    </div>

                    <div className="relative h-10 w-[170px] shrink-0 sm:h-12 sm:w-[230px] md:w-[260px]">
                        <Image
                            src="/images/canhba-header.png"
                            alt="Canh Ba header"
                            fill
                            className="object-contain object-left"
                            sizes="(max-width: 640px) 170px, (max-width: 768px) 230px, 260px"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-[#ead7b0]/82 transition hover:bg-white/5 hover:text-[#ffcf72]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 sm:flex">
                    <Link
                        href="/product"
                        className="rounded-xl border border-[#d7a33d]/15 bg-white/5 px-4 py-2 text-sm font-semibold text-[#f1dab0] transition hover:bg-white/10"
                    >
                        Xem bộ bài
                    </Link>
                    <OpenChatButton className="rounded-xl border border-[#ffbf47]/35 bg-[#ffbf47] px-4 py-2 text-sm font-bold text-[#2a0c0f] transition hover:brightness-95">
                        Hỏi luật ngay
                    </OpenChatButton>
                </div>
            </div>

            <div className="border-t border-[#d7a33d]/10 md:hidden">
                <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="whitespace-nowrap rounded-full border border-[#d7a33d]/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#ead7b0]/85"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}