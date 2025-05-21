import { useEffect, useState } from "react";
import { fetchJDList, fetchJDById, updateJD } from "../../services/jd";

interface JD {
  jd_id: string;
  title: string;
  content: string;
}

export default function JDViewerEditor() {
  const [jdList, setJdList] = useState<JD[]>([]);
  const [selectedJdId, setSelectedJdId] = useState<string>("");
  const [jdContent, setJdContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  // Lấy danh sách JD
  useEffect(() => {
    const loadJDList = async () => {
      try {
        const list = await fetchJDList();
        setJdList(list);
        if (list.length > 0) {
          setSelectedJdId(list[0].jd_id);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách JD:", err);
      }
    };

    loadJDList();
  }, []);

  // Lấy nội dung JD khi chọn
  useEffect(() => {
    if (!selectedJdId) return;

    const loadJDDetail = async () => {
      try {
        const detail = await fetchJDById(selectedJdId);
        setJdContent(detail.content);
      } catch (err) {
        console.error("Lỗi khi lấy nội dung JD:", err);
      }
    };

    loadJDDetail();
  }, [selectedJdId]);

  // Lưu nội dung JD đã chỉnh sửa
  const handleSave = async () => {
    try {
      await updateJD(selectedJdId, jdContent);
      setIsEditing(false);
    } catch (err) {
      console.error("Lỗi khi lưu JD:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">📄 JD Tuyển dụng</h3>

      <select
        value={selectedJdId}
        onChange={(e) => setSelectedJdId(e.target.value)}
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
          <textarea
            value={jdContent}
            onChange={(e) => setJdContent(e.target.value)}
            className="w-full h-40 border rounded p-2 mb-2"
          />
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1 rounded mr-2">
            Lưu
          </button>
          <button onClick={() => setIsEditing(false)} className="text-gray-600 underline">
            Hủy
          </button>
        </>
      ) : (
        <>
          <p className="whitespace-pre-line text-sm text-gray-700 mb-2">{jdContent}</p>
          <button onClick={() => setIsEditing(true)} className="text-blue-600 underline">
            Chỉnh sửa
          </button>
        </>
      )}
    </div>
  );
}
