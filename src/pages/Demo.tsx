import JDViewerEditor from "../components/HR/JDViewerEditor";
import CandidateList from "../components/HR/CandidateList";
import CandidateDetail from "../components/HR/CandidateDetail";
import QuestionSender from "../components/HR/QuestionSender";

import JDViewer from "../components/Candidate/JDViewer";
import CVUploader from "../components/Candidate/CVUploader";
import Invitation from "../components/Candidate/Invitation";
import InterviewChat from "../components/Candidate/InterviewChat";
import ChatHistory from "../components/ChatHistory";

import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck } from "react-icons/fi";

import Modal from "react-modal";

Modal.setAppElement("#root"); // hoặc id của root element app bạn

export default function Demo() {
  const [uploadedCV, setUploadedCV] = useState<{
    cv_id: string;
    url: string;
    jd_id: string;
    content: string;
    result: string;
    score: number;
    evaluate: string;
  } | null>(null);
  const [selectedJdId, setSelectedJdId] = useState<string>("1");
  const [selectedJdHRId, setSelectedJdHRId] = useState<string>("1");

  const [selectedCVId, setSelectedCVId] = useState<string | null>(localStorage.getItem("cv_id"));

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const [viewState, setViewState] = useState<"idle" | "invited" | "chatting" | "done">("idle");

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
        <h2 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
          <FiUsers className="mr-2" />
          Doanh nghiệp (HR)
        </h2>
        <JDViewerEditor onChange={setSelectedJdHRId} />
        <CandidateList
          jdId={Number(selectedJdId)}
          onShowDetail={(cvId) => {
            setSelectedCVId(cvId);
            setDetailModalOpen(true);
          }}
          onShowChat={(cvId) => {
            setSelectedCVId(cvId);
            setChatModalOpen(true);
          }}
        />
        {currentCVId && <CandidateDetail cvId={currentCVId} />}
        {currentCVId && <QuestionSender cvId={currentCVId} />}
        {currentCVId && <ChatHistory cvId={currentCVId} />}
      </div>

      {/* CANDIDATE SIDE */}
      <div className="w-1/2 bg-white p-4 overflow-y-auto border-l">
        <h2 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
          <FiUserCheck className="mr-2" />
          Ứng viên
        </h2>
        <JDViewer
          onChange={setSelectedJdId}
        />
        <CVUploader
          jdId={selectedJd}
          onUploaded={(cvData) => {
            localStorage.setItem("cv_id", cvData.cv_id);
            setUploadedCV(cvData);
          }}
        />

        {viewState === "invited" && (
          <Invitation onAccept={() => setViewState("chatting")} />
        )}

        {viewState === "chatting" && uploadedCV && (
          <InterviewChat
            cvId={uploadedCV.cv_id}
            onFinish={() => setViewState("done")}
          />
        )}

        {viewState === "done" && uploadedCV && (
          <ChatHistory cvId={uploadedCV.cv_id} />
        )}
      </div>
      {/* Modal Chi tiết ứng viên */}
      <Modal
        isOpen={detailModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        contentLabel="Chi tiết đánh giá ứng viên"
        className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto z-50"
      >
        <button
          onClick={() => setDetailModalOpen(false)}
          className="mb-4 text-right text-gray-600 hover:text-gray-900"
        >
          Đóng ✕
        </button>
        {selectedCVId && <CandidateDetail cvId={selectedCVId} />}
      </Modal>

      {/* Modal Lịch sử chat */}
      <Modal
        isOpen={chatModalOpen}
        onRequestClose={() => setChatModalOpen(false)}
        contentLabel="Lịch sử trò chuyện ứng viên"
        className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto z-50"
      >
        <button
          onClick={() => setChatModalOpen(false)}
          className="mb-4 text-right text-gray-600 hover:text-gray-900"
        >
          Đóng ✕
        </button>
        {selectedCVId && <ChatHistory cvId={selectedCVId} />}
      </Modal>
    </div>
  );
}