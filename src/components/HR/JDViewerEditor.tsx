import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { fetchJDList, fetchJDById } from "../../services/jd";

interface JD {
  jd_id: string;
  title: string;
  content: string; // Markdown hoặc HTML
}

interface Props {
  onChange?: (jd_id: string) => void;
}

export default function JDViewer({ onChange }: Props) {
  const [jdList, setJDList] = useState<JD[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [jd, setJD] = useState<JD | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const remarkPlugins = [remarkGfm, remarkBreaks];
  const rehypePlugins = [rehypeRaw, rehypeSanitize];

  // Load danh sách JD
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchJDList();
        setJDList(list);
        if (list.length > 0) {
          const first = list[0];
          setSelectedId(first.jd_id);
          onChange?.(first.jd_id);
        }
      } finally {
        setLoadingList(false);
      }
    })();
  }, [onChange]);

  // Load chi tiết khi selectedId thay đổi
  useEffect(() => {
    if (!selectedId) return;
    setLoadingDetail(true);
    (async () => {
      try {
        const detail = await fetchJDById(selectedId);
        setJD(detail);
      } finally {
        setLoadingDetail(false);
      }
    })();
  }, [selectedId]);

  return (
    <div className="mt-5 mb-5 mx-auto bg-gradient-to-tr from-blue-900 via-indigo-900 to-gray-900 text-gray-100 p-8 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          📄 Thông tin JD
        </h3>
        {/* Selector */}
        <div className="mt-4 sm:mt-0 w-full sm:w-1/3">
          {loadingList ? (
            <div className="h-10 bg-indigo-800 animate-pulse rounded-lg" />
          ) : (
            <select
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                onChange?.(e.target.value);
              }}
              className="w-full bg-indigo-800 border border-indigo-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none"
            >
              {jdList.map((item) => (
                <option key={item.jd_id} value={item.jd_id} className="bg-indigo-800 text-gray-100">
                  {item.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Content */}
      {loadingDetail ? (
        <p className="text-gray-400 italic">Đang tải nội dung JD...</p>
      ) : jd ? (
        <div className="space-y-8">
          <h4 className="text-2xl font-semibold text-cyan-200 border-b border-cyan-400 pb-2">
            {jd.title}
          </h4>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
              {jd.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 italic">Chưa có JD để hiển thị.</p>
      )}
    </div>
  );
}
