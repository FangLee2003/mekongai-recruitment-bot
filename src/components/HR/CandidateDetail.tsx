import { useEffect, useState } from "react";
import ScoreChart from "../ScoreChart";
import ChatHistory from "../ChatHistory";
import { fetchCVFiltered } from "../../services/cv";

interface CVData {
  cv_id: string;
  url: string;
  content: string;
  result: string;
  score: number;
  evaluate: string;
}

interface Props {
  cvId: string;
}

export default function CandidateDetail({ cvId }: Props) {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cvId) return;

    const loadCVData = async () => {
      setLoading(true);
      try {
        const data = await fetchCVFiltered(cvId);
        if (Array.isArray(data) && data.length > 0) {
          setCvData(data[0]);
        } else {
          setCvData(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu CV:", error);
        setCvData(null);
      } finally {
        setLoading(false);
      }
    };

    loadCVData();
  }, [cvId]);

  if (loading)
    return (
      <p className="text-center text-gray-500 italic mt-6 select-none">
        Đang tải thông tin ứng viên...
      </p>
    );

  if (!cvData)
    return (
      <p className="text-center text-red-600 italic mt-6 select-none">
        Không tìm thấy dữ liệu ứng viên.
      </p>
    );

  return (
    <div className="mx-auto bg-white rounded-3xl shadow-2xl p-8 mt-6 select-none">
      <h3 className="text-2xl font-extrabold mb-6 text-blue-800 flex items-center gap-3">
        <span>📊</span> Đánh giá AI cho CV ID:{" "}
        <code className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {cvData.cv_id}
        </code>
      </h3>

      <div className="flex flex-wrap gap-6 mb-8 items-center">
        <div
          className={`px-4 py-2 rounded-full font-semibold text-white
            ${
              cvData.result === "Phù hợp"
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            }
            shadow-md`}
        >
          {cvData.result}
        </div>

        <div className="text-xl font-semibold text-gray-800">
          Điểm phù hợp:{" "}
          <span className="text-blue-700">{cvData.score}</span>/100
        </div>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <ScoreChart score={cvData.score} />
      </div>

      <section
        className="bg-blue-50/60 rounded-xl border border-blue-200 p-6 text-gray-700 text-base leading-relaxed
          shadow-inner max-w-3xl mx-auto mb-10 whitespace-pre-line"
      >
        {cvData.evaluate}
      </section>

      <div className="text-center mb-10">
        <a
          href={cvData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-700 font-semibold underline
            hover:text-blue-900 transition-colors"
        >
          📄 Xem CV gốc (PDF)
        </a>
      </div>

      <section className="max-w-4xl mx-auto border-t border-gray-200 pt-6">
        <ChatHistory cvId={cvData.cv_id} />
      </section>
    </div>
  );
}
