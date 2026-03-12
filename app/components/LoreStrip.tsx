import Link from "next/link";

export default function LoreStrip() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
            <div className="overflow-hidden rounded-[28px] border border-[#d7a33d]/10 bg-[linear-gradient(135deg,rgba(52,11,15,.95),rgba(14,25,28,.92))]">
                <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="text-xs uppercase tracking-[0.2em] text-[#c89a42]">
                            Không khí thương hiệu
                        </div>
                        <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight text-[#ffcf72] sm:text-3xl">
                            Đèn dầu, chợ nổi,
                            <br />
                            lời đồn và bóng tối
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#ead4ab]/80 sm:text-base">
                            Bộ nhận diện Canh Ba đi theo sắc đỏ rượu, vàng cháy và nền tối, gợi cảm
                            giác của một phiên chợ về khuya: càng ồn ào bên ngoài, càng nhiều bí mật
                            ẩn bên trong.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/product"
                                className="rounded-xl border border-[#ffbf47]/30 bg-[#ffbf47] px-4 py-2.5 text-sm font-bold text-[#2a0c0f]"
                            >
                                Khám phá sản phẩm
                            </Link>
                            <Link
                                href="/contact"
                                className="rounded-xl border border-[#d7a33d]/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#f2dcb2]"
                            >
                                Liên hệ dự án
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center border-t border-[#d7a33d]/10 p-6 lg:border-l lg:border-t-0 lg:p-10">
                        <div className="grid w-full gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            {[
                                ["Tone màu", "Đỏ trầm • vàng đèn dầu • xanh đen"],
                                ["Cảm giác", "Dân gian Nam Bộ • ma mị • kịch tính"],
                                ["Ứng dụng", "Box art • card art • website • chatbot"],
                            ].map(([title, desc]) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-[#d7a33d]/10 bg-black/20 p-4"
                                >
                                    <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                                        {title}
                                    </div>
                                    <div className="mt-2 text-sm leading-7 text-[#f0dab1]/82">
                                        {desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}