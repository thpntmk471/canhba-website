import Image from "next/image";
import Link from "next/link";

const storyParagraphs = [
    `Làng Định Yên, nơi mà ở cái làng đó bà con lối xóm truyền miệng nhau cái câu nói rợn người lắm: “Canh ba mà mấy đứa yếu vía còn lảng vảng ngoài chợ là dễ thấy mấy thứ không nên thấy lắm.”`,

    `Cái xứ miền Tây sông nước này, người ta kể chuyện ma tỉnh queo như mùa nước nổi vậy đó. Bởi vì có lẽ mấy câu chuyện đó len lỏi vào đời sống của họ từ hồi còn nhỏ xíu. Mấy ông bà lớn tuổi, miệng nhai trầu, uống trà dưới hiên nhà, hay được đám con nít xúm lại nghe kể chuyện ma lắm. Ai cũng nói có cõi dương thì có tồn tại cõi âm. Hai cõi song song không được phạm nhau.`,

    `Mà tôi đây, một lữ khách đường xa ghé qua, khi nghe thấy cũng chỉ để ngoài tai. Tôi làm gì tin mấy chuyện dị đoan đó. Tôi đã đi qua biết bao nhiêu nơi rồi, có từng gặp gì đâu. Cũng đâu quan tâm tới câu nói truyền miệng của bà con nơi này.`,

    `Đêm đó tôi đi dạo chợ đêm. Hàng quán, sạp chợ tấp nập người buôn kẻ bán. Tiếng rao, tiếng cười nhộn nhịp cả buổi chợ.`,

    `Rồi tiếng gà gáy canh ba vang lên từ phía xa xa. Màn sương đục ngầu từ mé sông bò lên phủ kín mít. Tự dưng mấy cây đèn dầu treo dọc chợ sáng lên leo lét, dù rõ ràng hồi chiều tôi thấy người ta đã dẹp hết rồi.`,

    `Từ bên kia màn sương trắng, tôi thấy lờ mờ bóng người. Không nghĩ nhiều, tôi bước qua mà đâu hề hay biết mình vừa bước qua cánh cửa dẫn vào cõi âm — cõi người chết.`,

    `Vẫn là khu chợ đó mà sao cảm giác kỳ lạ lắm. Vẫn tiếng rao đó, sạp hàng đó, nhưng sao sống lưng tôi lạnh ngắt.`,

    `Người ở đây mắt họ đen thui, sâu hoắm, không có chút ánh sáng của người sống. Nụ cười ai cũng cứng ngắc như mặt nạ gỗ. Có vài gương mặt méo xệch, trắng bệch, y chang mấy cái hình thờ mà tôi đã thấy qua ở nhà vài bà con mà tôi đã ghé qua. Vậy mà họ vẫn đứng đó, đi qua đi lại giữa chợ như chưa từng xuống mồ.`,

    `Tôi bước đi bước đầu, đột nhiên cả chợ im bặt. Đồng loạt tất cả đều dán chặt ánh mắt vào tôi. Cái cảm giác đó… giống như mình là miếng thịt sống bị quăng giữa bầy cá sấu dưới mùa nước lớn.`,

    `Tôi đứng chết trân, không dám thở mạnh. Giữa cái phiên chợ đông nghẹt ấy, tôi biết rõ chỉ có mình tôi là người còn sống. Một thế giới khác đã mở ra ngay trước mắt tôi — vẫn là cái chợ ấy, vẫn con đường ấy, nhưng thuộc về những kẻ không còn thuộc về dương gian nữa.`,

    `Tới lúc gà gáy sáng, sương bắt đầu tan. Mấy bóng người mờ dần rồi biến mất như chưa từng tồn tại. Đèn dầu tắt phụt. Cả khu chợ trống trơn, lạnh ngắt. Chỉ còn tôi đứng đó với hai chân run bần bật và cái lạnh bò dọc sống lưng tới tận bây giờ vẫn chưa hết.`,
];

const loreCards = [
    {
        title: "Làng Định Yên",
        desc: "Một làng nghề miền Tây, nơi chuyện người sống và người chết không hoàn toàn tách biệt.",
    },
    {
        title: "Phiên chợ Canh Ba",
        desc: "Khi sương phủ kín mé sông, chợ cũ mở ra cho những kẻ không còn thuộc về dương gian.",
    },
    {
        title: "Lữ khách",
        desc: "Người ngoài làng, không tin chuyện ma quỷ, cho đến khi chính mình bước nhầm vào phiên chợ âm.",
    },
];

export default function StoryPage() {
    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#151515] shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
                    <div className="relative h-[180px] w-full sm:h-[280px] lg:h-[380px] xl:h-[420px]">
                        <Image
                            src="/images/cho-dinh-yen.jpg"
                            alt="Chợ Định Yên lúc canh ba"
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
                            <div className="inline-flex rounded-full bg-black/50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffae17] backdrop-blur">
                                Câu chuyện mở đầu
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 max-w-3xl sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
                            <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                                Khi Canh Ba điểm
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
                                Chợ Định Yên không còn là chợ của người sống. Một lữ khách vô
                                tình bước qua màn sương và nhìn thấy những thứ không nên thấy.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <a
                                    href="#doc-truyen"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#ffae17] px-6 text-sm font-black text-[#111111] transition hover:brightness-95"
                                >
                                    Đọc câu chuyện
                                </a>

                                <Link
                                    href="/product"
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-black/40 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-black/60"
                                >
                                    Xem thẻ bài
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-3">
                    {loreCards.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-[28px] border border-white/10 bg-[#1f1f1f] p-5"
                        >
                            <h2 className="text-xl font-black text-[#f2f2f2]">
                                {item.title}
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-[#a7a7a7]">
                                {item.desc}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                id="doc-truyen"
                className="mx-auto w-full max-w-4xl px-4 py-8 pb-14 sm:px-6 lg:px-8"
            >
                <article className="rounded-[34px] border border-white/10 bg-[#191919] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
                    <div className="mb-8 border-b border-white/10 pb-6">
                        <div className="inline-flex rounded-full bg-[#303030] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffae17]">
                            Truyện ngắn
                        </div>

                        <h2 className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[#f2f2f2] sm:text-5xl">
                            Phiên chợ của người chết
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#a7a7a7] sm:text-base">
                            Một đoạn truyện dẫn người xem vào bối cảnh trước khi khám phá các
                            thẻ Ma, Dân làng và Bảo vật trong bộ bài.
                        </p>
                    </div>

                    <div className="space-y-5 text-base leading-8 text-[#cfcfcf]">
                        {storyParagraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </article>
            </section>
        </>
    );
}