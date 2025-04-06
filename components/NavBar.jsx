"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  const linkStyle = (href) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === href
        ? "bg-gray-900 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-3">
        <div className="text-lg font-bold tracking-tight text-gray-800">
          DomGPT
        </div>
        <div className="flex space-x-4">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link href="/about" className={linkStyle("/about")}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};
