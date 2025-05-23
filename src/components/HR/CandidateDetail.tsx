import { useEffect, useState } from "react";
import RadarChart from "../Chart/RadarChart";
import { fetchCVFiltered, fetchRadarChart } from "../../services/cv";
import type { CV, Radar } from "../../types";
import CandidateEvaluationTable from "../Table/CandidateEvaluationTable";

interface Props {
  cvId: string;
}

export default function CandidateDetail({ cvId }: Props) {
  const [cvData, setCvData] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  const [radarData, setRadarData] = useState<Radar | null>(null);
  const [radarLoading, setRadarLoading] = useState(false);

  console.log("CV Data:", cvData);

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

    const loadRadar = async (cvId: string) => {
      setRadarLoading(true);
      try {
        const data = await fetchRadarChart(cvId);
        setRadarData(data.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu radar:", error);
        setRadarData(null);
      } finally {
        setRadarLoading(false);
      }
    }

    loadCVData();
    loadRadar(cvId);
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-blue-800 flex items-center gap-3">
          <span>📊</span> Đánh giá AI cho CV ID:{" "}
          <code className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {cvData.cv_id}
          </code>
        </h3>
        <div
          className={`px-4 py-2 rounded-full font-semibold text-white
            ${cvData.result === "Phù hợp"
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-red-500 to-red-600"
            }
            shadow-md`}
        >
          {cvData.result} - {cvData.score}%
        </div>
      </div>
      {/* RadarChart chiếm 2/3 chiều rộng */}
      <div className="h-180 items-center justify-center">
        {radarLoading && <p>Đang tải biểu đồ radar...</p>}

        {!radarLoading && radarData && radarData.labels && radarData.datasets && (
          <RadarChart labels={radarData.labels} datasets={radarData.datasets} />
        )}

        {!radarLoading && (!radarData || !radarData.labels || !radarData.datasets) && (
          <p className="text-red-600">Không có dữ liệu biểu đồ để hiển thị.</p>
        )}
      </div>

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
      {cvData.evaluate && Array.isArray(cvData.evaluate) && (
        <CandidateEvaluationTable evaluate={cvData.evaluate} />
      )}
    </div>
  );
}
