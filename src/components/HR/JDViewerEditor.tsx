import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { fetchJDList, fetchJDById, updateJD } from "../../services/jd";

interface JD {
  jd_id: string;
  title: string;
  content: string; // Markdown hoặc HTML
}

interface Props {
  onChange?: (jd_id: string) => void;
}

export default function JDViewerEditor({ onChange }: Props) {
  const [jdList, setJDList] = useState<JD[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [jdContent, setJdContent] = useState<string>("");
  const [jdTitle, setJdTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const remarkPlugins = [remarkGfm, remarkBreaks];
  const rehypePlugins = [rehypeRaw, rehypeSanitize];

  // Load danh sách JD
  useEffect(() => {
    (async () => {
      try {
        setLoadingList(true);
        const list = await fetchJDList();
        setJDList(list);
        if (list.length > 0) {
          setSelectedId(list[0].jd_id);
          setJdContent(list[0].content);
          setJdTitle(list[0].title);
          onChange?.(list[0].jd_id);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách JD:", err);
      } finally {
        setLoadingList(false);
      }
    })();
  }, [onChange]);

  // Load chi tiết khi selectedId thay đổi
  useEffect(() => {
    if (!selectedId) return;
    (async () => {
      try {
        setLoadingDetail(true);
        const detail = await fetchJDById(selectedId);
        setJdContent(detail.content);
        setJdTitle(detail.title);
        setIsEditing(false); // Reset chế độ chỉnh sửa khi đổi JD
      } catch (err) {
        console.error("Lỗi khi lấy nội dung JD:", err);
      } finally {
        setLoadingDetail(false);
      }
    })();
  }, [selectedId]);

  // Xử lý lưu nội dung chỉnh sửa
  const handleSave = async () => {
    if (!selectedId) return;
    try {
      setSaving(true);
      await updateJD(selectedId, jdContent);
      setIsEditing(false);
      // Cập nhật lại danh sách hoặc nội dung nếu cần
      // Ở đây bạn có thể reload hoặc update jdList nếu backend trả về dữ liệu mới
    } catch (err) {
      console.error("Lỗi khi lưu JD:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-5 mb-5 mx-auto bg-gradient-to-tr from-blue-900 via-indigo-900 to-gray-900 text-gray-100 p-8 rounded-2xl shadow-lg">
      <style>{`
        /* CSS scrollbar custom */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(100, 210, 255, 0.6);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(100, 210, 255, 0.9);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 210, 255, 0.6) transparent;
        }
        .custom-scrollbar:hover {
          scrollbar-color: rgba(100, 210, 255, 0.9) transparent;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          📄 Job Description
        </h3>

        <div className="mt-4 sm:mt-0 w-full sm:w-1/3">
          {loadingList ? (
            <div className="h-10 bg-indigo-800 animate-pulse rounded-lg" />
          ) : (
            <select
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                setIsEditing(false);
                onChange?.(e.target.value);
              }}
              className="w-full bg-indigo-800 border border-indigo-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none"
              disabled={saving}
            >
              {jdList.map((item) => (
                <option
                  key={item.jd_id}
                  value={item.jd_id}
                  className="bg-indigo-800 text-gray-100"
                >
                  {item.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Nội dung */}
      {loadingDetail ? (
        <p className="text-gray-400 italic">Đang tải nội dung JD...</p>
      ) : jdContent ? (
        <>
          <h4 className="text-2xl font-semibold text-cyan-200 border-b border-cyan-400 pb-2 mb-4">
            {jdTitle}
          </h4>

          {isEditing ? (
            <>
              <textarea
                value={jdContent}
                onChange={(e) => setJdContent(e.target.value)}
                className="w-full h-56 border border-gray-400 rounded p-3 text-gray-900 mb-4 resize-y"
                disabled={saving}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50`}
                >
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                  className="px-4 py-2 border border-gray-400 rounded text-gray-300 hover:text-white hover:border-white transition"
                >
                  Hủy
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="prose prose-invert max-w-full break-words overflow-y-auto custom-scrollbar"
                style={{ maxHeight: "400px" }}
              >
                <ReactMarkdown
                  remarkPlugins={remarkPlugins}
                  rehypePlugins={rehypePlugins}
                >
                  {jdContent}
                </ReactMarkdown>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-cyan-400 underline hover:text-cyan-200 transition"
              >
                Chỉnh sửa
              </button>
            </>
          )}
        </>
      ) : (
        <p className="text-gray-400 italic">Chưa có JD để hiển thị.</p>
      )}
    </div>
  );
}
