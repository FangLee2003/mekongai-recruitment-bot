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

        // data là mảng chứa 1 mảng messages
        if (Array.isArray(data) && data.length > 0) {
          // Map thành mảng ChatMessage[]
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
    <div className="bg-white p-4 rounded shadow ">
      <h3 className="font-semibold mb-2">🗂 Lịch sử bài phỏng vấn</h3>

      <div className="h-72 overflow-y-auto border p-3 space-y-2 bg-gray-50 rounded">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.type === "question"
                ? "bg-gray-300 text-left self-start"
                : "bg-blue-500 text-white text-right self-end ml-auto"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
