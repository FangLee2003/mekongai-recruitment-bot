import React from "react";
import {
  UploadCloud,
  BrainCircuit,
  FileQuestion,
  Bot,
  ClipboardCheck,
  // UserCheck,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";
import Layout from "../layouts";

const App: React.FC = () => {
  const features = [
    // {
    //   icon: UploadCloud,
    //   title: "Tải CV Thông Minh",
    //   description:
    //     "Ứng viên dễ dàng tải CV, khởi đầu quy trình tuyển dụng tự động.",
    //   image:
    //     "https://recruitment.mekongai.com/api/v1/tmp/upload cv.png",
    // },
    {
      icon: BrainCircuit,
      title: "AI Phân Tích & Sàng Lọc",
      description:
        "AI tự động so khớp CV với JD, đánh giá và phân loại ứng viên.",
      image:
        "https://recruitment.mekongai.com/api/v1/tmp/AI_phantichCV.png",
    },
    {
      icon: FileQuestion,
      title: "Tạo câu hỏi & Phỏng vấn",
      description:
        "Hệ thống AI tạo bộ câu hỏi phỏng vấn cá nhân hóa dựa trên JD & CV. Ứng viên tương tác, trả lời phỏng vấn trực tiếp với trợ lý AI.",
      image:
        "https://recruitment.mekongai.com/api/v1/tmp/chatbot_AI.png",
    },
    // {
    //   icon: Bot,
    //   title: "Phỏng Vấn Sơ Bộ Với AI",
    //   description:
    //     "Ứng viên tương tác, trả lời phỏng vấn trực tiếp với trợ lý AI.",
    //   image:
    //     "https://recruitment.mekongai.com/api/v1/tmp/chatbot_AI.png",
    // },
    {
      icon: ClipboardCheck,
      title: "Thống kê & Đánh Giá",
      description:
        "AI tổng hợp kết quả, đánh giá chi tiết và gửi báo cáo cho HR.",
      image:
        "https://recruitment.mekongai.com/api/v1/tmp/AI_report.png",
    },
    // {
    //   icon: CalendarClock,
    //   title: "HR Quyết Định & Lên Lịch",
    //   description:
    //     "HR xem xét CV, đánh giá AI, và đặt lịch phỏng vấn qua Google Calendar.",
    //   image:
    //     "https://recruitment.mekongai.com/api/v1/tmp/datlichpv.png",
    // },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Tuyển Dụng Thông Minh Hơn, Nhanh Hơn Với{" "}
          <span className="text-sky-600">MekRec AI</span>
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
          Nền tảng AI tự động hóa quy trình tuyển dụng, từ sàng lọc CV đến
          lên lịch phỏng vấn, giúp bạn tìm kiếm nhân tài hiệu quả.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="/demo"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg hover:bg-sky-700 transition transform hover:scale-105 text-base"
          >
            <Target className="h-5 w-5" />
            Trải Nghiệm Demo
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 border-2 border-sky-600 text-sky-600 font-semibold px-8 py-3.5 rounded-lg hover:bg-sky-600 hover:text-white transition text-base"
          >
            Tìm Hiểu Thêm
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>
        <div className="mt-16 md:mt-24">
          <img
            src="https://recruitment.mekongai.com/api/v1/tmp/main.png"
            alt="AI Recruitment Process Illustration"
            className="rounded-xl shadow-2xl mx-auto max-w-5xl w-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600/E0E7FF/3B82F6?text=Hình+Ảnh+Công+Nghệ';
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
              Tính Năng Vượt Trội
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Khám phá các công cụ AI mạnh mẽ giúp tự động hóa
              quy trình tuyển dụng của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group border border-slate-200 hover:border-sky-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-sky-100 text-sky-600 mr-4 group-hover:bg-sky-200 transition-colors">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800">
                    {feature.title}
                  </h4>
                </div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg mb-4 aspect-[16/10] object-cover border border-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x375/E2E8F0/4A5568?text=${encodeURIComponent(feature.title)}`;
                  }}
                />
                <p className="text-slate-600 text-sm mb-5 flex-grow">
                  {feature.description}
                </p>
                <a
                  href="/demo"
                  className="mt-auto inline-flex items-center justify-center gap-1.5 text-sm text-sky-600 font-semibold hover:text-sky-700 transition-colors group"
                >
                  Xem chi tiết
                  <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
              Cách Thức Hoạt Động Đơn Giản
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Chỉ với vài bước, bạn có thể tự động hóa và nâng cao hiệu quả
              tuyển dụng.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-sky-200 transform -translate-x-1/2"></div>

              {[
                {
                  icon: UploadCloud,
                  title: "Bước 1: Tải Lên & Thiết Lập",
                  description:
                    "Ứng viên tải CV hoặc HR đăng tin tuyển dụng và cấu hình yêu cầu công việc (JD).",
                  align: "left",
                },
                {
                  icon: BrainCircuit,
                  title: "Bước 2: AI Phân Tích",
                  description:
                    "Hệ thống AI tự động sàng lọc, so khớp CV với JD, và chấm điểm tiềm năng.",
                  align: "right",
                },
                {
                  icon: Bot,
                  title: "Bước 3: HR duyệt ứng viên và tạo bộ câu hỏi phỏng vấn",
                  description:
                    "AI tiến hành tạo bộ câu hỏi chuyên sâu cho HR.",
                  align: "left",
                },
                {
                  icon: Bot,
                  title: "Bước 4: Tương Tác AI",
                  description:
                    "Ứng viên tương tác với AI trong quá trình phỏng vấn.",
                  align: "right",
                },
                {
                  icon: ClipboardCheck,
                  title: "Bước 5: Nhận Kết Quả và Đặt Lịch Phỏng Vấn",
                  description:
                    "HR nhận báo cáo chi tiết, bao gồm thông tin câu trả lời để hỗ trợ ra quyết định. Đặt lịch phỏng vấn qua Google Calendar.",
                  align: "left",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex md:items-center mb-8 md:mb-0 ${step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className="flex-shrink-0 w-full md:w-1/2 p-4">
                    <div className={`bg-white p-6 rounded-xl shadow-lg border border-slate-200 ${step.align === 'left' ? 'md:mr-4 lg:mr-8' : 'md:ml-4 lg:ml-8'}`}>
                      <div className="flex items-center mb-3">
                        <div className="p-2.5 rounded-full bg-sky-100 text-sky-600 mr-3">
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-lg font-semibold text-slate-800">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-sky-600 text-white font-bold text-lg mx-auto relative z-10">
                    {index + 1}
                  </div>
                  <div className="flex-shrink-0 w-full md:w-1/2 p-4 md:block hidden"> {/* Placeholder for spacing */} </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12 md:mt-16">
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg hover:bg-sky-700 transition transform hover:scale-105 text-base"
            >
              <Sparkles className="h-5 w-5" />
              Xem Demo Quy Trình
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
