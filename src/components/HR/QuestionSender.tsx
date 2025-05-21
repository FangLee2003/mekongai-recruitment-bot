import { useState } from "react";
import axios from "axios";

interface Props {
  cvId: string;
}

export default function QuestionSender({ cvId }: Props) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // const handleGenerate = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.post("/api/generate-question-set", { cv_id: cvId });
  //     setQuestions(res.data.questions); // ví dụ: [string, string, ...]
  //   } catch (err) {
  //     console.error("Lỗi khi tạo câu hỏi:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fakeQuestions = [
    "Hãy giới thiệu về bản thân bạn.",
    "Bạn đã từng dùng TailwindCSS để giải quyết vấn đề gì?",
    "Bạn gặp khó khăn gì khi dùng React Hook?",
  ];

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000)); // fake delay
    setQuestions(fakeQuestions);
    setLoading(false);
  };


  const handleSend = () => {
    // Giả lập: lưu vào localStorage (hoặc context/global store)
    localStorage.setItem("question_set", JSON.stringify(questions));
    localStorage.setItem("question_set_ready", "true");
    setSent(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">🎯 Gửi bộ câu hỏi phỏng vấn</h3>

      {questions.length === 0 ? (
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-1 rounded"
          disabled={loading}
        >
          {loading ? "Đang tạo câu hỏi..." : "Tạo bộ câu hỏi"}
        </button>
      ) : (
        <>
          <ul className="list-decimal pl-5 mb-2 text-sm text-gray-700 max-h-48 overflow-y-auto">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>

          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 py-1 rounded"
            disabled={sent}
          >
            {sent ? "Đã gửi 🎉" : "Gửi câu hỏi cho ứng viên"}
          </button>
        </>
      )}
    </div>
  );
}
