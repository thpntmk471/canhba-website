import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Cache để khỏi đọc file mỗi request (Vercel vẫn ok)
let cache: {
  system?: string;
  rules?: string;
  rulings?: string;
  fewshot?: string;
} = {};

function readSafe(filePath: string) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "";
}

function loadKnowledge() {
  if (cache.system && cache.rules) return cache;

  const base = path.join(process.cwd(), "src", "data");
  cache.system = readSafe(path.join(base, "bot_system.md"));
  cache.rules = readSafe(path.join(base, "rules.md"));
  cache.rulings = readSafe(path.join(base, "rulings.md"));
  cache.fewshot = readSafe(path.join(base, "fewshot.md"));

  return cache;
}

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Bạn gửi câu hỏi giúp mình nhé." },
        { status: 400 }
      );
    }

    const N8N_URL = process.env.N8N_WEBHOOK_URL;
    if (!N8N_URL) {
      return NextResponse.json(
        { reply: "Server thiếu N8N_WEBHOOK_URL." },
        { status: 500 }
      );
    }

    const kb = loadKnowledge();

    const r = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: sessionId ?? "web",
        // gửi kèm kiến thức để n8n ghép prompt
        system: kb.system ?? "",
        rules: kb.rules ?? "",
        rulings: kb.rulings ?? "",
        fewshot: kb.fewshot ?? "",
      }),
    });

    const text = await r.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { reply: text };
    }

    return NextResponse.json({
      reply: data.reply ?? data.output ?? "Không có phản hồi.",
    });
  } catch (e: any) {
    return NextResponse.json(
      { reply: "Lỗi server.", error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}