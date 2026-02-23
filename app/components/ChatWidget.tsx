"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "bot"; text: string };

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [msgs, setMsgs] = useState<Msg[]>([
        { role: "bot", text: "Chào bạn! Bạn hỏi mình về card game nhé." },
    ]);

    const listRef = useRef<HTMLDivElement>(null);

    const [sessionId] = useState(() => {
        if (typeof window === "undefined") return "web";
        const key = "canhba_chat_session";
        const existing = localStorage.getItem(key);
        if (existing) return existing;
        const v = Math.random().toString(36).slice(2);
        localStorage.setItem(key, v);
        return v;
    });

    useEffect(() => {
        if (!open) return;
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [msgs, open]);

    async function send(text: string) {
        const t = text.trim();
        if (!t || loading) return;

        setMsgs((m) => [...m, { role: "user", text: t }]);
        setInput("");
        setLoading(true);

        try {
            const r = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: t, sessionId }),
            });

            const data = await r.json();
            const reply = String(data?.reply ?? "Mình chưa nhận được phản hồi.");

            setMsgs((m) => [...m, { role: "bot", text: reply }]);
        } catch {
            setMsgs((m) => [...m, { role: "bot", text: "Lỗi mạng rồi, bạn thử lại nhé." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Nút nổi */}
            <button
                onClick={() => setOpen((v) => !v)}
                style={{
                    position: "fixed",
                    right: 16,
                    bottom: 16,
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
                    zIndex: 9999,
                }}
                aria-label="Open chat"
            >
                💬
            </button>

            {/* Khung chat */}
            {open && (
                <div
                    style={{
                        position: "fixed",
                        right: 16,
                        bottom: 80,
                        width: 360,
                        maxWidth: "calc(100vw - 32px)",
                        height: 520,
                        maxHeight: "calc(100vh - 120px)",
                        borderRadius: 16,
                        background: "#0b0b0b",
                        color: "#fff",
                        boxShadow: "0 10px 40px rgba(0,0,0,.35)",
                        overflow: "hidden",
                        zIndex: 9999,
                        border: "1px solid rgba(255,255,255,.08)",
                    }}
                >
                    <div style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ fontWeight: 700 }}>Canh Ba – Game Assistant</div>
                        <div style={{ fontSize: 12, opacity: 0.75 }}>
                            Hỏi luật chơi / lá bài / tình huống
                        </div>
                    </div>

                    <div
                        ref={listRef}
                        style={{ padding: 12, height: "calc(100% - 120px)", overflowY: "auto" }}
                    >
                        {msgs.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: 10,
                                    display: "flex",
                                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "85%",
                                        padding: "10px 12px",
                                        borderRadius: 14,
                                        background: m.role === "user" ? "#2563eb" : "rgba(255,255,255,.08)",
                                        whiteSpace: "pre-wrap",
                                        lineHeight: 1.35,
                                    }}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div style={{ opacity: 0.8, fontSize: 13 }}>Đang trả lời...</div>}
                    </div>

                    <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") send(input);
                                }}
                                placeholder="Nhập câu hỏi…"
                                style={{
                                    flex: 1,
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,.15)",
                                    background: "transparent",
                                    color: "#fff",
                                    outline: "none",
                                }}
                            />
                            <button
                                onClick={() => send(input)}
                                disabled={loading}
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "none",
                                    background: "#fff",
                                    color: "#000",
                                    cursor: "pointer",
                                    opacity: loading ? 0.7 : 1,
                                }}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}