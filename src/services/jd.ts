const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchJDList() {
  const res = await fetch(`${BASE_URL}/v2/jd`);
  if (!res.ok) throw new Error("Không thể lấy danh sách JD");
  return await res.json();
}

export async function fetchJDById(jdId: string) {
  const res = await fetch(`${BASE_URL}/v2/jd/${jdId}`);
  if (!res.ok) throw new Error("Không thể lấy chi tiết JD");
  return await res.json();
}

export async function updateJD(jdId: string, content: string) {
  const res = await fetch(`${BASE_URL}/v2/jd/${jdId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Không thể cập nhật JD");
  return await res.json();
}
