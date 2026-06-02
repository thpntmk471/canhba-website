import Image from "next/image";
import Link from "next/link";

export default function ChatPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#140607] text-[#f6dfb4]">
      {/* nền */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,138,0,0.16),transparent_32%),radial-gradient(circle_at_bottom,rgba(120,8,18,0.32),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,190,120,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,190,120,.18)_1px,transparent_1px)] [background-size:26px_26px]" />

      <section className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7a33d]/30 bg-[#2a0c0f]/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#f3c768] backdrop-blur sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#ff7a1a]" />
              Canh Ba AI Assistant
            </div>

            <h1 className="mt-5 text-3xl font-extrabold uppercase leading-tight text-[#ffbf47] sm:text-4xl md:text-5xl lg:text-6xl">
              Canh ba đã điểm,
              <br />
              <span className="text-[#ffe6b8]">hỏi luật ngay tại đây</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#ecd4ad]/82 sm:text-base md:text-lg">
              Tra nhanh luật chơi, vai trò, cách xử lý tình huống và các ruling đặc
              biệt trong <span className="font-semibold text-[#ffbf47]">Canh Ba</span>.
              Giao diện được thiết kế theo đúng tinh thần chợ đêm Nam Bộ, ánh đèn dầu
              và không khí huyền bí của bộ game.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#chat-widget"
                className="inline-flex items-center justify-center rounded-2xl border border-[#ffbf47]/40 bg-[#ffbf47] px-5 py-3 text-sm font-bold text-[#2a0c0f] transition hover:brightness-95 sm:text-base"
              >
                Mở khung chat
              </Link>

              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-2xl border border-[#f3c768]/20 bg-[#2a0c0f]/70 px-5 py-3 text-sm font-semibold text-[#f3d9af] transition hover:bg-[#351015] sm:text-base"
              >
                Xem sản phẩm
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Hỗ trợ", value: "Luật chơi" },
                { label: "Nhập liệu", value: "Text + Mic" },
                { label: "Số người", value: "4–12 người" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#d7a33d]/15 bg-[#1b080b]/80 p-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#c89a42]/70 sm:text-xs">
                    {item.label}
                  </div>
                  <div className="mt-2 text-base font-bold text-[#ffe1a6] sm:text-lg">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
            <div className="absolute -inset-4 rounded-[28px] bg-[radial-gradient(circle,rgba(255,136,0,.18),transparent_55%)] blur-3xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-[#d7a33d]/20 bg-[linear-gradient(180deg,rgba(10,20,24,.92),rgba(18,5,7,.96))] p-4 shadow-[0_20px_60px_rgba(0,0,0,.45)] sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[#d7a33d]/10 pb-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c89a42]">
                    Giao diện tra luật
                  </div>
                  <div className="mt-1 text-lg font-bold text-[#ffe6b8] sm:text-xl">
                    Đậm chất Canh Ba
                  </div>
                </div>

                <div className="rounded-xl border border-[#ffbf47]/20 bg-[#2a0c0f]/60 px-3 py-1 text-xs text-[#ffcf72]">
                  Live
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] border border-[#d7a33d]/15 bg-[#25080b]">
                  <Image
                    src="/images/canhba-logo.jpg"
                    alt="Logo Canh Ba"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    priority
                  />
                </div>

                <div className="rounded-[22px] border border-[#d7a33d]/15 bg-[#16090b]/90 p-4 sm:p-5">
                  <div className="text-sm font-semibold text-[#ffcf72]">
                    Ví dụ bạn có thể hỏi:
                  </div>

                  <div className="mt-4 space-y-3 text-sm leading-6 text-[#ead7b5]/85">
                    <div className="rounded-xl border border-[#d7a33d]/10 bg-white/5 p-3">
                      “Ma Đói thắng trong điều kiện nào?”
                    </div>
                    <div className="rounded-xl border border-[#d7a33d]/10 bg-white/5 p-3">
                      “Nếu bị nghi oan thì xử lý sao?”
                    </div>
                    <div className="rounded-xl border border-[#d7a33d]/10 bg-white/5 p-3">
                      “Tóm tắt luật nhanh trong 30 giây.”
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-[#caa46b]/80 sm:text-sm">
                    Thiết kế ưu tiên trải nghiệm tốt trên laptop, tablet và điện thoại,
                    đồng thời giữ đúng màu sắc chủ đạo của bộ nhận diện.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* chỗ gắn chatwidget */}
        <div
          id="chat-widget"
          className="mt-10 rounded-[28px] border border-[#d7a33d]/15 bg-[#1a090b]/75 p-5 text-center text-sm text-[#dbc39c]/80 sm:mt-14 sm:p-8 sm:text-base"
        >
          Khung chat AI của bạn sẽ hiển thị tại đây hoặc ở floating widget góc màn hình.
        </div>
      </section>
    </main>
  );
}