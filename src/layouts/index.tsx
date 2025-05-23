// import React from "react";
import type { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <NavBar />
      <main className="flex-grow">{children}</main>
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
}
