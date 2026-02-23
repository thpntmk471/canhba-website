import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Bạn gửi câu hỏi giúp mình nhé." }, { status: 400 });
    }

    const N8N_URL = process.env.N8N_WEBHOOK_URL;
    if (!N8N_URL) {
      return NextResponse.json({ reply: "Server thiếu N8N_WEBHOOK_URL." }, { status: 500 });
    }

    const r = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: sessionId ?? "web",
      }),
    });

    const text = await r.text();
    // n8n trả JSON {"reply": "..."}
    let data: any = {};
    try { data = JSON.parse(text); } catch { data = { reply: text }; }

    return NextResponse.json({ reply: data.reply ?? data.output ?? "Không có phản hồi." });
  } catch (e: any) {
    return NextResponse.json({ reply: "Lỗi server.", error: String(e?.message ?? e) }, { status: 500 });
  }
}