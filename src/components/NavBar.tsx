import { useState } from "react";
import { Zap, Sparkles, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Tính Năng" },
  { href: "#how-it-works", label: "Cách Hoạt Động" },
  // { href: "/contact", label: "Liên Hệ" }, // Thêm nếu cần
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full mx-auto px-4 sm:px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
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
  );
}
