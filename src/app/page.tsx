import Link from "next/link";
import { ArrowRight, ShieldCheck, Bell, BarChart2, Zap } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/types";

const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Eletrônicos", slug: "eletronicos", icon: "💻", productCount: 12400 },
  { id: "2", name: "Smartphones", slug: "smartphones", icon: "📱", productCount: 3800 },
  { id: "3", name: "Eletrodomésticos", slug: "eletrodomesticos", icon: "🏠", productCount: 6200 },
  { id: "4", name: "Games", slug: "games", icon: "🎮", productCount: 4100 },
  { id: "5", name: "Moda", slug: "moda", icon: "👗", productCount: 28000 },
  { id: "6", name: "Livros", slug: "livros", icon: "📚", productCount: 15000 },
  { id: "7", name: "Esportes", slug: "esportes", icon: "⚽", productCount: 9500 },
  { id: "8", name: "Beleza", slug: "beleza", icon: "💄", productCount: 7300 },
];

const MOCK_STORE = {
  id: "s1",
  name: "Loja A",
  url: "#",
  rating: 4.5,
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Notebook Gamer ASUS ROG Strix G16 Intel Core i9",
    slug: "notebook-asus-rog-strix-g16",
    description: "",
    image: "https://via.placeholder.com/400x400?text=Notebook",
    category: MOCK_CATEGORIES[0],
    brand: "ASUS",
    rating: 4.7,
    reviewCount: 312,
    lowestPrice: 8999,
    highestPrice: 10500,
    prices: [
      { store: MOCK_STORE, price: 8999, originalPrice: 10500, inStock: true, updatedAt: "Hoje", url: "#" },
    ],
  },
  {
    id: "2",
    name: "iPhone 15 Pro 256GB Titânio Natural Apple",
    slug: "iphone-15-pro-256gb",
    description: "",
    image: "https://via.placeholder.com/400x400?text=iPhone",
    category: MOCK_CATEGORIES[1],
    brand: "Apple",
    rating: 4.9,
    reviewCount: 1204,
    lowestPrice: 7499,
    highestPrice: 8200,
    prices: [
      { store: MOCK_STORE, price: 7499, inStock: true, updatedAt: "Hoje", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Smart TV Samsung 65\" QLED 4K Q80C",
    slug: "tv-samsung-65-qled-q80c",
    description: "",
    image: "https://via.placeholder.com/400x400?text=TV",
    category: MOCK_CATEGORIES[0],
    brand: "Samsung",
    rating: 4.6,
    reviewCount: 876,
    lowestPrice: 3799,
    highestPrice: 4500,
    prices: [
      { store: MOCK_STORE, price: 3799, originalPrice: 4500, inStock: true, updatedAt: "Ontem", url: "#" },
    ],
  },
  {
    id: "4",
    name: "PlayStation 5 Console Slim Sony",
    slug: "playstation-5-slim",
    description: "",
    image: "https://via.placeholder.com/400x400?text=PS5",
    category: MOCK_CATEGORIES[3],
    brand: "Sony",
    rating: 4.8,
    reviewCount: 2341,
    lowestPrice: 3699,
    highestPrice: 3999,
    prices: [
      { store: MOCK_STORE, price: 3699, inStock: false, updatedAt: "2 dias", url: "#" },
    ],
  },
];

const FEATURES = [
  {
    icon: <BarChart2 className="w-6 h-6 text-primary-600" />,
    title: "Compare em tempo real",
    description: "Veja os preços atualizados de dezenas de lojas em uma única página.",
  },
  {
    icon: <Bell className="w-6 h-6 text-primary-600" />,
    title: "Alertas de baixa de preço",
    description: "Receba uma notificação assim que o produto atingir o preço que você quer.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary-600" />,
    title: "Lojas verificadas",
    description: "Só listamos lojas confiáveis com avaliação e histórico comprovados.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary-600" />,
    title: "Histórico de preços",
    description: "Veja a variação do preço ao longo do tempo e compre no momento certo.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-balance">
            Compare preços e sempre pague menos
          </h1>
          <p className="text-primary-200 text-lg mb-8">
            Mais de 500 mil produtos em dezenas de lojas. Grátis e sem cadastro.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
          <p className="text-xs text-primary-300 mt-3">
            Buscas populares: iPhone 15, PS5, Notebook, AirFryer, Smart TV
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Categorias</h2>
          <Link href="/categorias" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {MOCK_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Produtos em destaque</h2>
          <Link href="/produtos" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            Por que usar o PrecoMelhor?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-start gap-3">
                <div className="p-3 bg-primary-50 rounded-xl">{f.icon}</div>
                <h3 className="font-semibold text-gray-800">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
