import { useEffect, useState } from "react";
import ScoreChart from "../ScoreChart";
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

  const [chartHtml, setChartHtml] = useState<string>("");
  const [chartLoading, setChartLoading] = useState(false);


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

  const handleGenerateChart = async (cvId: string) => {
    setChartLoading(true);
    try {
      const res = await fetch(`https://recruitment.mekongai.com/api/v1/generate-chart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_id: cvId }),
      });

      if (!res.ok) {
        throw new Error(`Lỗi khi gọi API: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      if (!json.data) {
        throw new Error("API trả về dữ liệu biểu đồ rỗng");
      }

      setChartHtml(json.data);
    } catch (error) {
      console.error("Lỗi khi lấy biểu đồ:", error);
    } finally {
      setChartLoading(false);
    }
  };


  useEffect(() => {
    if (!cvId) return;
    loadCVData();
    handleGenerateChart(cvId);
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
            ${cvData.result === "Phù hợp"
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-red-500 to-red-600"
            }
            shadow-md`}
        >
          {cvData.result}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mb-10">
        {/* Biểu đồ độ phù hợp (ScoreChart) */}
        <div className="max-w-xs">
          <ScoreChart title="Độ phù hợp" score={cvData.score} />
        </div>

        {/* Biểu đồ spider */}
        <div className="max-w-xs">
          {chartLoading ? (
            <p className="text-center text-gray-500">Đang tải biểu đồ...</p>
          ) : (
            <div className="flex flex-col items-center">
              <div
                className="mx-auto"
                // Hiển thị raw html/svg do backend trả về
                dangerouslySetInnerHTML={{ __html: chartHtml }}
              />
              <h4 className="text-center font-semibold mb-2">Đánh giá chi tiết</h4>
            </div>
          )}
        </div>
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
    </div>
  );
}
