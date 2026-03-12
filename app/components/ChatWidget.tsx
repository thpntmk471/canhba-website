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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function SendIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M21 3 10 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="m21 3-7 18-4-7-7-4 18-7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChatBubbleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M8 10h8M8 14h5m7-2c0 4.418-3.582 8-8 8a8.96 8.96 0 0 1-3.874-.874L3 20l.874-5.126A8.96 8.96 0 0 1 3 11c0-4.418 3.582-8 8-8s8 3.582 8 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);

    const [msgs, setMsgs] = useState<Msg[]>([
        {
            role: "bot",
            text: "Chào bạn! Mình là trợ lý luật của Canh Ba. Bạn có thể hỏi về vai trò, tình huống hoặc cách xử lý khi chơi.",
        },
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
        const el = listRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [msgs, open, loading]);

    async function sendText(text: string) {
        const t = text.trim();
        if (!t || loading) return;

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
            setMsgs((m) => [
                ...m,
                { role: "bot", text: "Mạng đang hơi chập chờn, bạn thử lại giúp mình nhé." },
            ]);
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
                    text: "Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Bạn nên dùng Chrome hoặc Edge nhé.",
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
                let liveTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    liveTranscript += event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }

                setInput((finalTranscript || liveTranscript).trim());
            };

            recognition.onerror = () => {
                setRecording(false);
            };

            recognition.onend = () => {
                setRecording(false);
            };

            recognition.start();
        } catch {
            setRecording(false);
        }
    }

    function stopRecording() {
        recognitionRef.current?.stop();
    }

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Mở chat Canh Ba"
                    className="fixed bottom-4 right-4 z-[70] grid h-16 w-16 place-items-center rounded-full border border-[#ffcf72]/35 bg-[linear-gradient(180deg,#ffcf72,#d89a22)] text-[#2a0c0f] shadow-[0_18px_45px_rgba(0,0,0,.45)] transition hover:scale-[1.03] hover:brightness-105 sm:bottom-5 sm:right-5"
                >
                    <ChatBubbleIcon />
                </button>
            )}

            {open && (
                <div
                    className="
            fixed z-[80]
            left-3 right-3 bottom-3 top-auto
            sm:left-auto sm:right-5 sm:bottom-5
            w-auto sm:w-[400px]
            h-[min(78svh,720px)] sm:h-[min(76svh,720px)]
            rounded-[28px] border border-[#d7a33d]/10
            bg-[linear-gradient(180deg,rgba(16,7,8,.98),rgba(5,5,7,.98))]
            text-[#f4ddb3]
            shadow-[0_24px_80px_rgba(0,0,0,.55)]
            backdrop-blur-xl
            overflow-hidden
          "
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,138,0,.08),transparent_30%),radial-gradient(circle_at_bottom,rgba(120,8,18,.18),transparent_38%)]" />

                    <div className="relative flex h-full flex-col">
                        {/* Header */}
                        <div className="border-b border-[#d7a33d]/10 bg-[linear-gradient(180deg,rgba(32,10,13,.88),rgba(14,7,8,.8))] px-4 py-4 sm:px-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ffbf47] shadow-[0_0_16px_rgba(255,191,71,.65)]" />
                                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#cfa050]/85">
                                            Canh Ba AI
                                        </p>
                                    </div>

                                    <h3 className="mt-2 text-lg font-black text-[#ffe5b9] sm:text-xl">
                                        Trợ lý luật chơi
                                    </h3>

                                    <p className="mt-1 text-sm text-[#e6d0ab]/68">
                                        Hỏi nhanh về lá bài, vai trò, tình huống và cách xử lý.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Đóng chat"
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d7a33d]/10 bg-white/5 text-[#e7d0a7]/80 transition hover:bg-white/10"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={listRef}
                            className="relative flex-1 overflow-y-auto px-4 py-4 sm:px-5"
                        >
                            <div className="space-y-3">
                                {msgs.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={[
                                                "max-w-[85%] rounded-[22px] px-4 py-3 text-[15px] leading-7 shadow-sm",
                                                m.role === "user"
                                                    ? "rounded-br-md border border-[#d7a33d]/10 bg-[linear-gradient(180deg,rgba(255,191,71,.96),rgba(221,151,33,.95))] text-[#2a0c0f]"
                                                    : "rounded-bl-md border border-[#d7a33d]/8 bg-white/[0.06] text-[#f3dfbb]",
                                            ].join(" ")}
                                        >
                                            {m.text}
                                        </div>
                                    </div>
                                ))}

                                {(loading || recording) && (
                                    <div className="flex justify-start">
                                        <div className="rounded-[22px] rounded-bl-md border border-[#d7a33d]/8 bg-white/[0.05] px-4 py-3 text-sm text-[#d7c4a1]/78">
                                            {recording ? "Đang nghe bạn nói..." : "Đang trả lời..."}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Composer */}
                        <div className="relative border-t border-[#d7a33d]/10 bg-[linear-gradient(180deg,rgba(14,8,10,.92),rgba(9,5,7,.98))] px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-4 sm:px-5">
                            <div className="flex items-end gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="rounded-[22px] border border-[#d7a33d]/10 bg-black/20 px-4 py-3 transition focus-within:border-[#d7a33d]/25">
                                        <input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    sendText(input);
                                                }
                                            }}
                                            placeholder="Nhập câu hỏi về Canh Ba..."
                                            disabled={loading}
                                            className="w-full bg-transparent text-[15px] text-[#f2ddb5] outline-none placeholder:text-[#a79678]"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={recording ? stopRecording : startRecording}
                                    disabled={loading}
                                    aria-label={recording ? "Dừng ghi âm" : "Bật nhập giọng nói"}
                                    className={[
                                        "grid h-14 w-14 shrink-0 place-items-center rounded-full border transition",
                                        recording
                                            ? "border-[#ffbf47]/35 bg-[#ffbf47] text-[#2a0c0f]"
                                            : "border-[#d7a33d]/10 bg-white/5 text-[#f1d8ab]",
                                        loading ? "opacity-60" : "hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    <MicIcon />
                                </button>

                                <button
                                    onClick={() => sendText(input)}
                                    disabled={loading || !input.trim()}
                                    aria-label="Gửi câu hỏi"
                                    className="grid h-14 min-w-[76px] shrink-0 place-items-center rounded-[18px] border border-[#ffbf47]/30 bg-[#f6f0e6] px-5 font-bold text-[#2a0c0f] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span className="hidden sm:inline">Gửi</span>
                                    <span className="sm:hidden">
                                        <SendIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}