import { useEffect, useState } from "react";
import { fetchInterviewQuestion } from "../../services/interview";

interface Props {
  cvId: string;
}

export default function QuestionList({ cvId }: Props) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cvId) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchInterviewQuestion(cvId);

        // Câu hỏi trong json.questions là string dạng JSON mảng, cần parse ra
        if (data.questions) {
          const parsedQuestions = JSON.parse(data.questions);
          setQuestions(parsedQuestions);
        } else {
          setQuestions([]);
        }
      } catch (err: any) {
        setError(err.message || "Lỗi không xác định");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [cvId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải câu hỏi...</p>;
  if (error)
    return <p className="text-center text-red-600 font-semibold">Lỗi: {error}</p>;
  if (questions.length === 0)
    return <p className="text-center italic text-gray-500">Không có câu hỏi nào.</p>;

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto p-2">
      <h3 className="text-xl font-semibold mb-4 text-center">Danh sách câu hỏi phỏng vấn</h3>
      <ol className="list-none list-inside text-gray-700">
        {questions.map((q, idx) => (
          <li key={idx} className="mb-2">
            {q}
          </li>
        ))}
      </ol>
    </div>
  );
}
