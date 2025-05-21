import { useState } from "react";
import { generateQuestionSet } from "../../services/interview";

interface Props {
  cvId: string;
}

export default function QuestionSender({ cvId }: Props) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateQuestionSet(cvId); // { questions: [...] }
      setQuestions(res.questions || []);
    } catch (err) {
      console.error("Lỗi khi tạo câu hỏi:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    // Giả lập lưu câu hỏi cho phía ứng viên
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
