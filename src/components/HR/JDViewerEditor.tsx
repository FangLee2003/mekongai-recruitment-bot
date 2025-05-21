import { useEffect, useState } from "react";
import axios from "axios";

export default function JDViewerEditor() {
  const [jd, setJd] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fakeJD =
    `🎯JD Tuyển dụng vị trí Frontend Developer
        - Thành thạo ReactJS, HTML/CSS, JavaScript
        - Ưu tiên biết TailwindCSS và Typescript
        - Kinh nghiệm: 1 năm trở lên
        - Làm việc tại: Quận 1, TP.HCM`;
    setJd(fakeJD);
  }, []);

  // useEffect(() => {
  //   const fetchJD = async () => {
  //     try {
  //       const res = await axios.get("/api/jd"); // 🔁 Gọi API lấy JD từ server
  //       setJd(res.data.content);
  //     } catch (err) {
  //       console.error("Lỗi khi lấy JD:", err);
  //     }
  //   };
  //   fetchJD();
  // }, []);

  const handleSave = async () => {
    try {
      await axios.put("/api/jd", { content: jd }); // 🔁 Gửi JD mới lên server
      setIsEditing(false);
    } catch (err) {
      console.error("Lỗi khi lưu JD:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">📄 JD Tuyển dụng</h3>
      {isEditing ? (
        <>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
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
          <p className="whitespace-pre-line text-sm text-gray-700 mb-2">{jd}</p>
          <button onClick={() => setIsEditing(true)} className="text-blue-600 underline">
            Chỉnh sửa
          </button>
        </>
      )}
    </div>
  );
}
