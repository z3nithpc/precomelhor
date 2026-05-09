import type { Metadata } from "next";
import CategoryCard from "@/components/CategoryCard";
import type { Category } from "@/types";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Explore todas as categorias e encontre o melhor preço para cada produto.",
};

const ALL_CATEGORIES: Category[] = [
  { id: "1", name: "Eletrônicos", slug: "eletronicos", icon: "💻", productCount: 12400 },
  { id: "2", name: "Smartphones", slug: "smartphones", icon: "📱", productCount: 3800 },
  { id: "3", name: "Eletrodomésticos", slug: "eletrodomesticos", icon: "🏠", productCount: 6200 },
  { id: "4", name: "Games", slug: "games", icon: "🎮", productCount: 4100 },
  { id: "5", name: "Moda", slug: "moda", icon: "👗", productCount: 28000 },
  { id: "6", name: "Livros", slug: "livros", icon: "📚", productCount: 15000 },
  { id: "7", name: "Esportes", slug: "esportes", icon: "⚽", productCount: 9500 },
  { id: "8", name: "Beleza", slug: "beleza", icon: "💄", productCount: 7300 },
  { id: "9", name: "Automóveis", slug: "automoveis", icon: "🚗", productCount: 5100 },
  { id: "10", name: "Bebês", slug: "bebes", icon: "🍼", productCount: 4700 },
  { id: "11", name: "Ferramentas", slug: "ferramentas", icon: "🔧", productCount: 3200 },
  { id: "12", name: "Alimentos", slug: "alimentos", icon: "🛒", productCount: 8900 },
];

export default function CategoriasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
        <p className="text-gray-500 mt-1">
          Selecione uma categoria para comparar preços
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ALL_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
