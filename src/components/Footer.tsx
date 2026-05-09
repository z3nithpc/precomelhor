import Link from "next/link";
import { TrendingDown } from "lucide-react";

const links = {
  "Navegação": [
    { href: "/", label: "Início" },
    { href: "/categorias", label: "Categorias" },
    { href: "/produtos", label: "Produtos" },
    { href: "/comparar", label: "Comparar" },
  ],
  "Ajuda": [
    { href: "/sobre", label: "Sobre nós" },
    { href: "/faq", label: "Perguntas frequentes" },
    { href: "/contato", label: "Contato" },
  ],
  "Legal": [
    { href: "/privacidade", label: "Privacidade" },
    { href: "/termos", label: "Termos de uso" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-bold text-white">PrecoMelhor</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Compare preços de milhares de produtos e sempre encontre o melhor negócio.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PrecoMelhor. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
