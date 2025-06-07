"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  const linkStyle = (href) =>
    `px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium min-h-[44px] flex items-center transition-all duration-200 ${
      pathname === href
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-md backdrop-blur-sm"
    }`;

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-3 sm:p-4">
        <div className="font-display text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          DomGPT
        </div>
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link href="/about" className={linkStyle("/about")}>
            About
          </Link>
          <Link href="/why" className={linkStyle("/why")}>
            Why
          </Link>
          <Link href="/terms" className={linkStyle("/terms")}>
            <span className="hidden sm:inline">Terms and Privacy</span>
            <span className="sm:hidden">Terms</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
