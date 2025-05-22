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

// Imports from the App component for the navbar
import React from "react"; // Ensure React is imported if not already
import {
  Zap,
  Sparkles,
  Menu,
  X,
  // Add other icons if your navLinks or other parts of the header use them
  // For the provided nav, these are sufficient for the header structure
} from "lucide-react";

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
  const [selectedJdId, setSelectedJdId] = useState("1"); // Ứng viên
  const [selectedJdHRId, setSelectedJdHRId] = useState("1"); // HR
  const [selectedCVId, setSelectedCVId] = useState(
    localStorage.getItem("cv_id")
  );
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [viewState, setViewState] = useState("idle");

  // State for mobile menu from App component
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const cvId = localStorage.getItem("cv_id");
    const isDone =
      cvId && localStorage.getItem(`interview_done_${cvId}`) === "true";
    const isInvited = localStorage.getItem("question_set_ready") === "true";

    if (cvId && isDone) setViewState("done");
    else if (cvId && isInvited) setViewState("invited");
  }, []);

  // Nav links from App component
  const navLinks = [
    { href: "/#features", label: "Tính Năng" }, // Assuming your main page is at root and has these sections
    { href: "/#how-it-works", label: "Cách Hoạt Động" },
    // { href: "/contact", label: "Liên Hệ" }, // Kept commented as in original
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header from App component */}
      <header className="container mx-auto px-4 sm:px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-sky-600" />
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-sky-600">AI</span> TUYỂN DỤNG
            </h1>
          </a>
          {/* <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-sky-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/demo" // This page is /demo, consider if this link should be active or styled differently
              className="bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-sky-700 transition transform hover:scale-105 flex items-center gap-2 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Demo Sản Phẩm
            </a>
          </nav> */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-sky-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-600 hover:text-sky-600 py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/demo" // This page is /demo
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mt-2 bg-sky-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md hover:bg-sky-700 transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Demo Sản Phẩm
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Original Demo content */}
      {/* Changed h-screen to flex-grow to allow header to take space */}
      <div className="flex flex-grow"> {/* Adjust height: removed h-screen, added flex-grow */}
        {/* HR SIDE */}
        <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
          <JDViewerEditor onChange={setSelectedJdHRId} />
          <CandidateList
            jdId={Number(selectedJdHRId)}
            onShowDetail={(cvId) => {
              setSelectedCVId(cvId);
              setDetailModalOpen(true);
            }}
            onShowChat={(cvId) => {
              setSelectedCVId(cvId);
              setChatModalOpen(true);
            }}
            onApproveCV={(cvId) => {
              /* Xử lý duyệt CV */
            }}
            onSendToCandidate={(cvId) => {
              /* Gửi CV */
            }}
            onScheduleInterview={(cvId) => {
              /* Đặt lịch phỏng vấn */
            }}
            onNotifyHired={(cvId) => {
              /* Thông báo trúng tuyển */
            }}
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
    </div>
  );
}