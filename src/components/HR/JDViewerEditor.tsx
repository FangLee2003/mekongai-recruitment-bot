// JDViewerEditor.tsx
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";               // render Markdown
import remarkGfm from "remark-gfm";                       // hỗ trợ GitHub-Flavored Markdown
import remarkBreaks from "remark-breaks";                 // giữ nguyên xuống dòng
import rehypeRaw from "rehype-raw";                       // cho phép parse HTML trong Markdown
import rehypeSanitize from "rehype-sanitize";             // sanitize HTML
import { fetchJDList, fetchJDById, updateJD } from "../../services/jd";

interface JD {
  jd_id: string;
  title: string;
  content: string; // Markdown hoặc HTML
}

interface JDViewerEditorProps {
  selectedJdId: string;
  onChangeSelectedJd: (id: string) => void;
}

  // Cấu hình plugins cho ReactMarkdown
  const remarkPlugins = [remarkGfm, remarkBreaks];
  const rehypePlugins = [rehypeRaw, rehypeSanitize];

  // Load danh sách JD khi mount
  useEffect(() => {
    (async () => {
      const list = await fetchJDList();
      setJdList(list);
      if (list.length) {
        setSelectedJdId(list[0].jd_id);
      }
    })();
  }, []);

  // Load nội dung chi tiết khi chọn JD
  useEffect(() => {
    if (!selectedJdId) return;
    (async () => {
      const detail = await fetchJDById(selectedJdId);
      setJdContent(detail.content);
    })();
  }, [selectedJdId]);

  // Lưu thay đổi
  const handleSave = async () => {
    await updateJD(selectedJdId, jdContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">📄 JD Tuyển dụng</h3>

      {/* Dropdown chọn JD */}
      <select
        value={selectedJdId}
        onChange={(e) => onChangeSelectedJd(e.target.value)}
        className="border px-2 py-1 mb-2"
      >
        {jdList.map((jd) => (
          <option key={jd.jd_id} value={jd.jd_id}>
            {jd.title}
          </option>
        ))}
      </select>

      {isEditing ? (
        <>
          {/* textarea để edit nội dung raw (Markdown/HTML) */}
          <textarea
            value={jdContent}
            onChange={(e) => setJdContent(e.target.value)}
            className="w-full h-40 border rounded p-2 mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-1 rounded mr-2"
          >
            Lưu
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 underline"
          >
            Hủy
          </button>
        </>
      ) : (
        <>
          {/* Hiển thị nội dung qua ReactMarkdown */}
          <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap mb-2">
            <ReactMarkdown
              children={jdContent}
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
            />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 underline"
          >
            Chỉnh sửa
          </button>
        </>
      )}
    </div>
  );
}
