import { useEffect, useState } from "react";
import { fetchCVList } from "@/services/cv";

interface Candidate {
  cv_id: number;
  result: string;
  score: number;
  evaluate: string;
  url: string;
}

interface Props {
  onSelect: (cvId: string) => void;
}

export default function CandidateList({ onSelect }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchCVList();
        setCandidates(res);
      } catch (err) {
        console.error("Lỗi khi tải danh sách ứng viên:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">🧾 Danh sách ứng viên</h3>
      </div>
      {loading ? (
        <p className="text-sm text-gray-600">Đang tải...</p>
      ) : (
        <ul className="space-y-1">
          {candidates.map((c) => (
            <li
              key={c.cv_id}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100"
              onClick={() => onSelect(String(c.cv_id))}
            >
              <div className="text-sm">
                CV ID: <span className="font-mono">{c.cv_id}</span>
              </div>
              <div className="text-xs text-gray-500">
                Trạng thái: <span className="text-red-600">{c.result}</span> – Điểm: {c.score}/100
              </div>
            </li>
          ))}
          {candidates.length === 0 && (
            <p className="text-sm text-gray-500 italic">Chưa có ứng viên nào.</p>
          )}
        </ul>
      )}
    </div>
  );
}
