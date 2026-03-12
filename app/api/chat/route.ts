import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const N8N_URL = process.env.N8N_WEBHOOK_URL;

    if (!N8N_URL) {
      return NextResponse.json(
        { reply: "Server thiếu N8N_WEBHOOK_URL." },
        { status: 500 }
      );
    }

    const { message, sessionId, inputType } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Bạn gửi câu hỏi giúp mình nhé ok." },
        { status: 400 }
      );
    }

    const r = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: sessionId ?? "web",
        inputType: inputType ?? "text",
      }),
    });

    const raw = await r.text();

    let data: any = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = { raw };
    }

    return NextResponse.json({
      reply: data.reply ?? data.output ?? data.raw ?? "Không có phản hồi.",
      inputType: inputType ?? "text",
    });
  } catch (e: any) {
    return NextResponse.json(
      { reply: "Lỗi server.", error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}