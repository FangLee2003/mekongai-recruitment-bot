import { useEffect, useState } from "react";
import { fetchCVFiltered } from "../../services/cv";
import { FaInfoCircle, FaComments } from "react-icons/fa";

import type { Candidate } from "../../types";
interface Props {
  jdId: string;
  onShowDetail: (cvId: string) => void;
  onShowChat: (cvId: string) => void;
  onApproveCV: (cvId: string) => void; // nút duyệt CV vòng 1
  onSendToCandidate: (cvId: string) => void; // nút gửi CV cho ứng viên vòng 2
  onScheduleInterview: (cvId: string) => void; // nút đặt lịch phỏng vấn vòng 2
  onNotifyHired: (cvId: string) => void; // nút thông báo trúng tuyển vòng 3
}

export default function CandidateList({
  jdId,
  onShowDetail,
  onShowChat,
  onApproveCV,
  onSendToCandidate,
  onScheduleInterview,
  onNotifyHired,
}: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = vòng 1, 1 = vòng 2, 2 = vòng 3

  useEffect(() => {
    if (!jdId) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchCVFiltered(undefined, jdId);
        setCandidates(res);
      } catch (err) {
        console.error("Lỗi khi tải danh sách ứng viên:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jdId]);

  // Lọc candidates theo tab
  const filteredCandidates = candidates.filter((c) => {
    if (activeTab === 0) return c.status === 0;
    if (activeTab === 1) return c.status === 1 || c.status === 2;
    if (activeTab === 2) return c.status === 3;
    return true;
  });

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-4">🧾 Danh sách ứng viên</h3>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-4 py-2 rounded ${activeTab === 0 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
        >
          Vòng 1
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 rounded ${activeTab === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
        >
          Vòng 2
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-4 py-2 rounded ${activeTab === 2 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
        >
          Vòng 3
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-600">Đang tải...</p>
      ) : filteredCandidates.length > 0 ? (
        <ul className="space-y-2">
          {filteredCandidates.map((c) => (
            <li
              key={c.cv_id}
              className="border rounded p-3 flex items-center justify-between hover:bg-gray-100"
            >
              <div>
                <div className="text-sm">
                  CV ID: <span className="font-mono">{c.cv_id}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Trạng thái: <span className="text-red-600">{c.result}</span> – Điểm: {c.score}/100
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <button
                  onClick={() => onShowDetail(String(c.cv_id))}
                  title="Xem đánh giá chi tiết"
                  className="hover:text-blue-600"
                >
                  <FaInfoCircle size={18} />
                </button>
                {/* Nút theo trạng thái */}
                {c.status === 0 && (
                  <button
                    onClick={() => onApproveCV(String(c.cv_id))}
                    className="px-3 py-1 rounded bg-yellow-400 text-black text-sm"
                  >
                    Duyệt CV
                  </button>
                )}
                {c.status === 1 && (
                  <button
                    onClick={() => onSendToCandidate(String(c.cv_id))}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                  >
                    Gửi CV cho ứng viên
                  </button>
                )}
                {c.status === 2 && (
                  <>
                    <button
                      onClick={() => onShowChat(String(c.cv_id))}
                      title="Xem lịch sử chat"
                      className="hover:text-green-600"
                    >
                      <FaComments size={18} />
                    </button>
                    <button
                      onClick={() => onScheduleInterview(String(c.cv_id))}
                      className="px-3 py-1 rounded bg-green-500 text-white text-sm"
                    >
                      Đặt lịch phỏng vấn
                    </button>
                  </>
                )}
                {c.status === 3 && (
                  <button
                    onClick={() => onNotifyHired(String(c.cv_id))}
                    className="px-3 py-1 rounded bg-purple-600 text-white text-sm"
                  >
                    Thông báo trúng tuyển
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">Không có ứng viên nào ở vòng này.</p>
      )}
    </div>
  );
}
