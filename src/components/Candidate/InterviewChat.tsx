import { useEffect, useRef, useState } from "react";
import { sendInterviewAnswer, fetchInterviewHistory } from "../../services/interview";

interface Props {
  cvId: string;
  onFinish: () => void;
  initialQuestion?: string;
}

type Message = {
  type: string;
  text: string;
};

export default function InterviewChat({ cvId, onFinish, initialQuestion }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuestion) {
      setMessages([{ type: "question", text: initialQuestion }]);
    }
  }, [initialQuestion]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isDone) return;

    const userAnswer = input.trim();
    const updatedMessages = [...messages, { type: "answer", text: userAnswer }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendInterviewAnswer(cvId, userAnswer);
      if (reply.toLowerCase().includes("kết thúc") || reply.toLowerCase().includes("hoàn thành")) {
        setMessages([...updatedMessages, { type: "done", text: reply }]);
        setIsDone(true);
        onFinish();
      } else {
        setMessages([...updatedMessages, { type: "question", text: reply }]);
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

      <div
        ref={chatRef}
        className="h-64 overflow-y-auto border p-3 mb-2 rounded space-y-2 bg-gray-50"
      >
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

      {isDone ? (
        <p className="text-green-700 font-medium text-sm text-center">
          ✅ Buổi phỏng vấn hôm nay đã kết thúc!
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
