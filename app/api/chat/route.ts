import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const N8N_URL = process.env.N8N_WEBHOOK_URL;
    if (!N8N_URL) {
      return NextResponse.json({ reply: "Server thiếu N8N_WEBHOOK_URL." }, { status: 500 });
    }

    const contentType = req.headers.get("content-type") || "";

    // VOICE: multipart/form-data
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const audio = form.get("audio") as File | null;
      const sessionId = (form.get("sessionId") as string) ?? "web";
      const inputType = (form.get("inputType") as string) ?? "voice";

      if (!audio) {
        return NextResponse.json({ reply: "Thiếu file audio." }, { status: 400 });
      }

      const fd = new FormData();
      fd.append("audio", audio, audio.name || "voice.webm");
      fd.append("sessionId", sessionId);
      fd.append("inputType", inputType);

      const r = await fetch(N8N_URL, { method: "POST", body: fd });
      const data = await r.json().catch(async () => ({ reply: await r.text() }));

      return NextResponse.json({ reply: data.reply ?? "Không có phản hồi.", inputType: "voice" });
    }

    // TEXT: application/json
    const { message, sessionId, inputType } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Bạn gửi câu hỏi giúp mình nhé." }, { status: 400 });
    }

    const r = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId: sessionId ?? "web", inputType: inputType ?? "text" }),
    });

    const data = await r.json().catch(async () => ({ reply: await r.text() }));

    return NextResponse.json({ reply: data.reply ?? "Không có phản hồi.", inputType: "text" });
  } catch (e: any) {
    return NextResponse.json({ reply: "Lỗi server.", error: String(e?.message ?? e) }, { status: 500 });
  }
}