import Image from "next/image";
import Link from "next/link";
import OpenChatButton from "./components/OpenChatButton";
import ProductHeroGallery from "./components/ProductHeroGallery";

const quickInfo = [
  { label: "Số người chơi", value: "5–29" },
  { label: "Thời lượng", value: "25–45 phút" },
  { label: "Thể loại", value: "Hidden role" },
  { label: "Bộ thẻ", value: "Ma • Dân làng • Bảo vật" },
];

const previewCards = [
  {
    name: "Ông Từ",
    image: "/images/cards/ong-tu.jpg",
  },
  {
    name: "Chiếu Định Yên",
    image: "/images/cards/chieu-dinh-yen.jpg",
  },
  {
    name: "Ma Đói",
    image: "/images/cards/ma-doi-1.jpg",
  },
  {
    name: "Đèn Dầu",
    image: "/images/cards/den-dau.jpg",
  },
];

const features = [
  {
    title: "Vào ván nhanh",
    desc: "Luật chơi dễ tiếp cận, phù hợp nhóm bạn, câu lạc bộ hoặc workshop.",
  },
  {
    title: "Bản sắc rõ",
    desc: "Không khí chợ đêm Định Yên, đèn dầu, lời đồn và màu sắc dân gian Nam Bộ.",
  },
  {
    title: "Suy luận & tranh luận",
    desc: "Người chơi phải quan sát, đọc người, bảo vệ lập luận và che giấu vai trò.",
  },
  {
    title: "Hỏi luật tức thì",
    desc: "Tích hợp Chat AI để tra nhanh chức năng thẻ và xử lý tình huống trong ván.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="grid gap-8 rounded-[36px] border border-white/10 bg-[#181818] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-7 lg:grid-cols-[1.02fr_0.98fr] lg:p-8">
          <ProductHeroGallery />

          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit rounded-full bg-[#ffae17]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
              Board game suy luận • AR • AI
            </div>

            <h1 className="max-w-2xl text-[44px] font-black leading-[0.98] tracking-[-0.06em] text-[#f3f3f3] sm:text-6xl">
              Canh Ba
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#b8b8b8] sm:text-lg">
              Bước vào phiên chợ Định Yên lúc Canh Ba, nơi người sống và kẻ đã
              khuất lẫn vào nhau dưới ánh đèn dầu. Người chơi phải giữ vai trò
              bí mật, suy luận và tranh luận để sống sót đến cuối ván.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {quickInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-white/10 bg-[#101010] p-4"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#777]">
                    {item.label}
                  </div>

                  <div className="mt-2 text-lg font-black text-[#f2f2f2]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#ffae17] px-7 text-sm font-black text-[#111111] transition hover:brightness-95"
              >
                Xem sản phẩm
              </Link>

              <OpenChatButton className="inline-flex h-13 items-center justify-center rounded-full border border-white/10 bg-[#252525] px-7 text-sm font-black text-[#f2f2f2] transition hover:bg-[#303030]">
                Hỏi luật nhanh
              </OpenChatButton>
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <h2 className="text-lg font-black text-[#f2f2f2]">
                Bộ bài gồm 3 nhóm chính
              </h2>

              <p className="mt-2 text-sm leading-7 text-[#a7a7a7]">
                Dân làng dùng suy luận để tìm ra điều bất thường. Phe Ma che
                giấu thân phận và thao túng cuộc tranh luận. Bảo vật tạo thêm
                biến số khiến ván chơi khó đoán hơn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-[#ffae17]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
              Một vài thẻ nổi bật
            </div>

            <h2 className="mt-4 text-[34px] font-black leading-tight tracking-[-0.05em] text-[#f2f2f2] sm:text-5xl">
              Ma, Dân làng và Bảo vật
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#a7a7a7] sm:text-base">
              Mỗi thẻ trong Canh Ba đều có chức năng riêng và câu chuyện gắn
              với thế giới Định Yên.
            </p>
          </div>

          <Link
            href="/product"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-[#252525] px-6 text-sm font-black text-[#f2f2f2] transition hover:bg-[#303030]"
          >
            Xem toàn bộ thẻ
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {previewCards.map((card) => (
            <Link
              key={card.name}
              href="/product"
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#181818] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#ffae17]/35 hover:bg-[#202020]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-[#0f0f0f]">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-contain p-2 transition duration-500 group-hover:scale-[1.025]"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 36vw, 250px"
                />
              </div>

              <div className="flex justify-center pt-4">
                <span className="inline-flex rounded-full bg-[#252525] px-5 py-2.5 text-xs font-black text-[#f2f2f2] transition group-hover:bg-[#ffae17] group-hover:text-[#111111]">
                  Xem chi tiết
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#151515] shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <div className="relative h-[220px] w-full sm:h-[320px] lg:h-[360px]">
            <Image
              src="/images/cho-dinh-yen.jpg"
              alt="Chợ Định Yên lúc canh ba"
              fill
              className="object-cover"
              sizes="1200px"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 max-w-2xl sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
              <div className="inline-flex rounded-full bg-black/50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffae17] backdrop-blur">
                Làng Định Yên
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                Khi phiên chợ lên đèn,<br /> mọi vai diễn đều có bí mật.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Câu chuyện Canh Ba bắt đầu từ một phiên chợ mù sương, nơi người
                sống và kẻ đã khuất lẫn vào nhau dưới ánh đèn dầu.
              </p>

              <Link
                href="/story"
                className="mt-5 inline-flex rounded-full bg-[#ffae17] px-6 py-3 text-sm font-black text-[#111111] transition hover:brightness-95"
              >
                Đọc câu chuyện
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex rounded-full bg-[#ffae17]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
            Điểm nổi bật
          </div>

          <h2 className="mt-4 text-[34px] font-black leading-tight tracking-[-0.05em] text-[#f2f2f2] sm:text-5xl">
            Một phiên chợ ít yên bình
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-[#181818] p-5 transition hover:-translate-y-1 hover:border-[#ffae17]/30 hover:bg-[#202020]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffae17] text-sm font-black text-[#111111]">
                0{index + 1}
              </div>

              <h3 className="text-xl font-black text-[#f2f2f2]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#a7a7a7]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* <section className="mx-auto w-full max-w-7xl px-4 py-8 pb-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#191919] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ffae17]/14 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex rounded-full bg-[#303030] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
              Hỗ trợ người chơi
            </div>

            <h2 className="mt-5 text-[32px] font-black leading-tight tracking-[-0.04em] text-[#f2f2f2] sm:text-5xl">
              Không rõ luật? Hỏi ngay trong lúc chơi.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#a7a7a7] sm:text-base">
              Chat AI Canh Ba có thể giải thích chức năng thẻ, cách xử lý tình
              huống và hỗ trợ phân xử các pha tranh luận trong ván.
            </p>

            <OpenChatButton className="mt-7 inline-flex h-14 items-center justify-center rounded-full bg-[#ffae17] px-8 text-base font-black text-[#111111] transition hover:brightness-95">
              Mở Chat luật
            </OpenChatButton>
          </div>
        </div>
      </section> */}
    </>
  );
}