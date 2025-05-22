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
    <div className="mx-auto bg-white rounded-xl p-6 border-2 border-blue-700 shadow-lg transition hover:shadow-xl hover:border-blue-800">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 select-none">🧾 Danh sách ứng viên</h3>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        {["Vòng 1", "Vòng 2", "Vòng 3"].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`relative px-6 py-3 text-md font-semibold transition
              ${activeTab === idx ? "text-blue-700" : "text-gray-500 hover:text-blue-600"}
            `}
          >
            {label}
            {activeTab === idx && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-t-md"></span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-600 text-base animate-pulse">Đang tải...</p>
      ) : filteredCandidates.length > 0 ? (
        <ul className="space-y-4">
          {filteredCandidates.map((c) => (
            <li
              key={c.cv_id}
              className="border border-gray-200 rounded-xl p-5 flex justify-between items-center
                shadow-sm hover:shadow-lg transition-transform hover:scale-[1.02] bg-white"
            >
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  CV ID: <span className="font-mono text-gray-900">{c.cv_id}</span>
                </div>

                <div
                  className={`inline-block px-3 py-1 rounded-full font-medium text-sm
                    ${c.result === "Phù hợp"
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                    }
                  `}
                >
                  {c.result} – {c.score}/100
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <button
                  onClick={() => onShowDetail(String(c.cv_id))}
                  title="Xem đánh giá chi tiết"
                  className="p-2 rounded-full hover:bg-blue-100 hover:text-blue-700 transition"
                >
                  <FaInfoCircle size={20} />
                </button>

                {/* Nút theo trạng thái */}
                {c.status === 0 && (
                  <button
                    onClick={() => onApproveCV(String(c.cv_id))}
                    className="px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                  >
                    Duyệt CV
                  </button>
                )}

                {c.status === 1 && (
                  <button
                    onClick={() => onSendToCandidate(String(c.cv_id))}
                    className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Gửi CV cho ứng viên
                  </button>
                )}

                {c.status === 2 && (
                  <>
                    <button
                      onClick={() => onShowChat(String(c.cv_id))}
                      title="Xem lịch sử chat"
                      className="p-2 rounded-full hover:bg-green-100 hover:text-green-700 transition"
                    >
                      <FaComments size={20} />
                    </button>

                    <button
                      onClick={() => onScheduleInterview(String(c.cv_id))}
                      className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                    >
                      Đặt lịch phỏng vấn
                    </button>
                  </>
                )}

                {c.status === 3 && (
                  <button
                    onClick={() => onNotifyHired(String(c.cv_id))}
                    className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                  >
                    Thông báo trúng tuyển
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400 italic select-none">Không có ứng viên nào ở vòng này.</p>
      )}
    </div>
  );
}
