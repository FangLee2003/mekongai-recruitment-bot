const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadCV(file: File, jd_id: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("jd_id", jd_id); // ✅ thêm jd_id

  const res = await fetch(`${BASE_URL}/v1/upload-cv`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Lỗi upload CV");

  const result = await res.json();
  return result.data;
}

export async function fetchCVList() {
  const res = await fetch(`${BASE_URL}/v2/cv`);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách CV");
  return await res.json(); // [{ cv_id, result, score, evaluate, url, ... }]
}

export async function evaluateCV(cvId: string) {
  const res = await fetch(`${BASE_URL}/v2/evaluate-cv`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cv_id: cvId }),
  });

  if (!res.ok) throw new Error("Lỗi đánh giá CV");
  return await res.json();
}
