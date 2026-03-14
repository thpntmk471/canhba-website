import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-[100svh] bg-[#120506] text-[#f3ddb5]">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex rounded-full border border-[#d7a33d]/25 bg-[#2a0c0f]/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f3c768] sm:text-sm">
            Liên hệ dự án
          </div>

          <h1 className="mt-4 text-3xl font-extrabold uppercase leading-tight text-[#ffbf47] sm:text-4xl md:text-5xl">
            Kết nối với Canh Ba
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#e8d0aa]/80 sm:text-base md:text-lg">
            Thông tin liên hệ chính thức của dự án board game{" "}
            <span className="font-semibold text-[#ffcf72]">Canh Ba</span> do Veil Game phát triển.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-[#d7a33d]/15 bg-[linear-gradient(180deg,rgba(39,10,14,.92),rgba(18,6,8,.96))] p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#ffe3b2] sm:text-2xl">
              Thông tin liên hệ
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-[#ecd8b5]/85 sm:text-base">
              <div className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                  Đơn vị
                </div>
                <div className="mt-1 font-semibold text-[#ffe6b8]">
                  Công ty Cổ phần Veil Game — Dự án Canh Ba
                </div>
              </div>

              <div className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                  Địa chỉ
                </div>
                <div className="mt-1">
                  Số 600, đường Nguyễn Văn Cừ (nối dài), Phường An Bình, Thành phố Cần Thơ
                </div>
              </div>

              <div className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                  Email
                </div>
                <div className="mt-1 break-all">canhba.veilgame@gmail.com</div>
              </div>

              <div className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                  Fanpage
                </div>
                <Link
                  className="mt-1 inline-block underline decoration-[#ffbf47]/60 underline-offset-4 hover:opacity-80"
                  href="https://www.facebook.com/share/177JXhhxUV/?mibextid=wwXIfr"
                  target="_blank"
                >
                  Facebook CANHBA
                </Link>
              </div>

              <div className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                  Website
                </div>
                <div className="mt-1 break-all">www.canhba.site</div>
              </div>

              <div className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                  Thành lập
                </div>
                <div className="mt-1">26/01/2026</div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d7a33d]/15 bg-[#16090b]/90 p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#ffe3b2] sm:text-2xl">
              Tinh thần thương hiệu
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-[#e8d0aa]/80 sm:text-base">
              <p>
                Bộ nhận diện của Canh Ba lấy cảm hứng từ ánh đèn dầu, chợ đêm Nam Bộ,
                sắc đỏ trầm và vàng cháy, tạo cảm giác vừa dân gian vừa ma mị.
              </p>
              <p>
                Vì vậy giao diện website cũng được xây dựng theo cùng tinh thần:
                nền tối, nhấn vàng cam, bo góc như khung thẻ bài và bố cục chắc, rõ.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Đỏ rượu chủ đạo",
                "Vàng đèn dầu",
                "Không khí huyền bí",
                "Phong vị dân gian Nam Bộ",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 px-4 py-3 text-sm text-[#f0d7ac]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}