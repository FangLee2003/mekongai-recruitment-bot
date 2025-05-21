import { useEffect, useState } from "react";
import { fetchJDList, fetchJDById } from "../../services/jd";

interface JD {
  jd_id: string;
  title: string;
  content: string;
  requirements: string[];
}

interface Props {
  onChange?: (jd_id: string) => void;
}

export default function JDViewer({ onChange }: Props) {
  const [jdList, setJDList] = useState<JD[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [jd, setJD] = useState<JD | null>(null);

  useEffect(() => {
    const load = async () => {
      const list = await fetchJDList();
      setJDList(list);
      if (list.length > 0) {
        setSelectedId(list[0].jd_id);
        onChange?.(list[0].jd_id);
      }
    };
    load();
  }, [onChange]);

  useEffect(() => {
    if (!selectedId) return;

    const loadDetail = async () => {
      const detail = await fetchJDById(selectedId);
      const lines = detail.content.split("\n").filter((line: string) => line.trim());
      setJD({
        ...detail,
        requirements: lines,
      });
    };

    loadDetail();
    onChange?.(selectedId);
  }, [selectedId, onChange]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold text-lg mb-2">📄 Thông tin JD tuyển dụng</h3>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="border mb-3 px-2 py-1 rounded"
      >
        {jdList.map((item) => (
          <option key={item.jd_id} value={item.jd_id}>
            {item.title}
          </option>
        ))}
      </select>

      {jd ? (
        <>
          <h2 className="text-xl font-bold mb-2">{jd.title}</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {jd.requirements.map((req, idx) => (
              <li key={idx} className="text-sm">{req}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-gray-500 italic">Đang tải nội dung JD...</p>
      )}
    </div>
  );
}
