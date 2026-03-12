"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "bot"; text: string };

declare global {
    interface Window {
        SpeechRecognition?: any;
        webkitSpeechRecognition?: any;
    }
}

function MicIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M19 11a7 7 0 0 1-14 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M12 18v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 21h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function WaveIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M7 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);

    const [msgs, setMsgs] = useState<Msg[]>([
        { role: "bot", text: "Chào bạn! Bạn hỏi mình về card game nhé." },
    ]);

    const listRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

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
        listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [msgs, open]);

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

    function startRecording() {
        if (recording || loading) return;

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setMsgs((m) => [
                ...m,
                {
                    role: "bot",
                    text: "Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Bạn thử Chrome nhé.",
                },
            ]);
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;

            recognition.lang = "vi-VN";
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.maxAlternatives = 1;

            let finalTranscript = "";

            recognition.onstart = () => {
                setRecording(true);
            };

            recognition.onresult = (event: any) => {
                let transcript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }

                setInput(finalTranscript || transcript);
            };

            recognition.onerror = () => {
                setRecording(false);
                setMsgs((m) => [
                    ...m,
                    {
                        role: "bot",
                        text: "Mic đang gặp lỗi hoặc chưa được cấp quyền. Bạn thử lại nhé.",
                    },
                ]);
            };

            recognition.onend = async () => {
                setRecording(false);

                const spokenText = finalTranscript.trim() || input.trim();
                if (spokenText) {
                    setInput(spokenText);

                    // Tự gửi luôn sau khi nói xong:
                    await sendText(spokenText);

                    // Nếu bạn muốn chỉ đổ text vào input, KHÔNG tự gửi,
                    // thì comment dòng trên lại.
                }
            };

            recognition.start();
        } catch {
            setRecording(false);
            setMsgs((m) => [
                ...m,
                { role: "bot", text: "Không bật được voice input. Bạn thử lại nhé." },
            ]);
        }
    }

    function stopRecording() {
        if (!recording) return;
        recognitionRef.current?.stop();
    }

    return (
        <>
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

                        {(loading || recording) && (
                            <div style={{ opacity: 0.8, fontSize: 13 }}>
                                {recording ? "Đang nghe bạn nói..." : "Đang trả lời..."}
                            </div>
                        )}
                    </div>

                    <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendText(input);
                                }}
                                placeholder="Nhập câu hỏi…"
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    padding: "10px 12px",
                                    height: 44,
                                    borderRadius: 14,
                                    border: "1px solid rgba(255,255,255,.15)",
                                    background: "transparent",
                                    color: "#fff",
                                    outline: "none",
                                    opacity: loading ? 0.7 : 1,
                                }}
                            />

                            <button
                                onClick={recording ? stopRecording : startRecording}
                                disabled={loading}
                                aria-label={recording ? "Stop recording" : "Start recording"}
                                title={recording ? "Dừng nhận giọng nói" : "Nói để nhập text"}
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 999,
                                    border: "1px solid rgba(255,255,255,.12)",
                                    background: recording ? "#22c55e" : "rgba(255,255,255,.08)",
                                    color: recording ? "#052e16" : "rgba(255,255,255,.9)",
                                    display: "grid",
                                    placeItems: "center",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    opacity: loading ? 0.7 : 1,
                                    transition: "transform .08s ease, background .2s ease",
                                }}
                                onMouseDown={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
                                }}
                                onMouseUp={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                                }}
                            >
                                {recording ? <WaveIcon /> : <MicIcon />}
                            </button>

                            <button
                                onClick={() => sendText(input)}
                                disabled={loading || recording}
                                style={{
                                    height: 44,
                                    padding: "0 16px",
                                    borderRadius: 14,
                                    border: "1px solid rgba(255,255,255,.10)",
                                    background: "#fff",
                                    color: "#000",
                                    fontWeight: 700,
                                    cursor: loading || recording ? "not-allowed" : "pointer",
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