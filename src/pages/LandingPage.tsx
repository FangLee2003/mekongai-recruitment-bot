import React from "react";
import {
  UploadCloud,
  BrainCircuit,
  FileQuestion,
  Bot,
  ClipboardCheck,
  CalendarClock,
  // UserCheck,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Menu,
  X,
} from "lucide-react";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: UploadCloud,
      title: "Tải CV Thông Minh",
      description:
        "Ứng viên dễ dàng tải CV, khởi đầu quy trình tuyển dụng tự động.",
      image:
        "https://placehold.co/600x400/E2E8F0/4A5568?text=Upload+CV",
    },
    {
      icon: BrainCircuit,
      title: "AI Phân Tích & Sàng Lọc",
      description:
        "AI tự động so khớp CV với JD, đánh giá và phân loại ứng viên.",
      image:
        "https://placehold.co/600x400/E2E8F0/4A5568?text=AI+Phân+Tích",
    },
    {
      icon: FileQuestion,
      title: "Tạo Câu Hỏi Phỏng Vấn AI",
      description:
        "Hệ thống AI tạo bộ câu hỏi phỏng vấn cá nhân hóa dựa trên JD & CV.",
      image:
        "https://placehold.co/600x400/E2E8F0/4A5568?text=Câu+Hỏi+AI",
    },
    {
      icon: Bot,
      title: "Phỏng Vấn Sơ Bộ Với AI",
      description:
        "Ứng viên tương tác, trả lời phỏng vấn trực tiếp với trợ lý AI.",
      image:
        "https://placehold.co/600x400/E2E8F0/4A5568?text=AI+Chatbot",
    },
    {
      icon: ClipboardCheck,
      title: "Báo Cáo & Đánh Giá",
      description:
        "AI tổng hợp kết quả, đánh giá chi tiết và gửi báo cáo cho HR.",
      image:
        "https://placehold.co/600x400/E2E8F0/4A5568?text=Báo+Cáo",
    },
    {
      icon: CalendarClock,
      title: "HR Quyết Định & Lên Lịch",
      description:
        "HR xem xét CV, đánh giá AI, và đặt lịch phỏng vấn qua Google Calendar.",
      image:
        "https://placehold.co/600x400/E2E8F0/4A5568?text=Lên+Lịch+HR",
    },
  ];

  const navLinks = [
    { href: "#features", label: "Tính Năng" },
    { href: "#how-it-works", label: "Cách Hoạt Động" },
    // { href: "/contact", label: "Liên Hệ" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-sky-600" />
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-sky-600">AI</span> TUYỂN DỤNG
            </h1>
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-sky-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/demo"
              className="bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-sky-700 transition transform hover:scale-105 flex items-center gap-2 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Demo Sản Phẩm
            </a>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-sky-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-600 hover:text-sky-600 py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/demo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mt-2 bg-sky-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md hover:bg-sky-700 transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Demo Sản Phẩm
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Tuyển Dụng Thông Minh Hơn, Nhanh Hơn Với{" "}
            <span className="text-sky-600">Sức Mạnh AI</span>
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
              src="https://placehold.co/1200x600/E0E7FF/3B82F6?text=Minh+Họa+Quy+Trình+AI+Tuyển+Dụng"
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
                Khám phá các công cụ AI mạnh mẽ giúp tối ưu hóa mọi bước trong
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
                    title: "Bước 3: Tương Tác AI",
                    description:
                      "AI tiến hành phỏng vấn sơ bộ (nếu có) hoặc tạo câu hỏi chuyên sâu cho HR.",
                    align: "left",
                  },
                  {
                    icon: ClipboardCheck,
                    title: "Bước 4: Nhận Kết Quả",
                    description:
                      "HR nhận báo cáo chi tiết, danh sách ứng viên tiềm năng và hỗ trợ ra quyết định.",
                    align: "right",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className={`flex md:items-center mb-8 md:mb-0 ${
                      step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
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
      </main>

      {/* Footer */}
      <footer className="py-10 text-center bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} AI Tuyển Dụng. Phát triển bởi MekongAI.
            </p>
            <div className="flex space-x-4">
              <a href="/privacy" className="text-sm text-slate-500 hover:text-sky-600">Chính sách</a>
              <a href="/terms" className="text-sm text-slate-500 hover:text-sky-600">Điều khoản</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
