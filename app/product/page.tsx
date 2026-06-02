import Link from "next/link";
import OpenChatButton from "../components/OpenChatButton";
import ProductCardLibrary from "./ProductCardLibrary";

const quickInfo = [
  { label: "Số người chơi", value: "5–29" },
  { label: "Thời lượng", value: "25–45 phút" },
  { label: "Thể loại", value: "Hidden role" },
  { label: "Nhóm thẻ", value: "Ma • Dân làng • Bảo vật" },
];

export default function ProductPage() {
  return (
    <>
      {/* <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#191919] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ffae17]/16 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ffae17]/8 blur-3xl" />

            <div className="relative">
              <div className="inline-flex rounded-full bg-[#303030] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
                Bộ bài Canh Ba
              </div>

              <h1 className="mt-6 max-w-4xl text-[42px] font-black leading-[0.98] tracking-[-0.06em] text-[#f3f3f3] sm:text-6xl lg:text-7xl">
                Thư viện thẻ bài Ma, Dân làng và Bảo vật.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c8c8c8] sm:text-lg">
                Trang này dùng để giới thiệu toàn bộ thẻ trong bộ bài Canh Ba.
                Người chơi có thể lọc theo nhóm thẻ, tìm nhanh tên thẻ và mở
                chi tiết để xem mô tả vai trò hoặc chức năng.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#card-library"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffae17] px-8 text-base font-black text-[#111111] shadow-[0_18px_40px_rgba(255,174,23,0.22)] transition hover:-translate-y-0.5 hover:brightness-95"
                >
                  Xem thư viện thẻ
                </a>

                <OpenChatButton className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-[#252525] px-8 text-base font-bold text-[#f2f2f2] transition hover:-translate-y-0.5 hover:bg-[#2d2d2d]">
                  Hỏi luật nhanh
                </OpenChatButton>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-[34px] border border-white/10 bg-[#151515] p-4 sm:grid-cols-2 lg:p-5">
            {quickInfo.map((item) => (
              <div
                key={item.label}
                className="rounded-[26px] border border-white/10 bg-[#202020] p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b8b8b]">
                  {item.label}
                </div>

                <div className="mt-3 text-xl font-black text-[#f2f2f2]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <ProductCardLibrary />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 pb-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#191919] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ffae17]/14 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-[#303030] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
                Sẵn sàng vào ván?
              </div>

              <h2 className="mt-5 text-[32px] font-black leading-tight tracking-[-0.04em] text-[#f2f2f2] sm:text-5xl">
                Chọn vai, giữ bí mật và bắt đầu phiên chợ lúc canh ba.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#a7a7a7] sm:text-base">
                Khi người chơi chưa rõ luật hoặc cần tra nhanh chức năng thẻ,
                có thể dùng Chat AI để hỏi luật ngay trong quá trình chơi.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <OpenChatButton className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffae17] px-8 text-base font-black text-[#111111] transition hover:brightness-95">
                Hỏi luật ngay
              </OpenChatButton>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-[#252525] px-8 text-base font-bold text-[#f2f2f2] transition hover:bg-[#303030]"
              >
                Liên hệ dự án
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}