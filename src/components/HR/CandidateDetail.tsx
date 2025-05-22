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
        const data = await fetchCVFiltered(Number(cvId));
        if (Array.isArray(data) && data.length > 0) {
          // API trả về mảng, lấy phần tử đầu tiên
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

  if (loading) return <p className="text-sm text-gray-500">Đang tải thông tin ứng viên...</p>;

  if (!cvData) return <p className="text-sm text-red-600">Không tìm thấy dữ liệu ứng viên.</p>;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">
        📊 Đánh giá từ AI cho CV ID: <span className="font-mono">{cvData.cv_id}</span>
      </h3>

      <div className="mb-2">
        <p className="text-sm">
          Trạng thái:{" "}
          <span
            className={
              cvData.result === "Phù hợp"
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {cvData.result}
          </span>
        </p>
        <p className="text-sm">
          Điểm phù hợp: <span className="font-bold">{cvData.score}</span>/100
        </p>
      </div>

      <ScoreChart score={cvData.score} />

      <div className="bg-gray-50 p-3 mt-4 rounded text-sm whitespace-pre-line text-gray-700">
        {cvData.evaluate}
      </div>

      <div className="mt-4 text-sm">
        <a
          href={cvData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          📄 Xem CV gốc (PDF)
        </a>
      </div>

      <div className="mt-6">
        <ChatHistory cvId={cvData.cv_id} />
      </div>
    </div>
  );
}
