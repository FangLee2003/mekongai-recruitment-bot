import React from "react";
import { useState, useEffect } from "react";
import { uploadCV } from "../../services/cv";
import type { UploadedCV } from "../../types";

interface Props {
  jdId: string;
  onUploaded: (cvData: UploadedCV) => void;
}

const fileTypeIcons: Record<string, React.JSX.Element> = {
  pdf: (
    <svg
      className="w-10 h-10 text-red-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 2h7l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
    </svg>
  ),
  doc: (
    <svg
      className="w-10 h-10 text-blue-600"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 2h9l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
    </svg>
  ),
  docx: (
    <svg
      className="w-10 h-10 text-blue-800"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 2h9l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
    </svg>
  ),
  default: (
    <svg
      className="w-10 h-10 text-gray-400"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="14" height="18" x="5" y="3" rx="2" ry="2" />
    </svg>
  ),
};

export default function CVUploader({ jdId, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setFile(null);
    setStatus("idle");
    setErrorMessage("");
  }, [jdId]);

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setErrorMessage("");

    try {
      const cvData = await uploadCV(file, jdId);
      localStorage.setItem("cv_id", cvData.cv_id);
      onUploaded(cvData);
      setStatus("done");
    } catch (error: any) {
      setErrorMessage(error?.message || "Upload thất bại. Vui lòng thử lại.");
      setStatus("error");
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div
        className="mx-auto bg-white rounded-xl 
            p-6 
            border-2 border-blue-700 
            shadow-lg 
            transition 
            hover:shadow-xl 
            hover:border-blue-800
        "
        >
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6 select-none">
        Ứng tuyển
      </h3>

      <label
        htmlFor="cv-upload"
        className="cursor-pointer inline-flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
          px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
      >
        <svg
          className="w-6 h-6 mr-2 -ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
        Chọn file CV
        <input
          id="cv-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      {file && (
        <div
          className="mt-5 flex items-center bg-gray-50 rounded-lg shadow-inner p-4 gap-4 select-text"
          role="region"
          aria-label="File information"
        >
          {/* Icon file tương ứng */}
          <div>
            {(fileTypeIcons[getFileExtension(file.name)] ||
              fileTypeIcons["default"])}
          </div>

          <div className="flex-1">
            <p className="text-md font-medium text-gray-900 truncate">{file.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
          </div>

          <button
            type="button"
            aria-label="Xóa file đã chọn"
            onClick={() => setFile(null)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <svg
              className="w-6 h-6 text-gray-600 hover:text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <button
        disabled={!file || status === "uploading"}
        onClick={handleUpload}
        className={`mt-3 w-full flex justify-center items-center gap-3 rounded-lg
          px-6 py-3 font-semibold text-white transition
          ${
            status === "uploading"
              ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 cursor-wait"
              : "bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 hover:scale-[1.03] hover:shadow-lg"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          `}
      >
        {status === "uploading" && (
          <svg
            className="animate-spin w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        )}
        {status === "uploading" ? "Đang phân tích CV..." : "Gửi CV"}
      </button>

      {status === "done" && (
        <p
          className="mt-5 text-green-600 font-semibold text-center select-none"
          role="alert"
        >
          🎉 Gửi thành công!
        </p>
      )}

      {status === "error" && (
        <p
          className="mt-5 text-red-600 font-semibold text-center select-none"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
