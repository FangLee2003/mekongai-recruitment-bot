import JDViewerEditor from "../components/HR/JDViewerEditor";
import CandidateList from "../components/HR/CandidateList";
import CandidateDetail from "../components/HR/CandidateDetail";
import QuestionSender from "../components/HR/QuestionSender";

import JDViewer from "../components/Applicant/JDViewer";
import CVUploader from "../components/Applicant/CVUploader";
import Invitation from "../components/Applicant/Invitation";
import InterviewChat from "../components/Applicant/InterviewChat";

import { useState } from "react";

export default function Demo() {
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [viewState, setViewState] = useState<"idle" | "invited" | "chatting" | "done">("idle");

  return (
    <div className="flex h-screen">
      {/* HR SIDE */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">🧑‍💼 Doanh nghiệp (HR)</h2>
        <JDViewerEditor />
        <CandidateList onSelect={setCurrentCVId} />
        {currentCVId && <CandidateDetail cvId={currentCVId} />}
        {currentCVId && <QuestionSender cvId={currentCVId} />}
      </div>

      {/* APPLICANT SIDE */}
      <div className="w-1/2 bg-white p-4 overflow-y-auto border-l">
        <h2 className="text-xl font-bold mb-2">👩‍💻 Ứng viên</h2>
        <JDViewer />
        <CVUploader onUploaded={(cvId) => {
          localStorage.setItem("cv_id", cvId);
        }} />
        {viewState === "invited" && <Invitation onAccept={() => setViewState("chatting")} />}
        {viewState === "chatting" && <InterviewChat cvId={localStorage.getItem("cv_id")!} onFinish={() => setViewState("done")} />}
      </div>
    </div>
  );
}
