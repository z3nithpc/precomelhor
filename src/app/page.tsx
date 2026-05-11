import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";

const STATS = [
  { value: "500k+", label: "produtos" },
  { value: "50+", label: "lojas" },
  { value: "100%", label: "gratuito" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-4 pt-10 pb-8 border-b border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <TrendingDown className="w-3.5 h-3.5" />
            Economia inteligente
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-balance">
            Compre onde está mais barato,{" "}
            <span className="text-primary-600">sem perder tempo.</span>
          </h1>
          <p className="text-gray-500 text-base mb-7">
            Compare preços em dezenas de lojas e encontre sempre o melhor negócio.
          </p>
          <div className="max-w-lg mx-auto mb-7">
            <SearchBar />
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Categorias</h2>
            <Link href="/categorias" className="text-xs text-primary-600 hover:underline flex items-center gap-0.5 font-medium">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Em destaque</h2>
          <Link href="/produtos" className="text-sm text-primary-600 hover:underline flex items-center gap-1 font-medium">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto bg-primary-600 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ative alertas de preço</h3>
            <p className="text-primary-100 text-sm">Receba um aviso quando o produto baixar de preço.</p>
          </div>
          <Link href="/lista" className="shrink-0 inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm">
            Ver minha lista <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
