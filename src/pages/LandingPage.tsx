import React from "react";
import {
  UploadCloud,
  BrainCircuit,
  FileQuestion,
  Bot,
  ClipboardCheck,
  CalendarClock,
  UserCheck,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: UploadCloud,
      title: "1. Tải CV Thông Minh",
      description:
        "Ứng viên dễ dàng tải CV lên hệ thống, khởi đầu quy trình tuyển dụng tự động hóa.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=Giao+diện+Upload+CV",
    },
    {
      icon: BrainCircuit,
      title: "2. AI Phân Tích & Sàng Lọc",
      description:
        "AI tự động so khớp CV với mô tả công việc (JD), đánh giá và phân loại ứng viên chính xác.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=AI+Đang+Phân+Tích+CV",
    },
    {
      icon: FileQuestion,
      title: "3. Tạo Câu Hỏi Phỏng Vấn AI",
      description:
        "Hệ thống AI tạo bộ câu hỏi phỏng vấn cá nhân hóa, dựa trên JD và thông tin từ CV.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=Câu+Hỏi+Do+AI+Tạo",
    },
    {
      icon: Bot,
      title: "4. Phỏng Vấn Sơ Bộ Với AI",
      description:
        "Ứng viên tương tác, trả lời các câu hỏi phỏng vấn trực tiếp với trợ lý AI thông minh.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=Chatbot+AI+Phỏng+Vấn",
    },
    {
      icon: ClipboardCheck,
      title: "5. Báo Cáo & Đánh Giá Toàn Diện",
      description:
        "AI tổng hợp kết quả, đưa ra đánh giá chi tiết và gửi báo cáo trực quan cho bộ phận HR.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=Báo+Cáo+Tuyển+Dụng",
    },
    {
      icon: CalendarClock,
      title: "6. HR Quyết Định & Lên Lịch",
      description:
        "HR dễ dàng xem xét CV, đánh giá của AI, và đặt lịch phỏng vấn vòng trong qua Google Calendar.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=Lịch+Phỏng+Vấn+HR",
    },
    {
      icon: UserCheck,
      title: "7. Hỗ Trợ Phỏng Vấn Chuyên Sâu",
      description:
        "AI cung cấp bộ câu hỏi gợi ý, hỗ trợ HR trong quá trình phỏng vấn trực tiếp với ứng viên.",
      image:
        "https://placehold.co/600x400/1E293B/93C5FD?text=AI+Hỗ+Trợ+HR",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2">
          <Zap className="h-10 w-10 text-sky-400" />
          <h1 className="text-3xl font-extrabold tracking-wide uppercase">
            <span className="text-sky-400">AI</span> TUYỂN DỤNG
          </h1>
        </div>
        <nav>
          <a
            href="/demo"
            className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-sky-600 transition transform hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Demo Sản Phẩm
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
            Cách Mạng Hóa Tuyển Dụng Với Sức Mạnh AI
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Tối ưu hóa quy trình, đánh giá CV chính xác, so khớp JD thông minh,
            tạo câu hỏi phỏng vấn và hỗ trợ HR & ứng viên hiệu quả.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:from-sky-600 hover:to-indigo-700 transition transform hover:scale-105"
            >
              <Target className="h-6 w-6" />
              Trải Nghiệm Demo Ngay
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-sky-500 text-sky-400 font-semibold px-8 py-4 rounded-lg hover:bg-sky-500 hover:text-white transition transform hover:scale-105"
            >
              Liên Hệ Tư Vấn
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=90" // More abstract AI/tech image
            alt="AI Recruitment Automation"
            className="rounded-xl shadow-2xl border-2 border-sky-700/50 transform hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/700x500/1A202C/90CDF4?text=Hình+Ảnh+Công+Nghệ+AI';
            }}
          />
        </div>
      </section>

      {/* Luồng chức năng chính */}
      <section className="bg-slate-800/50 py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-t-3xl shadow-2xl">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extrabold text-white mb-4">
              Khám Phá <span className="text-sky-400">Luồng Tuyển Dụng Thông Minh</span>
            </h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Trải nghiệm quy trình tuyển dụng tự động hóa từng bước, từ ứng tuyển đến báo cáo cuối cùng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-xl p-6 shadow-xl hover:shadow-sky-500/40 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
              >
                <div className="flex items-center mb-4">
                  <feature.icon className="h-10 w-10 text-sky-400 mr-4 group-hover:animate-pulse" />
                  <h4 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h4>
                </div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg mb-4 aspect-video object-cover border-2 border-slate-700 group-hover:border-sky-500 transition-colors duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1E293B/93C5FD?text=${encodeURIComponent(feature.title)}`;
                  }}
                />
                <p className="text-slate-400 mb-5 flex-grow text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a
              href="/demo"
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold px-12 py-5 rounded-lg hover:from-green-600 hover:to-teal-700 transition transform hover:scale-105 shadow-2xl inline-flex items-center gap-3 text-lg"
            >
              <Sparkles className="h-6 w-6" />
              Trải Nghiệm Toàn Bộ Quy Trình Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-10 text-center text-slate-500 text-sm select-none bg-slate-900">
        &copy; {new Date().getFullYear()} AI Tuyển Dụng Tự Động. Phát triển bởi MekongAI.
        <p className="text-xs mt-1">Đổi mới quy trình tuyển dụng cho doanh nghiệp Việt.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
