"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, Search, BarChart2 } from "lucide-react";
import { useShoppingList } from "@/lib/use-shopping-list";

const bottomNav = [
  { href: "/", label: "Início", icon: Home },
  { href: "/lista", label: "Lista", icon: Bookmark },
  { href: "/produtos", label: "Buscar", icon: Search },
  { href: "/comparar", label: "Comparar", icon: BarChart2 },
];

export default function Footer() {
  const pathname = usePathname();
  const { count, mounted } = useShoppingList();

  return (
    <>
      {/* Desktop footer */}
      <footer className="hidden md:block bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} PrecoMelhor. Todos os direitos reservados.
            </p>
            <nav className="flex items-center gap-5">
              <Link href="/lista" className="text-sm text-gray-400 hover:text-primary-600 transition-colors font-medium">
                Minha Lista
              </Link>
              <Link href="/sobre" className="text-sm text-gray-400 hover:text-primary-600 transition-colors">Sobre</Link>
              <Link href="/privacidade" className="text-sm text-gray-400 hover:text-primary-600 transition-colors">Privacidade</Link>
              <Link href="/termos" className="text-sm text-gray-400 hover:text-primary-600 transition-colors">Termos</Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 h-16">
          {bottomNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            const isLista = href === "/lista";
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors relative ${
                  active ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${active ? "stroke-[2.5px]" : ""}`} />
                  {isLista && mounted && count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-primary-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </div>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile nav */}
      <div className="md:hidden h-16" />
    </>
  );
}
