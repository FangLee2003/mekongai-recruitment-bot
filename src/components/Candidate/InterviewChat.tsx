import { useEffect, useRef, useState } from "react";
import { sendInterviewAnswer, fetchInterviewHistory } from "../../services/interview";

interface Props {
  cvId: string;
  onFinish: () => void;
  initialQuestion?: string;
}

type Message = {
  type: "question" | "answer" | "done";
  text: string;
};

export default function InterviewChat({ cvId, onFinish, initialQuestion }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Load lịch sử phỏng vấn hoặc hiện câu hỏi đầu tiên nếu chưa có lịch sử
  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await fetchInterviewHistory(cvId);
        if (history.length > 0) {
          // Map dữ liệu API thành message chat
          const historyMessages: Message[] = history.flatMap((item: any) => [
            { type: "question", text: item.answer },
            { type: "answer", text: item.query },
          ]);
          setMessages(historyMessages);
        } else if (initialQuestion) {
          setMessages([{ type: "question", text: initialQuestion }]);
        }
      } catch (err) {
        console.error("Lỗi tải lịch sử phỏng vấn:", err);
        if (initialQuestion) {
          setMessages([{ type: "question", text: initialQuestion }]);
        }
      }
    }
    loadHistory();
  }, [cvId, initialQuestion]);

  // Auto scroll khi có message mới
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Xử lý gửi câu trả lời
  const handleSubmit = async () => {
    if (!input.trim() || isDone) return;

    const userAnswer = input.trim();
    setMessages((prev) => [...prev, { type: "answer", text: userAnswer }]);
    setInput("");
    setLoading(true);

    try {
      let accumulatedReply = "";

      // Tạo message "question" trống để update text trả về dần dần
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

      // Kiểm tra kết thúc phỏng vấn
      if (
        accumulatedReply
          .toLowerCase()
          .includes("buổi phỏng vấn hôm nay xin được kết thúc tại đây")
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

        // Dọn dẹp localStorage nếu cần
        localStorage.removeItem("question_set_ready");
        localStorage.removeItem("question_set");
        localStorage.setItem(`interview_done_${cvId}`, "true");
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
        className="h-64 overflow-y-auto border p-3 mb-2 rounded space-y-3 bg-gray-50 flex flex-col"
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
            return (
              <div
                key={idx}
                className="self-start inline-block px-5 py-3 rounded-t-xl rounded-br-xl break-words
                  bg-white text-gray-900 border border-gray-300 shadow-sm text-base"
                style={{ maxWidth: "66%", width: "fit-content" }}
              >
                {msg.text}
              </div>
            );
          }

          if (msg.type === "answer") {
            return (
              <div
                key={idx}
                className="self-end inline-block px-5 py-3 rounded-t-xl rounded-bl-xl break-words
                  bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg text-base"
                style={{ maxWidth: "66%", width: "fit-content" }}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
