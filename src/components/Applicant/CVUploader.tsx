import { useState } from "react";
import axios from "axios";

interface Props {
    onUploaded: (cvId: string) => void;
}

export default function CVUploader({ onUploaded }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");

    const handleUpload = async () => {
        if (!file) return;

        setStatus("uploading");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("/api/upload-cv", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const cvId = res.data.cv_id;
            localStorage.setItem("cv_id", cvId); // 👈 lưu để sử dụng tiếp
            onUploaded(cvId);
            setStatus("done");
        } catch (error) {
            console.error("Lỗi khi upload CV:", error);
            setStatus("idle");
        }
    };

    return (
        <div className="bg-gray-50 p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-2">📤 Upload CV</h3>
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-2 block"
            />
            <button
                disabled={!file || status === "uploading"}
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
            >
                {status === "uploading" ? "Đang gửi..." : "Gửi CV"}
            </button>

            {status === "done" && (
                <p className="text-green-600 mt-2 text-sm">Đã gửi thành công! 🎉</p>
            )}
        </div>
    );
}
