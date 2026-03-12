const features = [
    {
        title: "Vào ván nhanh",
        desc: "Luật gọn, dễ kéo người mới vào chơi mà vẫn đủ kịch tính để cả nhóm tranh luận.",
    },
    {
        title: "Bản sắc rõ",
        desc: "Không khí chợ đêm Nam Bộ, đèn dầu, lời đồn và những vai diễn không ai dám nhận.",
    },
    {
        title: "Suy luận & đọc người",
        desc: "Quan sát hành vi, nhịp nói, cách dẫn dắt và những khoảnh khắc lộ sơ hở.",
    },
    {
        title: "Hỏi luật tức thì",
        desc: "Tích hợp trang hỏi luật để tra nhanh vai trò, tình huống và rulings ngay khi chơi.",
    },
];

export default function FeatureGrid() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mb-6">
                <div className="inline-flex rounded-full border border-[#d7a33d]/20 bg-[#2a0c0f]/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f3c768] sm:text-sm">
                    Điểm nổi bật
                </div>
                <h2 className="mt-4 text-2xl font-extrabold uppercase text-[#ffbf47] sm:text-3xl lg:text-4xl">
                    Một phiên chợ ít yên bình
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#ead4ab]/78 sm:text-base">
                    Không chỉ là hidden role, Canh Ba hướng tới trải nghiệm tranh luận sống,
                    dễ vào nhưng đủ sức giữ bàn chơi nóng tới cuối ván.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {features.map((item, index) => (
                    <div
                        key={item.title}
                        className="rounded-[24px] border border-[#d7a33d]/10 bg-[linear-gradient(180deg,rgba(39,10,14,.9),rgba(18,6,8,.95))] p-5"
                    >
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffbf47]/20 bg-white/5 text-sm font-bold text-[#ffcf72]">
                            0{index + 1}
                        </div>
                        <h3 className="text-lg font-bold text-[#ffe3b2]">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-[#ebd5ac]/76">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}