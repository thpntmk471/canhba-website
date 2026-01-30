import Image from "next/image";
import Link from "next/link";

const specs = [
  { k: "Số người chơi", v: "4–12 người" },
  { k: "Thể loại", v: "Suy luận • Nhập vai • Hidden role" },
  { k: "Chu kỳ", v: "Ngày – Đêm (5 đêm chơi)" },
  { k: "Số thẻ", v: "Tối đa ~40 thẻ" },
];

const features = [
  {
    title: "Bản sắc miền Tây",
    desc: "Bối cảnh chợ đêm sông nước Tây Nam Bộ không chỉ để “trang trí” mà gắn với trải nghiệm chơi.",
  },
  {
    title: "Luật gọn, dễ vào ván",
    desc: "Thiết kế ưu tiên người chơi mới, phù hợp lớp học, CLB sinh viên, quán cà phê.",
  },
  {
    title: "Visual hợp Gen Z",
    desc: "Hình ảnh hiện đại, dễ nhận diện, “đẹp để chơi – đẹp để chia sẻ”.",
  },
  {
    title: "AR & Chatbox hỗ trợ",
    desc: "Giảm rào cản học luật, tăng cảm nhận bối cảnh — không thay thế tương tác trực tiếp.",
  },
];

const howToPlay = [
  "Mỗi người nhận 1 vai trò bí mật với mục tiêu riêng.",
  "Ván chơi diễn ra theo chu kỳ Ngày – Đêm, kéo dài trong 5 đêm.",
  "Người chơi thảo luận, quan sát hành vi và suy luận để tìm kẻ phản bội.",
  "Kết thúc phiên chợ: xác định phe thắng dựa trên mục tiêu vai trò.",
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              🎲 Board game Việt • Suy luận • Nhập vai
              <span className="opacity-70">| AR • AI (support)</span>
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              CANH BA
              <span className="block text-zinc-300">
                Chợ đêm miền Tây — nơi người sống và linh hồn trà trộn
              </span>
            </h1>

            <p className="mt-5 text-base text-zinc-300 md:text-lg">
              Canh Ba là board game suy luận – nhập vai lấy cảm hứng từ đời sống
              sông nước Tây Nam Bộ. Người chơi tương tác, thảo luận và suy luận
              để tìm ra kẻ phản bội trước khi phiên chợ tan rã.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/product"
                className="rounded-xl bg-white px-5 py-3 font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Xem sản phẩm
              </Link>
              <Link
                href="/chat"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Hỏi luật nhanh
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Liên hệ
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {specs.map((s) => (
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

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/hero-boardgame.jpg"
                  alt="Canh Ba board game"
                  fill
                  className="object-cover opacity-90"
                  priority
                />
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                  <div className="text-sm font-semibold">⚡ Luật gọn</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    Dễ vào ván ngay lần đầu.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
                  <div className="text-sm font-semibold">🗣️ Tương tác thật</div>
                  <div className="mt-1 text-sm text-zinc-300">
                    Tập trung vào thảo luận & suy luận.
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* WHY / MARKET NEED (ngắn gọn) */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Vì sao Canh Ba xuất hiện?
          </h2>
          <p className="mt-3 text-zinc-300">
            Thị trường board game Việt Nam đang hình thành nhóm người chơi ổn định
            nhưng sản phẩm nhập khẩu vẫn chiếm ưu thế, còn board game nội địa
            thiếu bản sắc văn hoá rõ ràng. Canh Ba hướng đến trải nghiệm giải trí
            theo nhóm, luật gọn – dễ tiếp cận – vẫn kịch tính và kết nối trực tiếp.
          </p>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Điểm khác biệt của Canh Ba
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-lg font-bold">{f.title}</div>
              <div className="mt-2 text-sm text-zinc-300">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO PLAY */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Cách chơi (overview)
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {howToPlay.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/50" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <Link
                href="/product"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Xem chi tiết
              </Link>
              <Link
                href="/chat"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Hỏi luật
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8">
            <h3 className="text-lg font-bold">Thông số nhanh</h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Thẻ bài</div>
                <div className="mt-1 text-sm text-zinc-300">
                  ~40 thẻ • Ivory 250g • 63.5 × 88.9 mm
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Hộp</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Bristol 300g, chắc chắn, bảo vệ thành phần bên trong.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Độ bền</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Thiết kế để dùng lặp lại lâu dài, hạn chế cong gập khi xào bài.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            AR & Chatbox — công nghệ chỉ để hỗ trợ
          </h2>
          <p className="mt-3 text-zinc-300">
            Canh Ba tích hợp AR để tăng cảm nhận không gian chợ đêm và hiệu ứng bối
            cảnh khi quét một số thẻ/vật phẩm. Chatbox hỗ trợ giúp người chơi tra
            cứu luật và chức năng thẻ nhanh trong lúc chơi. Các yếu tố này không
            bắt buộc và không can thiệp vào quyết định người chơi — tinh thần cốt
            lõi vẫn là “con người chơi với con người”.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/technology"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
            >
              Xem công nghệ
            </Link>
            <Link
              href="/chat"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              Hỏi luật ngay
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-2xl font-extrabold">
                Sẵn sàng khám phá phiên chợ đêm Canh Ba?
              </div>
              <div className="mt-2 text-zinc-300">
                Theo dõi fanpage, xem demo và hỏi luật nhanh để vào ván dễ hơn.
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Liên hệ
              </Link>
              <Link
                href="/product"
                className="rounded-xl bg-white px-5 py-3 font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
