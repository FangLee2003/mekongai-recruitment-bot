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
          const firstId = list[0].jd_id;
          setSelectedId(firstId);
          onChange?.(firstId);
        }
      } finally {
        setLoadingList(false);
      }
    })();
  }, [onChange]);

  // Load chi tiết mỗi khi selectedId thay đổi
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

  // Khi user chọn mới
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-3">📄 Thông tin JD tuyển dụng</h3>

      {loadingList ? (
        <p className="text-gray-500 italic">Đang tải danh sách JD...</p>
      ) : (
        <select
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full mb-4 border rounded px-2 py-1"
        >
          {jdList.map((item) => (
            <option key={item.jd_id} value={item.jd_id}>
              {item.title}
            </option>
          ))}
        </select>
      )}

      {loadingDetail ? (
        <p className="text-gray-500 italic">Đang tải nội dung JD...</p>
      ) : jd ? (
        <div>
          <h2 className="text-xl font-bold mb-2">{jd.title}</h2>
          <div className="prose prose-base max-w-none overflow-y-auto max-h-[60vh]">
            <ReactMarkdown
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
            >
              {jd.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : null}
    </div>
  );
}
