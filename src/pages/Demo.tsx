import { useEffect, useState } from "react";
import JDViewerEditor from "../components/HR/JDViewerEditor";
import CandidateList from "../components/HR/CandidateList";
import CandidateDetail from "../components/HR/CandidateDetail";
import JDViewer from "../components/Candidate/JDViewer";
import CVUploader from "../components/Candidate/CVUploader";
import Invitation from "../components/Candidate/Invitation";
import InterviewChat from "../components/Candidate/InterviewChat";
import ChatHistory from "../components/ChatHistory";
import AnimatedModal from "../components/AnimatedModal";

import { FiUsers, FiUserCheck } from "react-icons/fi";

import { generateQuestionSet } from "../services/interview";

import type { UploadedCV } from "../types";

export default function Demo() {
  const [uploadedCV, setUploadedCV] = useState<UploadedCV | null>(null);
  const [selectedJdId, setSelectedJdId] = useState("1"); // Ứng viên
  const [selectedJdHRId, setSelectedJdHRId] = useState("1"); // HR
  const [selectedCVId, setSelectedCVId] = useState(
    localStorage.getItem("cv_id")
  );
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const [viewState, setViewState] = useState("idle");
  console.log("viewState", viewState);

  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    const cvId = localStorage.getItem("cv_id");
    const isDone =
      cvId && localStorage.getItem(`interview_done_${cvId}`) === "true";
    const isInvited = localStorage.getItem("question_set_ready") === "true";

    if (cvId && isDone) setViewState("done");
    else if (cvId && isInvited) setViewState("invited");
  }, []);

  const [chartModalOpen, setChartModalOpen] = useState(false);
const [chartHtml, setChartHtml] = useState<string>("");

const handleGenerateChart = async (cvId: string) => {
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
    // console.log("Biểu đồ trả về:", json.data);

    // Giả sử json có dạng { data: "<html hoặc svg ...>" }
    if (!json.data) {
      throw new Error("API trả về dữ liệu biểu đồ rỗng");
    }

    setChartHtml(json.data);
    setChartModalOpen(true);
  } catch (error) {
    console.error("Lỗi khi lấy biểu đồ:", error);
    // Có thể hiển thị thông báo lỗi UI nếu muốn
  }
};


 
  // Xử lý duyệt CV
  const handleApproveCV = async (cvId: string) => {
    try {
      // Gọi API tạo bộ câu hỏi
      await generateQuestionSet(cvId);

      // Cập nhật trạng thái vòng 2 cho ứng viên (tùy cách bạn quản lý)
      // Ví dụ cập nhật trạng thái vòng trong uploadedCV nếu đúng cvId
      if (uploadedCV && uploadedCV.cv_id === cvId) {
        setUploadedCV({ ...uploadedCV, status: 1 });
      }

      // Chuyển trạng thái viewState sang "invited" để hiện Invitation và chờ ứng viên trả lời
      setViewState("invited");
      setRefreshFlag((prev) => prev + 1);

      // Nếu cần có thể thông báo thành công
    } catch (error) {
      console.error("Lỗi khi duyệt CV:", error);
      // Thông báo lỗi tùy ý
    }
  };

  return (
    <div className="flex h-screen">
      {/* HR SIDE */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
          <FiUsers className="mr-2" />
          Doanh nghiệp (HR)
        </h2>
        <JDViewerEditor onChange={setSelectedJdHRId} />
        <CandidateList
          jdId={selectedJdHRId}
          refreshFlag={refreshFlag}
          onShowDetail={(cvId) => { setSelectedCVId(cvId); setDetailModalOpen(true); }}
          onShowChat={(cvId) => { setSelectedCVId(cvId); setChatModalOpen(true); }}
          onApproveCV={handleApproveCV}
          onSendToCandidate={(cvId) => { console.log("Gửi CV cho ứng viên", cvId); setViewState("chatting"); setSelectedCVId(cvId); }}
          onScheduleInterview={(cvId) => { console.log("Đặt lịch phỏng vấn", cvId); }}
          onNotifyHired={(cvId) => { console.log("Thông báo trúng tuyển", cvId); }}
          onGenerateChart={handleGenerateChart}
        />
      </div>

      {/* CANDIDATE SIDE */}
      <div className="w-1/2 bg-white p-4 overflow-y-auto border-l">
        <h2 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
          <FiUserCheck className="mr-2" />
          Ứng viên
        </h2>
        <JDViewer onChange={setSelectedJdId} />
        {(!uploadedCV && viewState !== "invited") && (
          <CVUploader
            jdId={selectedJdId}
            onUploaded={(cvData) => {
              localStorage.setItem("cv_id", cvData.cv_id);
              setUploadedCV(cvData);
              setViewState("evaluated");
              setRefreshFlag((prev) => prev + 1);
            }}
          />
        )}

        {uploadedCV && <CandidateDetail cvId={uploadedCV.cv_id} />}

        {viewState === "invited" && (
          <Invitation onAccept={() => setViewState("chatting")} />
        )}
        {viewState === "chatting" && (
          <InterviewChat
            cvId={selectedCVId || ""}
            onFinish={() => setViewState("done")}
            initialQuestion="Rất vui được gặp bạn! Tôi là AI phỏng vấn viên của MekongAI, sẽ đồng hành cùng bạn trong buổi phỏng vấn hôm nay. Bạn đã sẵn sàng để bắt đầu chưa?"
          />
        )}
        {viewState === "done" && selectedCVId && (
          <ChatHistory cvId={selectedCVId} />
        )}
      </div>

      {/* Modal đánh giá ứng viên */}
      <AnimatedModal
        isOpen={detailModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        contentLabel="Chi tiết đánh giá ứng viên"
      >
        <button
          onClick={() => setDetailModalOpen(false)}
          className="mb-4 text-right text-gray-600 hover:text-gray-900" // Consider making this button more prominent or positioned like modal close buttons
        >
          Đóng ✕
        </button>
        {selectedCVId && <CandidateDetail cvId={selectedCVId} />}
      </AnimatedModal>

      {/* Modal lịch sử chat */}
      <AnimatedModal
        isOpen={chatModalOpen}
        onRequestClose={() => setChatModalOpen(false)}
        contentLabel="Lịch sử trò chuyện ứng viên"
      >
        <button
          onClick={() => setChatModalOpen(false)}
          className="mb-4 text-right text-gray-600 hover:text-gray-900" // Same consideration for button styling
        >
          Đóng ✕
        </button>
        {selectedCVId && <ChatHistory cvId={selectedCVId} />}
      </AnimatedModal>

      <AnimatedModal
  isOpen={chartModalOpen}
  onRequestClose={() => setChartModalOpen(false)}
  contentLabel="Biểu đồ thống kê"
  // className="max-w-4xl max-h-[80vh] overflow-auto p-4 bg-white rounded-lg shadow-lg"
>
  <button
    onClick={() => setChartModalOpen(false)}
    className="mb-4 text-right text-gray-600 hover:text-gray-900"
  >
    Đóng ✕
  </button>
  <div
    style={{ width: "100%", height: "500px", overflow: "auto" }}
    dangerouslySetInnerHTML={{ __html: chartHtml }}
  />
</AnimatedModal>


    </div>
  );
}