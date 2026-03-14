export default function ProductPage() {
  return (
    <main className="min-h-[100svh] bg-[#130607] text-[#f3ddb5]">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-[#d7a33d]/25 bg-[#2a0c0f]/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f3c768] sm:text-sm">
            Sản phẩm board game
          </div>

          <h1 className="mt-4 text-3xl font-extrabold uppercase leading-tight text-[#ffbf47] sm:text-4xl md:text-5xl">
            Sản phẩm Canh Ba
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#e8d0aa]/80 sm:text-base md:text-lg">
            Tổng quan nhanh về thành phần, thông số và trải nghiệm cốt lõi của bộ game
            <span className="font-semibold text-[#ffcf72]"> Canh Ba</span>.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-[#d7a33d]/15 bg-[linear-gradient(180deg,rgba(39,10,14,.92),rgba(18,6,8,.96))] p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#ffe3b2] sm:text-2xl">
              Thông tin nổi bật
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Số người chơi", value: "5–29 người" },
                { title: "Thể loại", value: "Hidden role / suy luận / tranh luận" },
                { title: "Số lượng thẻ", value: "40 thẻ" },
                { title: "Kích thước thẻ", value: "64 × 89 mm" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-6 text-[#ffe6b8] sm:text-base">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d7a33d]/15 bg-[#16090b]/90 p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#ffe3b2] sm:text-2xl">
              Trải nghiệm chơi
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-[#ecd8b5]/85 sm:text-base">
              <p>
                Canh Ba là board game mang màu sắc dân gian – kinh dị, nơi người chơi
                phải suy luận, tranh luận và tìm ra ai đang thuộc về phe người sống,
                ai đang là bóng tối ẩn mình trong chợ đêm.
              </p>

              <p>
                Thiết kế thẻ bài và hộp sử dụng bảng màu đỏ trầm, vàng cháy và nền tối,
                tạo cảm giác đồng nhất giữa sản phẩm vật lý và giao diện số.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-[#d7a33d]/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[#c89a42]">
                Nội dung sắp cập nhật
              </div>
              <div className="mt-3 space-y-2 text-sm text-[#f0d7ac]/85">
                <div>• Mô tả chi tiết từng thành phần</div>
                <div>• Luật tóm tắt</div>
                <div>• Vai trò và cách thắng</div>
                <div>• Bộ câu hỏi thường gặp</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}