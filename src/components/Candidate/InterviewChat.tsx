import { useEffect, useRef, useState } from "react";
import { sendInterviewAnswer } from "../../services/interview";

interface Props {
  cvId: string;
  onFinish: () => void;
  initialQuestion?: string;
}

type Message = {
  type: "question" | "answer" | "done";
  text: string;
};

export default function InterviewChat({
  cvId,
  onFinish,
  initialQuestion,
}: Props) {
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
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isDone) return;

    const userAnswer = input.trim();
    setMessages((prev) => [...prev, { type: "answer", text: userAnswer }]);
    setInput("");
    setLoading(true);

    try {
      let accumulatedReply = "";

      // Tạo message "question" trống để cập nhật
      setMessages((prev) => [...prev, { type: "question", text: "" }]);

      await sendInterviewAnswer(cvId, userAnswer, (chunk) => {
        accumulatedReply += chunk;
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          newMsgs[newMsgs.length - 1] = {
            type: "question",
            text: accumulatedReply,
          };
          return newMsgs;
        });
      });

      if (
        accumulatedReply.toLowerCase().includes("Buổi phỏng vấn hôm nay xin được kết thúc tại đây")
      ) {
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          newMsgs[newMsgs.length - 1] = {
            type: "done",
            text: accumulatedReply,
          };
          return newMsgs;
        });
        setIsDone(true);
        onFinish();
      }
    } catch (error) {
      console.error("Lỗi khi gửi câu trả lời:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] mx-auto bg-white rounded-xl shadow-xl overflow-hidden mt-6">
      <header className="bg-blue-600 text-white px-6 py-4 font-semibold text-lg select-none">
        💬 Bài test phỏng vấn
      </header>

      {/* Chat messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200"
      >
        {messages.map((msg, idx) => {
          if (msg.type === "done") {
            return (
              <div
                key={idx}
                className="mx-auto bg-green-100 text-green-800 font-semibold px-5 py-2 rounded-full max-w-xs text-center select-none shadow-md"
              >
                {msg.text}
              </div>
            );
          }

          if (msg.type === "question") {
            // AI message bên trái
            return (
              <div
                key={idx}
                className="max-w-[90%] px-5 py-3 rounded-t-xl rounded-br-xl break-words text-base
            bg-white text-gray-900 border border-gray-300 shadow-sm self-start"
                style={{ alignSelf: "flex-start" }}
              >
                {msg.text}
              </div>
            );
          }

          if (msg.type === "answer") {
            // User message bên phải
            return (
              <div
                key={idx}
                className="max-w-[90%] px-5 py-3 rounded-t-xl rounded-bl-xl break-words text-base
            bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg self-end"
                style={{ alignSelf: "flex-end" }}
              >
                {msg.text}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex items-center gap-3 bg-white p-4 border-t border-gray-300"
      >
        <input
          type="text"
          className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-gray-900 text-base
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          placeholder={loading ? "Đang gửi..." : "Nhập câu trả lời..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading || isDone}
          autoFocus
          spellCheck={false}
        />

        <button
          type="submit"
          disabled={loading || !input.trim() || isDone}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 font-semibold
            disabled:opacity-50 disabled:cursor-not-allowed transition-shadow shadow-md hover:shadow-lg"
          aria-label="Gửi câu trả lời"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>

      {isDone && (
        <div className="bg-green-50 border border-green-400 text-green-700 p-3 text-center font-semibold">
          ✅ Buổi phỏng vấn hôm nay đã kết thúc!
        </div>
      )}
    </div>
  );
}
