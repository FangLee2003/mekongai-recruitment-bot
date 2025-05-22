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

export async function fetchCV() {
  try {
    const url = `${BASE_URL}/v2/cv`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Lỗi khi lấy danh sách CV (status: ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error("fetchCVList error:", error);
    throw error;
  }
}

export async function fetchCVFiltered(cv_id?: string, jd_id?: string) {
  try {
    // Tạo đối tượng params linh hoạt
    const params = new URLSearchParams();

    if (cv_id !== undefined && cv_id !== null) {
      params.append("cv_id", cv_id);
    }

    if (jd_id !== undefined && jd_id !== null) {
      params.append("jd_id", jd_id);
    }

    const url = `${BASE_URL}/v2/cv/filter/?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Lỗi khi lấy danh sách CV (status: ${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
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
