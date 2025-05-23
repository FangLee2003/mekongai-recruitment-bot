export interface CV {
    cv_id: string;
    url: string;
    jd_id: string;
    result: string;
    score: number;
    evaluate: string;
    content: string;
    status: number; // trạng thái vòng 1,2,3 theo yêu cầu
}

// Bạn có thể khai báo thêm các interface khác ở đây, ví dụ:
export interface JD {
    jd_id: string;
    title: string;
    content: string;
    requirements: string[];
}

// Ví dụ interface Candidate dùng trong danh sách ứng viên
export interface Candidate {
    cv_id: number;
    result: string;
    score: number;
    evaluate: string;
    url: string;
    status: number;
}

export interface Radar {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverBackgroundColor?: string;
    pointHoverBorderColor?: string;
  }>;
}
