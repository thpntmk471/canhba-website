import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { canhbaKnowledge } from "@/app/data/canhbaKnowledge";

export const runtime = "nodejs";

function removeVietnameseTone(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function detectIntent(message: string) {
  const text = removeVietnameseTone(message);

  if (
    text.includes("chuc nang") ||
    text.includes("tac dung") ||
    text.includes("the") ||
    text.includes("la bai")
  ) {
    return "card_function";
  }

  if (
    text.includes("tinh huong") ||
    text.includes("xu ly") ||
    text.includes("neu") ||
    text.includes("tranh cai") ||
    text.includes("uu tien") ||
    text.includes("vote") ||
    text.includes("bo phieu")
  ) {
    return "ruling";
  }

  if (
    text.includes("luat") ||
    text.includes("cach choi") ||
    text.includes("thang") ||
    text.includes("phe")
  ) {
    return "game_rule";
  }

  return "general";
}

function findRelevantCards(message: string) {
  const text = removeVietnameseTone(message);

  return canhbaKnowledge.cards.filter((card) => {
    const cardName = removeVietnameseTone(card.name);
    const cardGroup = removeVietnameseTone(card.group);

    return text.includes(cardName) || text.includes(cardGroup);
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "Server thiếu GEMINI_API_KEY trong file .env.local." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message = body?.message;
    const sessionId = body?.sessionId ?? "web";
    const inputType = body?.inputType ?? "text";

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Bạn gửi câu hỏi giúp mình nhé." },
        { status: 400 }
      );
    }

    const intent = detectIntent(message);
    const relevantCards = findRelevantCards(message);

    const cardsForAI =
      relevantCards.length > 0 ? relevantCards : canhbaKnowledge.cards;

    const systemPrompt = `
Bạn là chatbot hỏi luật cho board game Canh Ba.

Nhiệm vụ:
- Giải thích luật chơi.
- Giải thích chức năng thẻ bài.
- Phân xử tình huống khi người chơi tranh cãi.
- Trả lời bằng tiếng Việt, thân thiện, dễ hiểu.
- Chỉ dựa trên dữ liệu luật/thẻ được cung cấp.
- Không tự bịa luật mới.
- Nếu thiếu dữ liệu, hãy nói rõ: "Phần này chưa có trong dữ liệu luật hiện tại."

Cách trả lời:
Nếu hỏi chức năng thẻ:
1. Tên thẻ
2. Nhóm thẻ
3. Chức năng
4. Ví dụ ngắn nếu cần

Nếu hỏi tình huống:
1. Kết luận
2. Giải thích
3. Cách xử lý trong ván
4. Ghi chú nếu luật chưa đủ rõ

Nếu hỏi chung:
- Trả lời ngắn gọn, đúng trọng tâm.
`;

    const prompt = `
${systemPrompt}

Câu hỏi người chơi:
${message}

Ý định câu hỏi:
${intent}

Dữ liệu luật chung:
${JSON.stringify(canhbaKnowledge.rules, null, 2)}

Dữ liệu thẻ liên quan:
${JSON.stringify(cardsForAI, null, 2)}
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      reply: response.text || "Không có phản hồi.",
      intent,
      sessionId,
      inputType,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        reply: "Lỗi server khi gọi chatbot.",
        error: String(e?.message ?? e),
      },
      { status: 500 }
    );
  }
}