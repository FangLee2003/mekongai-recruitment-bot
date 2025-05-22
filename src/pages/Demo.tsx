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

interface UploadedCV {
  cv_id: string;
  url: string;
  jd_id: string;
  result: string;
  score: number;
  evaluate: string;
  content: string;
  status: number; // trạng thái vòng 1,2,3 theo yêu cầu
}

export default function Demo() {
  const [uploadedCV, setUploadedCV] = useState<UploadedCV | null>(null);
  const [selectedJdId, setSelectedJdId] = useState("1");       // Ứng viên
  const [selectedJdHRId, setSelectedJdHRId] = useState("1");   // HR
  const [selectedCVId, setSelectedCVId] = useState(localStorage.getItem("cv_id"));
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [viewState, setViewState] = useState("idle");

  useEffect(() => {
    const cvId = localStorage.getItem("cv_id");
    const isDone = cvId && localStorage.getItem(`interview_done_${cvId}`) === "true";
    const isInvited = localStorage.getItem("question_set_ready") === "true";

    if (cvId && isDone) setViewState("done");
    else if (cvId && isInvited) setViewState("invited");
  }, []);

  return (
    <div className="flex h-screen">
      {/* HR SIDE */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
        <JDViewerEditor onChange={setSelectedJdHRId} />
        <CandidateList
          jdId={Number(selectedJdHRId)}
          onShowDetail={(cvId) => { setSelectedCVId(cvId); setDetailModalOpen(true); }}
          onShowChat={(cvId) => { setSelectedCVId(cvId); setChatModalOpen(true); }}
          onApproveCV={(cvId) => { /* Xử lý duyệt CV */ }}
          onSendToCandidate={(cvId) => { /* Gửi CV */ }}
          onScheduleInterview={(cvId) => { /* Đặt lịch phỏng vấn */ }}
          onNotifyHired={(cvId) => { /* Thông báo trúng tuyển */ }}
        />
      </div>

      {/* CANDIDATE SIDE */}
      <div className="w-1/2 bg-white p-4 overflow-y-auto border-l">
        <JDViewer onChange={setSelectedJdId} />
        {(!uploadedCV || uploadedCV.status === 0) && (
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

        {viewState === "invited" && <Invitation onAccept={() => setViewState("chatting")} />}
        {viewState === "chatting" && uploadedCV && (
          <InterviewChat cvId={uploadedCV.cv_id} onFinish={() => setViewState("done")} />
        )}
        {viewState === "done" && uploadedCV && <ChatHistory cvId={uploadedCV.cv_id} />}
      </div>

      {/* Modal đánh giá ứng viên */}
      <AnimatedModal
        isOpen={detailModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        contentLabel="Chi tiết đánh giá ứng viên"
      >
        <button
          onClick={() => setDetailModalOpen(false)}
          className="mb-4 text-right text-gray-600 hover:text-gray-900"
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
          className="mb-4 text-right text-gray-600 hover:text-gray-900"
        >
          Đóng ✕
        </button>
        {selectedCVId && <ChatHistory cvId={selectedCVId} />}
      </AnimatedModal>
    </div>
  );
}
