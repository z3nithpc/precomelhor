"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingDown } from "lucide-react";

const navLinks = [
  { href: "/categorias", label: "Categorias" },
  { href: "/produtos", label: "Produtos" },
  { href: "/comparar", label: "Comparar" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <TrendingDown className="w-6 h-6 text-primary-600" />
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              PREÇO<span className="text-primary-600">MELHOR</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label="Menu"
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
