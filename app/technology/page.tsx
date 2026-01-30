export default function TechnologyPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-3xl font-extrabold">Công nghệ hỗ trợ</h1>
            <p className="mt-3 text-zinc-300">
                AR giúp tăng trải nghiệm bối cảnh, chatbox giúp tra luật nhanh. Không bắt buộc,
                không thay thế tương tác trực tiếp.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-lg font-bold">AR (Augmented Reality)</div>
                    <p className="mt-2 text-sm text-zinc-300">
                        Quét một số thẻ/vật phẩm để thấy hiệu ứng/không gian chợ đêm minh hoạ.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-lg font-bold">Chatbox hỗ trợ luật</div>
                    <p className="mt-2 text-sm text-zinc-300">
                        Hỏi nhanh luật chơi, chức năng thẻ, tình huống thường gặp khi chơi.
                    </p>
                </div>
            </div>
        </main>
    );
}
