import Image from "next/image";
import Link from "next/link";
import FeatureGrid from "./components/FeatureGrid";
import LoreStrip from "./components/LoreStrip";
import OpenChatButton from "./components/OpenChatButton";

const gameStats = [
  { label: "Người chơi", value: "5–29" },
  { label: "Thời lượng", value: "25–45 phút" },
  { label: "Thể loại", value: "Hidden role" },
  { label: "Trải nghiệm", value: "Board game + AI + AR" },
];

const homeHighlights = [
  {
    title: "Canh Ba là gì?",
    desc: "Card game suy luận, nhập vai và tranh luận. Người chơi phải đọc tình huống, quan sát biểu hiện, che giấu vai trò và tìm ra phe đối lập trước khi quá muộn.",
  },
  {
    title: "Không khí Định Yên",
    desc: "Trò chơi lấy cảm hứng từ dân gian Nam Bộ, phiên chợ về khuya, những lời đồn trong đêm và cảm giác nửa thật nửa hư.",
  },
  {
    title: "Dành cho bàn chơi đông",
    desc: "Phù hợp cho nhóm bạn, câu lạc bộ, workshop hoặc các buổi tụ tập cần một trò chơi dễ nhập cuộc nhưng vẫn có chiều sâu tranh luận.",
  },
];

const journeyItems = [
  {
    step: "01",
    title: "Chọn vai",
    desc: "Mỗi người nhận một vai trò, có mục tiêu riêng và lượng thông tin không giống nhau.",
  },
  {
    step: "02",
    title: "Quan sát & tranh luận",
    desc: "Người chơi nghe lời khai, đặt câu hỏi, phát hiện mâu thuẫn và bảo vệ chính mình.",
  },
  {
    step: "03",
    title: "Kết luận trước canh ba",
    desc: "Cả bàn phải đưa ra phán đoán trước khi phe đối lập kịp xoay chuyển tình thế.",
  },
];

const techItems = [
  {
    title: "Chat AI hỏi luật",
    desc: "Hỏi nhanh chức năng vai trò, timing và các tình huống tranh cãi ngay trong lúc chơi.",
    href: "/chat",
    cta: "Mở Chat",
  },
  {
    title: "AR tăng nhập vai",
    desc: "Dùng lớp trải nghiệm số để minh họa thẻ bài, vật phẩm và không khí của thế giới Canh Ba.",
    href: "/ar",
    cta: "Khám phá AR",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-5 sm:px-6 sm:pt-12 sm:pb-7 lg:px-8 lg:pt-14 lg:pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#191919] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ffae17]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ffae17]/8 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex rounded-full bg-[#303030] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffae17]">
                  Board game suy luận • AR • AI
                </div>

                <h1 className="mt-6 max-w-3xl text-[50px] font-semibold leading-[0.96] tracking-[-0.06em] text-[#f3f3f3] sm:text-7xl lg:text-8xl">
                  Canh Ba
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#c8c8c8] sm:text-lg">
                  Bước vào làng Định Yên lúc phiên chợ đã tàn. Người chơi phải
                  che giấu vai trò, đọc lời nói, bắt sơ hở và tìm ra phe đối lập
                  trước khi quá muộn.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/product"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffae17] px-8 text-base font-black text-[#111111] shadow-[0_18px_40px_rgba(255,174,23,0.22)] transition hover:-translate-y-0.5 hover:brightness-95"
                >
                  Xem sản phẩm
                </Link>

                <OpenChatButton className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-[#252525] px-8 text-base font-bold text-[#f2f2f2] transition hover:-translate-y-0.5 hover:bg-[#2d2d2d]">
                  Hỏi luật nhanh
                </OpenChatButton>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-[34px] border border-white/10 bg-[#151515] p-4 sm:grid-cols-2 lg:grid-cols-1 lg:p-5">
            {gameStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[26px] border border-white/10 bg-[#202020] p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b8b8b]">
                  {item.label}
                </div>
                <div className="mt-3 text-2xl font-black text-[#f2f2f2]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#151515] shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
          <div className="relative h-[170px] w-full sm:h-[250px] lg:h-[315px] xl:h-[340px]">
            <Image
              src="/images/home-banner.png"
              alt="Không khí làng Định Yên trong Canh Ba"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <div className="inline-flex rounded-full bg-black/45 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffae17] backdrop-blur">
                Làng Định Yên
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 max-w-2xl sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
              <h2 className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Khi phiên chợ lên đèn, mọi vai diễn đều có bí mật.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                Không khí dân gian Nam Bộ, lời đồn lúc canh ba và những người
                chơi phải tự bảo vệ vai trò của mình giữa một bàn tranh luận.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <article className="rounded-[34px] border border-white/10 bg-[#191919] p-6 sm:p-8 lg:p-10">
            <div className="inline-flex rounded-full bg-[#303030] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffae17]">
              Câu chuyện
            </div>

            <h2 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#f3f3f3] sm:text-5xl">
              Làng Định Yên và lời đồn lúc canh ba
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#a7a7a7] sm:text-base">
              Ở cái xứ miền Tây sông nước, chuyện ma quỷ len vào đời sống như
              mùa nước nổi. Người già kể lại, trẻ con nghe rồi nhớ, còn phiên
              chợ khuya thì luôn có những điều không ai dám chắc là thật hay giả.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#a7a7a7] sm:text-base">
              Canh Ba lấy chất liệu đó để tạo nên một bàn chơi nơi mỗi lời nói
              đều có thể là manh mối, cái bẫy hoặc màn diễn để sống sót.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {homeHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-[#1f1f1f] p-5 transition hover:-translate-y-1 hover:bg-[#252525]"
              >
                <h3 className="text-xl font-bold text-[#f2f2f2]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#a7a7a7]">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-[#1f1f1f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffae17]">
              Luồng chơi
            </div>

            <h2 className="mt-4 text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#f2f2f2] sm:text-5xl">
              Dễ vào ván, khó đoán kết cục
            </h2>
          </div>

          <Link
            href="/product"
            className="w-fit rounded-full border border-white/10 bg-[#252525] px-5 py-3 text-sm font-bold text-[#f2f2f2] hover:bg-[#303030]"
          >
            Xem bộ bài
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {journeyItems.map((item) => (
            <article
              key={item.step}
              className="rounded-[30px] border border-white/10 bg-[#191919] p-6"
            >
              <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffae17] text-sm font-black text-[#111111]">
                {item.step}
              </div>

              <h3 className="text-2xl font-bold text-[#f2f2f2]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#a7a7a7]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <FeatureGrid />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex rounded-full bg-[#1f1f1f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffae17]">
            Công nghệ hỗ trợ
          </div>

          <h2 className="mt-4 text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#f2f2f2] sm:text-5xl">
            AI và AR chỉ hỗ trợ, không thay bàn chơi
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#a7a7a7] sm:text-base">
            Web dùng lợi thế màn hình lớn để giải thích rõ tính năng, còn mobile
            giữ trải nghiệm nhanh gọn. Hai phần được đồng bộ nội dung nhưng
            không ép giống nhau 100%.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {techItems.map((item) => {
            if (item.href === "/chat") {
              return (
                <OpenChatButton
                  key={item.title}
                  className="group rounded-[30px] border border-white/10 bg-[#1f1f1f] p-6 text-left transition hover:-translate-y-1 hover:bg-[#252525]"
                >
                  <div className="text-2xl font-bold text-[#f2f2f2]">
                    {item.title}
                  </div>

                  <p className="mt-3 text-sm leading-7 text-[#a7a7a7] sm:text-base">
                    {item.desc}
                  </p>

                  <div className="mt-6 inline-flex rounded-full bg-[#ffae17] px-5 py-2 text-sm font-black text-[#111111]">
                    {item.cta}
                  </div>
                </OpenChatButton>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[30px] border border-white/10 bg-[#1f1f1f] p-6 transition hover:-translate-y-1 hover:bg-[#252525]"
              >
                <div className="text-2xl font-bold text-[#f2f2f2]">
                  {item.title}
                </div>

                <p className="mt-3 text-sm leading-7 text-[#a7a7a7] sm:text-base">
                  {item.desc}
                </p>

                <div className="mt-6 inline-flex rounded-full bg-[#ffae17] px-5 py-2 text-sm font-black text-[#111111]">
                  {item.cta}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <LoreStrip />
    </>
  );
}