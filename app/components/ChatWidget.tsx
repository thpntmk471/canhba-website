"use client";

import { useEffect, useRef, useState } from "react";

type Msg = {
    role: "user" | "bot";
    text: string;
};

declare global {
    interface Window {
        SpeechRecognition?: any;
        webkitSpeechRecognition?: any;
    }
}

const suggestedQuestions = [
    "Ma Đói thắng như thế nào?",
    "Đèn Dầu dùng làm gì?",
    "Nón Lá x2 vote xử lý sao?",
    "Túi Bố hủy vote thế nào?",
];

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
            <path d="M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 3 10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function formatMessage(text: string) {
    return text.split("\n").map((line, index) => (
        <span key={`${line}-${index}`}>
            {line}
            {index < text.split("\n").length - 1 ? <br /> : null}
        </span>
    ));
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);

    const [msgs, setMsgs] = useState<Msg[]>([
        {
            role: "bot",
            text: "Chào bạn! Mình là trợ lý luật Canh Ba. Bạn có thể hỏi chức năng thẻ, luật chơi hoặc tình huống trong ván.",
        },
    ]);

    const listRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    const [sessionId] = useState(() => {
        if (typeof window === "undefined") return "web";

        const key = "canhba_chat_session";
        const existing = localStorage.getItem(key);

        if (existing) return existing;

        const value = Math.random().toString(36).slice(2);
        localStorage.setItem(key, value);

        return value;
    });

    useEffect(() => {
        if (!open) return;

        const el = listRef.current;
        if (!el) return;

        el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth",
        });
    }, [msgs, open, loading]);

    useEffect(() => {
        const handleOpenChat = () => setOpen(true);

        window.addEventListener("open-canhba-chat", handleOpenChat);

        return () => {
            window.removeEventListener("open-canhba-chat", handleOpenChat);
        };
    }, []);

    async function sendText(text: string) {
        const value = text.trim();

        if (!value || loading) return;

        setMsgs((current) => [...current, { role: "user", text: value }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: value,
                    sessionId,
                    inputType: "text",
                }),
            });

            const data = await response.json();

            setMsgs((current) => [
                ...current,
                {
                    role: "bot",
                    text:
                        data?.reply ||
                        "Mình chưa nhận được phản hồi. Bạn thử hỏi lại giúp mình nhé.",
                },
            ]);
        } catch {
            setMsgs((current) => [
                ...current,
                {
                    role: "bot",
                    text: "Mạng đang hơi chập chờn, bạn thử lại giúp mình nhé.",
                },
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
            setMsgs((current) => [
                ...current,
                {
                    role: "bot",
                    text: "Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Bạn dùng Chrome hoặc Edge nhé.",
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

    function clearChat() {
        setMsgs([
            {
                role: "bot",
                text: "Mình đã làm mới cuộc trò chuyện. Bạn muốn hỏi về thẻ bài, luật chơi hay tình huống nào?",
            },
        ]);
    }

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Mở chat Canh Ba"
                    className="fixed bottom-4 right-4 z-[70] grid h-14 w-14 place-items-center rounded-full bg-[#ffae17] text-[#111111] shadow-[0_16px_42px_rgba(0,0,0,.5)] transition hover:scale-[1.04] hover:brightness-105 sm:bottom-5 sm:right-5 sm:h-15 sm:w-15"
                >
                    <ChatBubbleIcon />
                </button>
            )}

            {open && (
                <div className="fixed bottom-3 left-3 right-3 z-[80] h-[min(72svh,620px)] overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] text-[#f2f2f2] shadow-[0_26px_90px_rgba(0,0,0,.65)] sm:bottom-5 sm:left-auto sm:right-5 sm:h-[620px] sm:w-[390px]">
                    <div className="flex h-full flex-col">
                        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#181818] px-4 py-3">
                            <div>
                                <div className="text-sm font-black text-[#ffae17]">
                                    Canh Ba Rules AI
                                </div>
                                <div className="mt-0.5 text-xs text-[#9c9c9c]">
                                    Hỏi luật • thẻ bài • tình huống
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={clearChat}
                                    className="rounded-full border border-white/10 bg-[#252525] px-3 py-1.5 text-xs font-bold text-[#d0d0d0] transition hover:bg-[#303030]"
                                >
                                    Xóa
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#252525] text-lg font-black text-[#f2f2f2] transition hover:bg-[#303030]"
                                    aria-label="Đóng chat"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div
                            ref={listRef}
                            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 [scrollbar-width:thin] [scrollbar-color:#333_transparent]"
                        >
                            {msgs.map((msg, index) => {
                                const isUser = msg.role === "user";

                                return (
                                    <div
                                        key={`${msg.role}-${index}`}
                                        className={isUser ? "flex justify-end" : "flex justify-start"}
                                    >
                                        <div
                                            className={[
                                                "max-w-[86%] whitespace-pre-wrap rounded-[20px] px-4 py-3 text-sm leading-6",
                                                isUser
                                                    ? "bg-[#ffae17] font-semibold text-[#111111]"
                                                    : "border border-white/10 bg-[#202020] text-[#d8d8d8]",
                                            ].join(" ")}
                                        >
                                            {formatMessage(msg.text)}
                                        </div>
                                    </div>
                                );
                            })}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="rounded-[20px] border border-white/10 bg-[#202020] px-4 py-3 text-sm text-[#a7a7a7]">
                                        Đang tra luật Canh Ba...
                                    </div>
                                </div>
                            )}
                        </div>

                        {msgs.length <= 1 && (
                            <div className="shrink-0 border-t border-white/10 px-4 py-3">
                                <div className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]">
                                    Gợi ý hỏi nhanh
                                </div>

                                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                                    {suggestedQuestions.map((question) => (
                                        <button
                                            key={question}
                                            type="button"
                                            onClick={() => sendText(question)}
                                            className="shrink-0 rounded-full border border-white/10 bg-[#222222] px-3.5 py-2 text-xs font-semibold text-[#d0d0d0] transition hover:bg-[#ffae17] hover:text-[#111111]"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                sendText(input);
                            }}
                            className="shrink-0 border-t border-white/10 bg-[#171717] p-3"
                        >
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={recording ? stopRecording : startRecording}
                                    className={[
                                        "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition",
                                        recording
                                            ? "border-[#ffae17] bg-[#ffae17] text-[#111111]"
                                            : "border-white/10 bg-[#242424] text-[#f2f2f2] hover:bg-[#303030]",
                                    ].join(" ")}
                                    aria-label={recording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
                                >
                                    <MicIcon />
                                </button>

                                <input
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            sendText(input);
                                        }
                                    }}
                                    placeholder="Hỏi luật hoặc tên thẻ..."
                                    className="h-11 min-w-0 flex-1 rounded-full border border-white/10 bg-[#242424] px-4 text-sm text-[#f2f2f2] outline-none placeholder:text-[#777] focus:border-[#ffae17]/70"
                                />

                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffae17] text-[#111111] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Gửi tin nhắn"
                                >
                                    <SendIcon />
                                </button>
                            </div>

                            {recording && (
                                <div className="mt-2 text-xs font-semibold text-[#ffae17]">
                                    Đang nghe giọng nói...
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}