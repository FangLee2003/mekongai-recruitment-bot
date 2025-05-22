import ScoreChart from "../ScoreChart";
import ChatHistory from "../ChatHistory";

interface Props {
  cvData: {
    cv_id: string;
    url: string;
    content: string; 
    valuate: {
      result: string;
      score: number;
      evaluate: string;
    };
  };
}
export default function CandidateDetail({ cvData }: Props) {
  if (!cvData) return null;

  const { cv_id, url, content } = cvData;
  const { result, score, evaluate } = cvData.valuate;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">📊 Đánh giá từ AI cho CV ID: <span className="font-mono">{cv_id}</span></h3>

      <div className="mb-2">
        <p className="text-sm">
          Trạng thái:
          <span
            className={
              result === "Phù hợp"
                ? "text-green-600 font-semibold ml-1"  
                : "text-red-600 font-semibold ml-1"
            }
          >
            {result}
          </span>
        </p>
        <p className="text-sm">
          Điểm phù hợp: <span className="font-bold">{score}</span>/100
        </p>
      </div>

      <ScoreChart score={score} />

      <div className="bg-gray-50 p-3 mt-4 rounded text-sm whitespace-pre-line text-gray-700">
        {evaluate} 
      </div>

      <div className="mt-4 text-sm">
        <a
          href={url}
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