import { useEffect, useState } from "react";
import axios from "axios";

interface Candidate {
  id: string;
  name?: string; // nếu có
  status: "pending" | "evaluated";
}

interface Props {
  onSelect: (cvId: string) => void;
}

export default function CandidateList({ onSelect }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/candidates"); // ✅ Lấy danh sách ứng viên
      setCandidates(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách ứng viên:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchCandidates();
  // }, []);

  useEffect(() => {
    // Fake data
    setCandidates([
      { id: "cv123", name: "Nguyễn Văn A", status: "evaluated" },
      { id: "cv124", name: "Trần Thị B", status: "pending" },
    ]);
  }, []);


  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">🧾 Danh sách ứng viên</h3>
        <button
          onClick={fetchCandidates}
          className="text-sm text-blue-600 underline"
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <p className="text-sm text-gray-600">Đang tải...</p>
      ) : (
        <ul className="space-y-1">
          {candidates.map((c) => (
            <li
              key={c.id}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100"
              onClick={() => onSelect(c.id)}
            >
              <div className="text-sm">
                CV ID: <span className="font-mono">{c.id}</span>
              </div>
              <div className="text-xs text-gray-500">
                Trạng thái:{" "}
                <span
                  className={
                    c.status === "pending" ? "text-yellow-600" : "text-green-600"
                  }
                >
                  {c.status === "pending" ? "Đang phân tích..." : "Đã đánh giá"}
                </span>
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
