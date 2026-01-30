import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-3xl font-extrabold">Liên hệ</h1>
            <p className="mt-3 text-zinc-300">
                Công ty Cổ phần Veil Game — Dự án Canh Ba
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
                <div><b>Địa chỉ:</b> 600 Nguyễn Văn Cừ Nối Dài, An Bình, Bình Thủy, Cần Thơ 900000</div>
                <div className="mt-2"><b>Email:</b> canhba.veilgame@gmail.com</div>
                <div className="mt-2">
                    <b>Fanpage:</b>{" "}
                    <Link
                        className="underline hover:opacity-80"
                        href="https://www.facebook.com/profile.php?id=61587152098884"
                        target="_blank"
                    >
                        Facebook CANHBA
                    </Link>
                </div>
                <div className="mt-2"><b>Website:</b> www.canhba.site</div>
                <div className="mt-2"><b>Established:</b> 26/1/2026</div>
            </div>
        </main>
    );
}
