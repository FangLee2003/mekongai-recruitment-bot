import { useState, useEffect } from "react";
import { uploadCV } from "../../services/cv";

interface Props {
    jdId: string;
    onUploaded: (cvData: {
        cv_id: string;
        url: string;
        jd_id: string;
        result: string;
        score: number;
        evaluate: string;
        content: string;
    }) => void;
}

export default function CVUploader({ jdId, onUploaded }: Props) {
    useEffect(() => {
        console.log("JD ID cập nhật trong CVUploader:", jdId);
        setFile(null);       // reset file khi jdId đổi
        setStatus("idle");   // reset trạng thái upload
        }, [jdId]);

    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");

    const handleUpload = async () => {
        if (!file) return;

        setStatus("uploading");

        try {
            const cvData = await uploadCV(file, jdId);
            localStorage.setItem("cv_id", cvData.cv_id);
            onUploaded(cvData);
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
