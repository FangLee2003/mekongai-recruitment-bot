import { useEffect, useState } from "react";
import { fetchInterviewHistory } from "../services/interview";

interface Props {
  cvId: string;
}

type ChatMessage = {
  type: "question" | "answer";
  text: string;
};

export default function ChatHistory({ cvId }: Props) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchInterviewHistory(cvId);

        if (Array.isArray(data) && data.length > 0) {
          const messages: ChatMessage[] = data.flatMap((item: any) => [
            { type: "question", text: item.query },
            { type: "answer", text: item.answer },
          ]);

          setHistory(messages);
        } else {
          setHistory([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải lịch sử phỏng vấn:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [cvId]);

  if (loading) return <p className="text-sm text-gray-500">Đang tải lịch sử...</p>;

  if (history.length === 0) {
    return <p className="text-sm text-gray-500 italic">Không có dữ liệu lịch sử.</p>;
  }

  return (
    <div className="flex flex-col h-[400px] mx-auto bg-white rounded-xl shadow-xl overflow-hidden mt-6">
      <header className="bg-blue-600 text-white px-6 py-3 font-semibold text-lg select-none">
        🗂 Lịch sử bài phỏng vấn
      </header>

      <div
        className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200"
      >
        {history.map((msg, idx) => {
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
    </div>
  );
}
