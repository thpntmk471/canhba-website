export default function ProductPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-3xl font-extrabold">Sản phẩm Canh Ba</h1>
            <p className="mt-3 text-zinc-300">
                Trang này sẽ chứa: mô tả chi tiết, thành phần, thông số kỹ thuật, luật tóm tắt.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                <ul className="space-y-2 text-sm text-zinc-300">
                    <li>• 4–12 người chơi • hidden role</li>
                    <li>• ~40 thẻ • Ivory 250g • 63.5 × 88.9 mm</li>
                    <li>• Hộp Bristol 300g</li>
                </ul>
            </div>
        </main>
    );
}
