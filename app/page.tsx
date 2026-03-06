import Link from "next/link";


const quickSpecs = [
  { k: "Số người chơi", v: "4–12" },
  { k: "Thời lượng", v: "25–45 phút" },
  { k: "Thể loại", v: "Hidden role • Suy luận" },
  { k: "Mood", v: "Chợ đêm • Sông nước • Kịch tính" },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.16),transparent_45%),radial-gradient(circle_at_82%_25%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_52%_82%,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-2 py-10 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              🛶 Miền Tây Nam Bộ • 🎭 Nhập vai • 🕵️ Suy luận
              <span className="opacity-70">| Chat hỗ trợ luật</span>
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              CANH BA
              <span className="block text-zinc-300">
                Chợ nổi về đêm — nơi người thật và “vai diễn” trà trộn
              </span>
            </h1>

            <p className="mt-5 text-base text-zinc-300 md:text-lg">
              Một bộ card game “vào ván nhanh” nhưng đủ kịch tính để cả nhóm la
              hét. Bối cảnh chợ đêm sông nước: tiếng rao, đèn lồng, ghe xuồng —
              và những bí mật không ai muốn lộ.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-5 py-3 font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Nhận thông báo ra mắt
              </Link>
              <Link
                href="/games"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Xem bộ bài
              </Link>
              <Link
                href="/chat"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Hỏi luật nhanh
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {quickSpecs.map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-xs text-zinc-400">{s.k}</div>
                  <div className="mt-1 text-sm font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-bold">“Kịch tính vừa đủ”</div>
            <p className="mt-2 text-sm text-zinc-300">
              Thảo luận • Quan sát • Suy luận • Lật kèo — đúng chất “phiên chợ
              tan mới biết ai là ai”.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                <div className="text-sm font-semibold">⚡ Vào ván nhanh</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Dẫn luật gọn cho người mới.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                <div className="text-sm font-semibold">🧠 Căng não vừa đủ</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Đọc hành vi + timing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}