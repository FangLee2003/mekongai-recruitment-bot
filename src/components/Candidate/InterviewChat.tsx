import { useEffect, useRef, useState } from "react";
import { sendInterviewAnswer, fetchInterviewHistory } from "../../services/interview";

// Props truyền vào component: cvId và hàm gọi khi kết thúc phỏng vấn
interface Props {
  cvId: string;
  onFinish: () => void;
}

// Định nghĩa kiểu dữ liệu của từng tin nhắn
type Message = {
  type: "question" | "answer" | "done";
  text: string;
};

export default function InterviewChat({ cvId, onFinish }: Props) {
  // State quản lý toàn bộ tin nhắn hỏi/đáp trong phiên phỏng vấn
  const [messages, setMessages] = useState<Message[]>([]);

  // State quản lý nội dung input của người dùng
  const [input, setInput] = useState("");

  // State kiểm soát loading khi đang gửi câu trả lời
  const [loading, setLoading] = useState(false);

  // Trạng thái đã hoàn thành buổi phỏng vấn hay chưa
  const [isDone, setIsDone] = useState<boolean>(false);

  // Tham chiếu đến vùng hiển thị chat để auto scroll
  const chatRef = useRef<HTMLDivElement>(null);

  // Khi component mount: kiểm tra xem buổi phỏng vấn đã hoàn thành chưa
  useEffect(() => {
    const finished = localStorage.getItem(`interview_done_${cvId}`) === "true";

    if (finished) {
      // Nếu đã hoàn thành → lấy lại lịch sử để hiển thị
      setIsDone(true);
      fetchInterviewHistory(cvId).then((history) => {
        const historyMessages: Message[] = history.map((m: any) => ({
          type: m.type,
          text: m.text,
        }));
        setMessages([
          ...historyMessages,
          {
            type: "done",
            text: "✅ Buổi phỏng vấn hôm nay xin được kết thúc tại đây.",
          },
        ]);
      });
    } else {
      // Nếu chưa hoàn thành → load câu hỏi đầu tiên từ localStorage
      const stored = localStorage.getItem("question_set");
      if (stored) {
        const questions: string[] = JSON.parse(stored);
        if (questions.length > 0) {
          setMessages([{ type: "question", text: questions[0] }]);
        }
      }
    }
  }, [cvId]);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Xử lý gửi câu trả lời từ người dùng
  const handleSubmit = async () => {
    if (!input.trim() || isDone) return;

    const userAnswer = input.trim();

    // Cập nhật giao diện: thêm câu trả lời người dùng
    const updatedMessages = [...messages, { type: "answer", text: userAnswer }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Gọi API để lấy phản hồi từ AI (stream)
      const reply = await sendInterviewAnswer(cvId, userAnswer);

      // Kiểm tra nếu nội dung trả về chứa dấu hiệu kết thúc
      if (reply.toLowerCase().includes("kết thúc tại đây")) {
        const doneMessage = { type: "done", text: reply };

        // Cập nhật messages & set trạng thái đã kết thúc
        setMessages([...updatedMessages, doneMessage]);
        setIsDone(true);

        // Ghi trạng thái hoàn thành vào localStorage (để lần sau load lại biết)
        localStorage.setItem(`interview_done_${cvId}`, "true");

        // Xoá các trạng thái tạm thời không còn dùng nữa
        localStorage.removeItem("question_set_ready");
        localStorage.removeItem("question_set");

        // Gọi hàm callback thông báo kết thúc
        onFinish();
      } else {
        // Nếu chưa kết thúc → hiển thị tiếp câu hỏi mới từ AI
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

      {/* Vùng hiển thị toàn bộ nội dung chat */}
      <div
        ref={chatRef}
        className="h-64 overflow-y-auto border p-3 mb-2 rounded space-y-2 bg-gray-50"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
              msg.type === "question"
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

      {/* Nếu đã xong thì không hiển thị ô nhập nữa */}
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
