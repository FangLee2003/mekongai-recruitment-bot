const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Gửi câu trả lời phỏng vấn và nhận phản hồi từ AI (dạng stream)
 */
export async function sendInterviewAnswer(
  cvId: string,
  answer: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  const res = await fetch(`${BASE_URL}/v1/chatbot-recruitment-stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cv_id: cvId, query: answer }),
  });

  if (!res.body) throw new Error("Không nhận được phản hồi dạng stream từ AI");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onChunk(chunk);  // gọi callback khi có dữ liệu mới
  }
}


/**
 * Lấy lịch sử cuộc trò chuyện phỏng vấn
 */
export async function fetchInterviewHistory(cvId: string) {
  const res = await fetch(`${BASE_URL}/v1/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cv_id: cvId }),
  });
  if (!res.ok) throw new Error("Lỗi khi lấy lịch sử phỏng vấn");
  const json = await res.json();
  // Trả về mảng history thực tế
  return json.data?.[0] || [];
}


/**
 * Tạo bộ câu hỏi phỏng vấn từ CV
 */
export async function generateQuestionSet(cvId: string) {
  const res = await fetch(`${BASE_URL}/v1/generate-question-set`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cv_id: cvId }),
  });

  if (!res.ok) throw new Error("Không thể tạo bộ câu hỏi");
  return await res.json(); // { questions: [string, ...] }
}
