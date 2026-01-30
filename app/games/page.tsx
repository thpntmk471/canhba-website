import Image from "next/image";
import Link from "next/link";

const games = [
    {
        slug: "catan",
        name: "Catan",
        desc: "Trade - build - settle. Game chiến thuật cực hợp chơi nhóm.",
        players: "3–4",
        time: "60–90p",
        level: "Strategy",
        img: "/images/demo-game-1.jpg",
        tags: ["Best-seller", "Strategy", "Group"],
    },
    {
        slug: "uno",
        name: "UNO",
        desc: "Party nhanh gọn, ai cũng chơi được. Càng đông càng vui.",
        players: "2–10",
        time: "15–30p",
        level: "Party",
        img: "/images/demo-game-2.jpg",
        tags: ["Party", "Family", "Easy"],
    },
    {
        slug: "splendor",
        name: "Splendor",
        desc: "Thu thập ngọc, mua thẻ, đua điểm. Nhìn đơn giản nhưng cuốn.",
        players: "2–4",
        time: "30–45p",
        level: "Strategy",
        img: "/images/demo-game-3.jpg",
        tags: ["Strategy", "Chill", "Elegant"],
    },
];

export default function GamesPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold">Board games</h1>
                    <p className="mt-2 text-zinc-300">
                        Khám phá các game nổi bật — có tóm tắt luật, tips, và hỏi luật bằng AI.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/chat"
                        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                    >
                        🤖 Hỏi luật
                    </Link>
                    <Link
                        href="/"
                        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                    >
                        Liên hệ hợp tác
                    </Link>
                </div>
            </div>

            {/* Filter (demo UI) */}
            <div className="mt-6 flex flex-wrap gap-2">
                {["All", "Party", "Strategy", "Family", "2 Players"].map((t) => (
                    <button
                        key={t}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
                {games.map((g) => (
                    <div
                        key={g.slug}
                        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                    >
                        <div className="relative h-44 w-full">
                            <Image
                                src={g.img}
                                alt={g.name}
                                fill
                                className="object-cover opacity-90 transition group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                                {g.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-zinc-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-lg font-bold">{g.name}</div>
                                    <div className="mt-1 text-sm text-zinc-300">{g.desc}</div>
                                </div>
                                <span className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-1 text-xs text-zinc-200">
                                    {g.level}
                                </span>
                            </div>

                            <div className="mt-4 flex gap-2 text-xs text-zinc-300">
                                <span className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-1">
                                    👥 {g.players}
                                </span>
                                <span className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-1">
                                    ⏱️ {g.time}
                                </span>
                            </div>

                            <div className="mt-5 flex gap-2">
                                <Link
                                    href={`/games/${g.slug}`}
                                    className="flex-1 rounded-xl bg-white px-4 py-2 text-center text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                                >
                                    Xem chi tiết
                                </Link>
                                <Link
                                    href="/chat"
                                    className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-center text-sm font-semibold hover:bg-white/10"
                                >
                                    Hỏi luật
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="text-xl font-bold">Bạn muốn game phù hợp nhóm bạn?</div>
                <p className="mt-2 text-zinc-300">
                    Nhắn cho CANHBA để được gợi ý game theo số người, thời gian, độ khó.
                </p>
                <div className="mt-4 flex gap-3">
                    <Link
                        href="/chat"
                        className="rounded-xl bg-white px-5 py-3 font-semibold text-zinc-950 hover:bg-zinc-200"
                    >
                        🤖 Chat tư vấn
                    </Link>
                    <Link
                        href="/"
                        className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
                    >
                        Liên hệ hợp tác
                    </Link>
                </div>
            </div>
        </main>
    );
}
