import Link from "next/link";
import FeatureGrid from "./components/FeatureGrid";
import LoreStrip from "./components/LoreStrip";
import OpenChatButton from "./components/OpenChatButton";

export default function HomePage() {
  return (
    <>
      <main className="relative">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="overflow-hidden rounded-[32px] border border-[#d7a33d]/10 bg-[linear-gradient(135deg,rgba(38,10,14,.88),rgba(16,8,10,.78),rgba(12,20,25,.7))] px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

            {/* Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#d7a33d]/15 bg-white/5 px-3 py-1.5 text-[11px] text-[#e8cf9f]/70 sm:text-xs">
              <span>🚤 Miền Tây Nam Bộ</span>
              <span>•</span>
              <span>🎭 Nhập vai</span>
              <span>•</span>
              <span>🔍 Suy luận</span>
              <span>•</span>
              <span>| Chat hỗ trợ luật</span>
            </div>

            {/* H1 full width */}
            <h1 className="mt-5 max-w-[15ch] text-2xl font-black uppercase leading-[1.12] tracking-[-0.02em] text-[#f6dfb4] sm:text-[2rem] md:max-w-[18ch] md:text-[2.8rem] xl:max-w-none xl:text-[3.6rem]">
              <span className="block text-[#ffcf72]">Canh Ba</span>
              <span className="block">Chợ nổi về đêm</span>
              <span className="block">nơi người thật</span>
              <span className="block">
                và <span className="text-[#ffcf72]">“vai diễn”</span> trà trộn
              </span>
            </h1>

            {/* Content dưới H1 chia 2 cột */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

              {/* Left column */}
              <div>
                <p className="max-w-2xl text-sm leading-7 text-[#ead7b0]/80 sm:text-base md:text-lg">
                  Một bộ card game “vào ván nhanh” nhưng đủ kịch tính để cả nhóm la hét.
                  Bối cảnh chợ đêm sông nước: tiếng rao, đèn lồng, ghe xuồng — và những bí mật
                  không ai muốn lộ.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">


                  <Link
                    href="/product"
                    className="rounded-2xl border border-[#d7a33d]/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[#f0dbb2] transition hover:bg-white/10 sm:text-base"
                  >
                    Xem bộ bài
                  </Link>

                  <OpenChatButton className="rounded-2xl border border-[#d7a33d]/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[#f0dbb2] transition hover:bg-white/10 sm:text-base">
                    Hỏi luật nhanh
                  </OpenChatButton>
                </div>

                <div className="mt-8 grid gap-3 xl:grid-cols-2">
                  {[
                    ["Số người chơi", "5–29"],
                    ["Thời lượng", "25–45 phút"],
                    ["Thể loại", "Hidden role • Suy luận"],
                    ["Mood", "Chợ đêm • Sông nước • Kịch tính"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="h-full min-h-[118px] rounded-[22px] border border-[#d7a33d]/10 bg-white/5 p-4"
                    >
                      <div className="text-xs text-[#c9a15a]/70">{label}</div>
                      <div className="mt-2 text-[15px] font-bold leading-7 text-[#f6dfb4] lg:text-base lg:leading-8">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="lg:pl-2">
                <div className="rounded-[30px] border border-[#d7a33d]/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-sm sm:p-6">
                  <div className="text-2xl font-black text-[#f6dfb4] sm:text-3xl">
                    “Kịch tính vừa đủ”
                  </div>

                  <p className="mt-3 text-sm leading-7 text-[#ead7b0]/75 sm:text-base">
                    Thảo luận • Quan sát • Suy luận • Lật kèo — đúng chất “phiên chợ tan
                    mới biết ai là ai”.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/70 p-4">
                      <div className="text-lg font-bold text-[#ffcf72]">⚡ Vào ván nhanh</div>
                      <p className="mt-2 text-sm text-[#e8d1aa]/78">
                        Dẫn luật gọn cho người mới.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/70 p-4">
                      <div className="text-lg font-bold text-[#ff77d9]">🧠 Căng não vừa đủ</div>
                      <p className="mt-2 text-sm text-[#e8d1aa]/78">
                        Đọc hành vi + timing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureGrid />
        <LoreStrip />
      </main>
    </>
  );
}