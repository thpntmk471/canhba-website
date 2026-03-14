import Link from "next/link";

export default function SiteFooter() {
    return (
        <footer className="border-t border-[#d7a33d]/10 bg-[#120506]">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8 lg:py-14">
                <div>
                    <div className="text-xl font-black uppercase tracking-[0.2em] text-[#ffbf47]">
                        Canh Ba
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[#e7d1a8]/72">
                        Board game suy luận mang màu sắc dân gian – huyền bí, lấy cảm hứng từ
                        chợ đêm Nam Bộ, nơi người thật và “vai diễn” trộn lẫn trong ánh đèn dầu.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {["5–29 người", "25–45 phút", "Hidden role", "Suy luận"].map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-[#d7a33d]/10 bg-white/5 px-3 py-1 text-xs text-[#efdbb1]/85"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#ffcf72]">
                        Điều hướng
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-[#ead7b0]/78">
                        <Link href="/" className="block hover:text-[#ffcf72]">
                            Trang chủ
                        </Link>
                        <Link href="/product" className="block hover:text-[#ffcf72]">
                            Sản phẩm
                        </Link>
                        <Link href="/chat" className="block hover:text-[#ffcf72]">
                            Hỏi luật
                        </Link>
                        <Link href="/contact" className="block hover:text-[#ffcf72]">
                            Liên hệ
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#ffcf72]">
                        Thông tin
                    </div>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-[#ead7b0]/78">
                        <div>Veil Game — Dự án Canh Ba</div>
                        <div>600 Nguyễn Văn Cừ Nối Dài, Cần Thơ</div>
                        <div className="break-all">canhba.veilgame@gmail.com</div>
                        <div>www.canhba.site</div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#d7a33d]/10">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-[#caaa71]/65 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>© 2026 Canh Ba / Veil Game. All rights reserved.</div>
                    <div>Canh ba đã điểm... trong chợ có ma!</div>
                </div>
            </div>
        </footer>
    );
}