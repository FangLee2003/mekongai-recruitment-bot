import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Props {
    cvId: string;
    onFinish: () => void;
}

type Message = {
    type: "question" | "answer" | "done";
    text: string;
};

export default function InterviewChat({ cvId, onFinish }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    // Load bộ câu hỏi ban đầu (hoặc câu hỏi đầu tiên)
    useEffect(() => {
        const loadFirstQuestion = () => {
            const stored = localStorage.getItem("question_set");
            if (stored) {
                const questions: string[] = JSON.parse(stored);
                if (questions.length > 0) {
                    setMessages([{ type: "question", text: questions[0] }]);
                }
            }
        };
        loadFirstQuestion();
    }, []);

    // Auto scroll khi có tin nhắn mới
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { type: "answer", text: input.trim() }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("/api/answer-interview", {
                cv_id: cvId,
                answer: input.trim(),
            });

            if (res.data.done) {
                setMessages([...newMessages, { type: "done", text: res.data.message || "Bạn đã hoàn thành bài test. 🎉" }]);
                onFinish();
                localStorage.removeItem("question_set_ready");
                localStorage.removeItem("question_set");
            } else if (res.data.next_question) {
                setMessages([...newMessages, { type: "question", text: res.data.next_question }]);
            }
        } catch (err) {
            console.error("Lỗi khi gửi câu trả lời:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-2">💬 Bài test phỏng vấn</h3>

            <div ref={chatRef} className="h-64 overflow-y-auto border p-3 mb-2 rounded space-y-2 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.type === "question"
                                ? "bg-gray-300 text-left self-start"
                                : msg.type === "answer"
                                    ? "bg-blue-500 text-white text-right self-end ml-auto"
                                    : "text-center text-green-600 font-semibold"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {messages.some((m) => m.type === "done") ? (
                <p className="text-green-700 font-medium text-sm text-center">
                    ✅ Bài test đã hoàn thành!
                </p>
            ) : (
                <div className="flex items-center gap-2">
                    <input
                        className="flex-1 border rounded px-2 py-1"
                        placeholder="Nhập câu trả lời..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        disabled={loading}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                        disabled={loading || !input.trim()}
                    >
                        Gửi
                    </button>
                </div>
            )}
        </div>
    );
}
