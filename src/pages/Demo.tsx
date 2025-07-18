import { useEffect, useState } from "react";
import JDViewerEditor from "../components/HR/JDViewerEditor";
import CandidateList from "../components/HR/CandidateList";
import CandidateDetail from "../components/HR/CandidateDetail";
import JDViewer from "../components/Candidate/JDViewer";
import CVUploader from "../components/Candidate/CVUploader";
import Invitation from "../components/Candidate/Invitation";
import InterviewChat from "../components/Candidate/InterviewChat";
import ChatHistory from "../components/ChatHistory";
import AnimatedModal from "../components/Modal/AnimatedModal";

import { FiUsers, FiUserCheck } from "react-icons/fi";

import { generateQuestionSet } from "../services/interview";

import type { CV } from "../types";

import Layout from "../layouts";
import QuestionList from "../components/HR/QuestionList";

export default function Demo() {
  const [uploadedCV, setUploadedCV] = useState<CV | null>(null);
  const [selectedJdId, setSelectedJdId] = useState("1"); // Ứng viên
  const [selectedJdHRId, setSelectedJdHRId] = useState("1"); // HR
  const [selectedCVId, setSelectedCVId] = useState(
    localStorage.getItem("cv_id")
  );
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
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
    <Layout>
      <div className="flex h-screen">
        {/* HR SIDE */}
        <div className="w-1/2 bg-white p-4 overflow-y-auto">
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
            onShowQuestions={(cvId) => { setSelectedCVId(cvId); setQuestionModalOpen(true); }}
            onSendToCandidate={(cvId) => { setSelectedCVId(cvId); setViewState("chatting"); }}
            onScheduleInterview={(cvId) => { console.log("Đặt lịch phỏng vấn", cvId); }}
            onNotifyHired={(cvId) => { console.log("Thông báo trúng tuyển", cvId); }}
          />
        </div>

        {/* CANDIDATE SIDE */}
        <div className="w-1/2 bg-white p-4 overflow-y-auto border-l-2 border-blue-800">
          <h2 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
            <FiUserCheck className="mr-2" />
            Ứng viên
          </h2>
          <JDViewer onChange={setSelectedJdId} />
          {(!uploadedCV && viewState === "idle") && (
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
            className="text-lg text-right text-white bg-red-500 hover:bg-red-400 py-2 px-4 rounded-full" // Consider making this button more prominent or positioned like modal close buttons
          >
            ✕
          </button>
          {selectedCVId && <CandidateDetail cvId={selectedCVId} />}
        </AnimatedModal>
        {/* Modal danh sách câu hỏi */}
        <AnimatedModal
          isOpen={questionModalOpen}
          onRequestClose={() => setQuestionModalOpen(false)}
          contentLabel="Danh sách câu hỏi ứng viên"
        >
          <button
            onClick={() => setQuestionModalOpen(false)}
            className="text-lg text-right text-white bg-red-500 hover:bg-red-400 py-2 px-4 rounded-full" // Consider making this button more prominent or positioned like modal close buttons
          >
            ✕
          </button>
          {selectedCVId && <QuestionList cvId={selectedCVId} />}
        </AnimatedModal>
        {/* Modal lịch sử chat */}
        <AnimatedModal
          isOpen={chatModalOpen}
          onRequestClose={() => setChatModalOpen(false)}
          contentLabel="Lịch sử trò chuyện ứng viên"
        >
          <button
            onClick={() => setChatModalOpen(false)}
            className="text-lg text-right text-white bg-red-500 hover:bg-red-400 py-2 px-4 rounded-full" // Consider making this button more prominent or positioned like modal close buttons
          >
            ✕
          </button>
          {selectedCVId && <ChatHistory cvId={selectedCVId} />}
        </AnimatedModal>
      </div>
    </Layout>
  );
}