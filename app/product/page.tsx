"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import OpenChatButton from "../components/OpenChatButton";
import ProductCardLibrary from "./ProductCardLibrary";

const galleryImages = [
  { src: "/images/product-main-1.jpg", alt: "Bộ bài Canh Ba" },
  { src: "/images/product-box-1.jpg", alt: "Hộp bài Canh Ba" },
  { src: "/images/product-cards.jpg", alt: "Các thẻ bài Canh Ba" },
  { src: "/images/lu-khach.jpg", alt: "Không khí chợ Định Yên" },
];

const quickInfo = [
  { label: "Số người chơi", value: "5–29" },
  { label: "Thời lượng", value: "25–45 phút" },
  { label: "Thể loại", value: "Hidden role" },
  { label: "Nhóm thẻ", value: "Ma • Dân làng • Bảo vật" },
];

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <>
      {/* Section gallery + thông tin bộ bài */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-7 rounded-[36px] border border-white/10 bg-[#181818] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-7 lg:grid-cols-[0.98fr_1.02fr] lg:p-8">

          {/* Gallery chính + thumbnail */}
          <div className="rounded-[30px] border border-white/10 bg-[#101010] p-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#0b0b0b]">
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                className="object-cover transition duration-500"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {galleryImages.map((image) => {
                const active = activeImage.src === image.src;
                return (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`relative aspect-square overflow-hidden rounded-2xl border transition duration-300 bg-[#151515] ${active
                        ? "border-[#ffae17] ring-2 ring-[#ffae17]/35"
                        : "border-white/10 hover:border-[#ffae17]/50"
                      }`}
                    aria-label={`Xem ảnh ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition duration-300 ${active ? "scale-105 opacity-100" : "opacity-75 hover:opacity-100"
                        }`}
                      sizes="120px"
                    />
                    {active && <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ffae17]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Thông tin bộ bài */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit rounded-full bg-[#ffae17]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
              Board game suy luận • AR • AI
            </div>

            <h1 className="max-w-2xl text-[44px] font-black leading-[0.98] tracking-[-0.06em] text-[#f3f3f3] sm:text-6xl">
              Canh Ba
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#b8b8b8] sm:text-lg">
              Một board game suy luận, nhập vai và tranh luận lấy cảm hứng từ
              chợ đêm Định Yên. Người chơi bước vào phiên chợ lúc Canh Ba,
              nơi Ma, Dân làng và Bảo vật cùng tạo nên một ván chơi đầy nghi ngờ.
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
              <a
                href="#card-library"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#ffae17] px-7 text-sm font-black text-[#111111] transition hover:brightness-95"
              >
                Xem thẻ bài
              </a>

              <OpenChatButton className="inline-flex h-13 items-center justify-center rounded-full border border-white/10 bg-[#252525] px-7 text-sm font-black text-[#f2f2f2] transition hover:bg-[#303030]">
                Hỏi luật nhanh
              </OpenChatButton>
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <h2 className="text-lg font-black text-[#f2f2f2]">
                Bộ bài gồm 3 nhóm chính
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#a7a7a7]">
                Dân làng dùng suy luận để tìm ra điều bất thường. Phe Ma che giấu
                thân phận và thao túng cuộc tranh luận. Bảo vật tạo thêm biến số
                giúp ván chơi bất ngờ hơn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Phần thẻ bài vẫn giữ nguyên === */}
      <ProductCardLibrary />

      {/* Call to action cuối trang */}
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