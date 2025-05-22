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

import { generateQuestionSet, sendInterviewAnswer } from "../services/interview";

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

  const [candidateStatusMap, setCandidateStatusMap] = useState<Record<string, number>>({}); // cvId => status vòng

  useEffect(() => {
    const cvId = localStorage.getItem("cv_id");
    const isDone =
      cvId && localStorage.getItem(`interview_done_${cvId}`) === "true";
    const isInvited = localStorage.getItem("question_set_ready") === "true";

    if (cvId && isDone) setViewState("done");
    else if (cvId && isInvited) setViewState("invited");
  }, []);

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
        <JDViewerEditor onChange={setSelectedJdHRId} />
        <CandidateList
          jdId={selectedJdHRId}
          onShowDetail={(cvId) => { setSelectedCVId(cvId); setDetailModalOpen(true); }}
          onShowChat={(cvId) => { setSelectedCVId(cvId); setChatModalOpen(true); }}
          onApproveCV={handleApproveCV}
          onSendToCandidate={(cvId) => { /* Gửi CV */ }}
          onScheduleInterview={(cvId) => { /* Đặt lịch phỏng vấn */ }}
          onNotifyHired={(cvId) => { /* Thông báo trúng tuyển */ }}
        />
      </div>

      {/* CANDIDATE SIDE */}
      <div className="w-1/2 bg-white p-4 overflow-y-auto border-l">
        <JDViewer onChange={setSelectedJdId} />
        {(!uploadedCV && viewState !== "invited") && (
          <CVUploader
            jdId={selectedJdId}
            onUploaded={(cvData) => {
              localStorage.setItem("cv_id", cvData.cv_id);
              setUploadedCV(cvData);
              setViewState("evaluated");
            }}
          />
        )}

        {uploadedCV && <CandidateDetail cvId={uploadedCV.cv_id} />}

        {viewState === "invited" && (
          <Invitation onAccept={() => setViewState("chatting")} />
        )}
        {viewState === "chatting" && (
          <InterviewChat
            cvId={localStorage.getItem("cv_id")}
            onFinish={() => setViewState("done")}
            initialQuestion="Rất vui được gặp bạn! Tôi là AI phỏng vấn viên của MekongAI, sẽ đồng hành cùng bạn trong buổi phỏng vấn hôm nay. Bạn đã sẵn sàng để bắt đầu chưa?"
          />
        )}
        {viewState === "done" && uploadedCV && (
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
    </div>
  );
}