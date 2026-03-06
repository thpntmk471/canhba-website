"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "bot"; text: string };

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);

    const [msgs, setMsgs] = useState<Msg[]>([
        { role: "bot", text: "Chào bạn! Bạn hỏi mình về card game nhé." },
    ]);

    const listRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);

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

    function speakVI(text: string) {
        try {
            const u = new SpeechSynthesisUtterance(text);
            u.lang = "vi-VN";
            speechSynthesis.cancel();
            speechSynthesis.speak(u);
        } catch {
            // ignore
        }
    }

    async function sendText(text: string) {
        const t = text.trim();
        if (!t || loading || recording) return;

        setMsgs((m) => [...m, { role: "user", text: t }]);
        setInput("");
        setLoading(true);

        try {
            const r = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: t, sessionId, inputType: "text" }),
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

    async function sendVoice(blob: Blob) {
        if (loading) return;
        setLoading(true);

        try {
            // (Tuỳ bạn) show user bubble cho voice:
            setMsgs((m) => [...m, { role: "user", text: "🎤 (voice)" }]);

            const fd = new FormData();
            fd.append("audio", blob, "voice.webm");
            fd.append("sessionId", sessionId);
            fd.append("inputType", "voice");

            const r = await fetch("/api/chat", { method: "POST", body: fd });
            const data = await r.json();

            const reply = String(data?.reply ?? "Mình chưa nhận được phản hồi.");

            // Voice mode: ĐỌC BẰNG GIỌNG
            speakVI(reply);

            // Nếu bạn muốn vẫn hiện chữ kèm theo thì mở comment dòng dưới:
            // setMsgs((m) => [...m, { role: "bot", text: reply }]);
        } catch {
            setMsgs((m) => [...m, { role: "bot", text: "Lỗi mạng rồi, bạn thử lại nhé." }]);
        } finally {
            setLoading(false);
        }
    }

    async function startRecording() {
        if (recording || loading) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });

            chunksRef.current = [];
            mr.ondataavailable = (e) => chunksRef.current.push(e.data);

            mr.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                stream.getTracks().forEach((t) => t.stop());
                await sendVoice(blob);
            };

            mediaRecorderRef.current = mr;
            mr.start();
            setRecording(true);
        } catch {
            setMsgs((m) => [...m, { role: "bot", text: "Không xin được quyền micro 😥 Bạn bật mic rồi thử lại nhé." }]);
        }
    }

    function stopRecording() {
        if (!recording) return;
        mediaRecorderRef.current?.stop();
        setRecording(false);
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
                        <div style={{ fontSize: 12, opacity: 0.75 }}>Hỏi luật chơi / lá bài / tình huống</div>
                    </div>

                    <div ref={listRef} style={{ padding: 12, height: "calc(100% - 120px)", overflowY: "auto" }}>
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
                        {(loading || recording) && (
                            <div style={{ opacity: 0.8, fontSize: 13 }}>
                                {recording ? "Đang ghi âm... bấm ⏹ để gửi" : "Đang trả lời..."}
                            </div>
                        )}
                    </div>

                    <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendText(input);
                                }}
                                placeholder="Nhập câu hỏi…"
                                disabled={loading || recording}
                                style={{
                                    flex: 1,
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,.15)",
                                    background: "transparent",
                                    color: "#fff",
                                    outline: "none",
                                    opacity: loading || recording ? 0.7 : 1,
                                }}
                            />

                            {/* Mic */}
                            <button
                                onClick={recording ? stopRecording : startRecording}
                                disabled={loading}
                                style={{
                                    width: 44,
                                    borderRadius: 10,
                                    border: "none",
                                    background: recording ? "#ef4444" : "rgba(255,255,255,.12)",
                                    color: "#fff",
                                    cursor: "pointer",
                                    opacity: loading ? 0.7 : 1,
                                }}
                                aria-label="Voice"
                                title={recording ? "Dừng & gửi" : "Ghi âm"}
                            >
                                {recording ? "⏹" : "🎤"}
                            </button>

                            {/* Send */}
                            <button
                                onClick={() => sendText(input)}
                                disabled={loading || recording}
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "none",
                                    background: "#fff",
                                    color: "#000",
                                    cursor: "pointer",
                                    opacity: loading || recording ? 0.7 : 1,
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