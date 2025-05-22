import { useEffect, useState } from "react";
import { fetchCVList } from "../../services/cv";
import { FaInfoCircle, FaComments } from "react-icons/fa";

interface Candidate {
  cv_id: number;
  result: string;
  score: number;
  evaluate: string;
  url: string;
}

interface Props {
  jdId: number;
}

export default function CandidateList({ jdId, onSelectedCV }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jdId) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchCVList(jdId);
        setCandidates(res);
      } catch (err) {
        console.error("Lỗi khi tải danh sách ứng viên:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jdId]);

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
              className="border rounded p-2 flex items-center justify-between hover:bg-gray-100"
            >
              <div>
                <div className="text-sm">
                  CV ID: <span className="font-mono">{c.cv_id}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Trạng thái: <span className="text-red-600">{c.result}</span> – Điểm: {c.score}/100
                </div>
              </div>

              <div className="flex gap-3 text-gray-600">
                <button
                  onClick={() => onSelectedCV(String(c.cv_id))}
                  title="Xem đánh giá chi tiết"
                  className="hover:text-blue-600"
                >
                  <FaInfoCircle size={18} />
                </button>
                <button
                  onClick={() => onSelectedCV(String(c.cv_id))}
                  title="Xem lịch sử trò chuyện"
                  className="hover:text-green-600"
                >
                  <FaComments size={18} />
                </button>
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
