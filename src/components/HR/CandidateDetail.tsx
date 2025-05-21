import { useEffect, useState } from "react";
import axios from "axios";
import ScoreChart from "../ScoreChart";

interface Props {
  cvId: string;
}

interface EvaluationResult {
  status: "evaluated" | "pending";
  result: "Đạt" | "Không đạt";
  score: number; // từ 0–100
  detail: string;
}

export default function CandidateDetail({ cvId }: Props) {
  const [data, setData] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/candidates/${cvId}/evaluation`);
      setData(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy đánh giá:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchDetail();
  // }, [cvId]);

  useEffect(() => {
    const fake = {
      status: "evaluated",
      result: "Đạt",
      score: 85,
      detail: `✅ Ứng viên có kinh nghiệm ReactJS > 1 năm\n✅ Biết TailwindCSS và TypeScript\n⚠️ Chưa có kinh nghiệm với Redux`,
    };
    setData(fake);
    setLoading(false);
  }, [cvId]);


  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">📊 Đánh giá từ AI</h3>
      {loading ? (
        <p className="text-sm text-gray-600">Đang tải...</p>
      ) : !data ? (
        <p className="text-sm text-red-600">Không tìm thấy dữ liệu đánh giá.</p>
      ) : data.status === "pending" ? (
        <p className="text-sm italic text-yellow-700">⏳ AI đang phân tích CV này...</p>
      ) : (
        <>
          <div className="mb-2">
            <p className="text-sm">
              Trạng thái:{" "}
              <span
                className={
                  data.result === "Đạt" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                }
              >
                {data.result}
              </span>
            </p>
            <p className="text-sm">Điểm phù hợp: {data.score}/100</p>
          </div>

          <ScoreChart score={data.score} />

          {/* Phân tích chi tiết */}
          <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-line">
            {data.detail}
          </div>
        </>
      )}
    </div>
  );
}
