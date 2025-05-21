// src/mockData.ts
export const mockJD = {
  title: "Frontend Developer",
  requirements: [
    "Thành thạo React và TypeScript",
    "Kinh nghiệm với Tailwind CSS",
    "Hiểu biết về RESTful APIs",
  ],
};

export const mockCandidates = [
  {
    id: "cv_001",
    name: "Nguyễn Văn A",
    status: "Đang phân tích",
    score: null,
    evaluation: null,
  },
  {
    id: "cv_002",
    name: "Trần Thị B",
    status: "Đạt yêu cầu",
    score: 85,
    evaluation: "Ứng viên phù hợp với JD, có kinh nghiệm React và Tailwind CSS.",
  },
];

export const mockQuestionSet = [
  "Hãy mô tả cách bạn sử dụng React Hooks trong dự án trước đây.",
  "Làm thế nào bạn tối ưu hiệu suất ứng dụng React?",
  "Bạn đã từng sử dụng Tailwind CSS như thế nào trong dự án?",
];
