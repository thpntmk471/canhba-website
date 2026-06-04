import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { canhbaKnowledge } from "@/app/data/canhbaKnowledge";

export const runtime = "nodejs";

type ChatIntent = "card_function" | "ruling" | "game_rule" | "group_list" | "general";

function normalizeText(value: string) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function detectIntent(message: string): ChatIntent {
  const text = normalizeText(message);

  if (
    text.includes("cac the ma") ||
    text.includes("phe ma") ||
    text.includes("nhom ma") ||
    text.includes("dan lang gom") ||
    text.includes("cac the dan") ||
    text.includes("bao vat gom") ||
    text.includes("cac bao vat") ||
    text.includes("danh sach")
  ) {
    return "group_list";
  }

  if (
    text.includes("tinh huong") ||
    text.includes("xu ly") ||
    text.includes("neu") ||
    text.includes("gap") ||
    text.includes("tranh cai") ||
    text.includes("uu tien") ||
    text.includes("vote") ||
    text.includes("bo phieu") ||
    text.includes("bi soi") ||
    text.includes("bi cam") ||
    text.includes("bi giet") ||
    text.includes("bi loai")
  ) {
    return "ruling";
  }

  if (
    text.includes("chuc nang") ||
    text.includes("tac dung") ||
    text.includes("cong dung") ||
    text.includes("lam gi") ||
    text.includes("the") ||
    text.includes("la bai")
  ) {
    return "card_function";
  }

  if (
    text.includes("luat") ||
    text.includes("cach choi") ||
    text.includes("thang") ||
    text.includes("phe") ||
    text.includes("canh") ||
    text.includes("cho tat den")
  ) {
    return "game_rule";
  }

  return "general";
}

function getKnowledgeRules() {
  return {
    answerRules: canhbaKnowledge.answerRules ?? [],
    generalRules: canhbaKnowledge.generalRules ?? canhbaKnowledge.rules ?? [],
  };
}

function getCardSearchTexts(card: any) {
  return [
    card.id,
    card.name,
    card.group,
    card.groupLabel,
    ...(Array.isArray(card.aliases) ? card.aliases : []),
  ]
    .filter(Boolean)
    .map(normalizeText);
}

function findRelevantCards(message: string) {
  const text = normalizeText(message);

  const exactMatches = canhbaKnowledge.cards.filter((card: any) => {
    const searchTexts = getCardSearchTexts(card);
    return searchTexts.some((value) => value && text.includes(value));
  });

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  const groupKeywords = [
    { keyword: "ma", group: "Ma" },
    { keyword: "dan lang", group: "Dân làng" },
    { keyword: "dan", group: "Dân làng" },
    { keyword: "bao vat", group: "Bảo vật" },
    { keyword: "vat pham", group: "Bảo vật" },
    { keyword: "quan tro", group: "Quản trò" },
    { keyword: "thay do", group: "Quản trò" },
  ];

  const matchedGroup = groupKeywords.find((item) => text.includes(item.keyword));

  if (matchedGroup) {
    return canhbaKnowledge.cards.filter(
      (card: any) =>
        normalizeText(card.group) === normalizeText(matchedGroup.group) ||
        normalizeText(card.groupLabel) === normalizeText(matchedGroup.group)
    );
  }

  return [];
}

function compactCards(cards: any[]) {
  return cards.map((card) => ({
    id: card.id,
    name: card.name,
    aliases: card.aliases ?? [],
    group: card.group,
    isPlayable: card.isPlayable,
    shortFunction: card.shortFunction,
    fullFunction: card.fullFunction,
    easyExplain: card.easyExplain,
    example: card.example,
  }));
}

function buildSystemPrompt() {
  return `
Bạn là chatbot luật chơi của board game Canh Ba.

NHIỆM VỤ:
- Giải thích chức năng thẻ bài.
- Giải thích luật chơi.
- Phân xử tình huống tranh cãi trong ván.
- Trả lời dễ hiểu cho người mới chơi.

NGUYÊN TẮC BẮT BUỘC:
- Chỉ dùng dữ liệu luật/thẻ được cung cấp.
- Không tự bịa luật mới.
- Không tự thêm chức năng thẻ.
- Nếu dữ liệu chưa đủ để phân xử, phải nói rõ: "Tình huống này chưa có luật ưu tiên rõ trong dữ liệu hiện tại."
- Nếu hỏi về thẻ không có trong dữ liệu, nói: "Mình chưa có dữ liệu thẻ này."
- Ưu tiên shortFunction/easyExplain khi giải thích.
- Nếu fullFunction và shortFunction khác nhau, ưu tiên shortFunction vì đó là bản đã chuẩn hóa.

CÁCH TRẢ LỜI KHI HỎI 1 THẺ:
1. Nêu tên thẻ + nhóm thẻ.
2. Giải thích chức năng bằng ngôn ngữ đơn giản.
3. Cho ví dụ ngắn nếu có.
4. Nếu thẻ không tham gia chơi, nói rõ vai trò.

CÁCH TRẢ LỜI KHI HỎI TÌNH HUỐNG:
1. Kết luận ngắn gọn.
2. Giải thích từng bước.
3. Nói rõ thẻ nào tác động trước/sau nếu dữ liệu có.
4. Nếu chưa có luật ưu tiên, đề xuất Thầy Đồ thống nhất trước ván.

GIỌNG VĂN:
- Tiếng Việt.
- Thân thiện.
- Ngắn gọn.
- Dễ hiểu.
- Không dài dòng.
- Có thể xưng "mình".
`;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
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
      relevantCards.length > 0
        ? compactCards(relevantCards)
        : intent === "general"
          ? []
          : compactCards(canhbaKnowledge.cards);

    const rules = getKnowledgeRules();

    const prompt = `
${buildSystemPrompt()}

CÂU HỎI NGƯỜI CHƠI:
${message}

Ý ĐỊNH CÂU HỎI:
${intent}

DỮ LIỆU LUẬT CHUNG:
${JSON.stringify(rules, null, 2)}

DỮ LIỆU THẺ LIÊN QUAN:
${JSON.stringify(cardsForAI, null, 2)}

YÊU CẦU TRẢ LỜI:
- Trả lời đúng trọng tâm câu hỏi.
- Nếu có thẻ liên quan, chỉ phân tích các thẻ liên quan.
- Nếu không tìm thấy thẻ liên quan mà câu hỏi hỏi luật chung, trả lời theo luật chung.
- Nếu không đủ dữ liệu, nói rõ là chưa đủ dữ liệu.
`;

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.25,
      },
    });

    return NextResponse.json({
      reply: response.text || "Mình chưa có phản hồi phù hợp.",
      intent,
      matchedCards: relevantCards.map((card: any) => card.name),
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