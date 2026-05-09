import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Busque e compare preços de produtos em dezenas de lojas.",
};

const MOCK_STORE = { id: "s1", name: "Loja A", url: "#", rating: 4.5 };

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1", name: "Notebook Gamer ASUS ROG Strix G16", slug: "notebook-asus-rog-strix-g16",
    description: "", image: "https://via.placeholder.com/400x400?text=Notebook",
    category: { id: "1", name: "Eletrônicos", slug: "eletronicos", productCount: 12400 },
    brand: "ASUS", rating: 4.7, reviewCount: 312, lowestPrice: 8999, highestPrice: 10500,
    prices: [{ store: MOCK_STORE, price: 8999, originalPrice: 10500, inStock: true, updatedAt: "Hoje", url: "#" }],
  },
  {
    id: "2", name: "iPhone 15 Pro 256GB Titânio Natural", slug: "iphone-15-pro",
    description: "", image: "https://via.placeholder.com/400x400?text=iPhone",
    category: { id: "2", name: "Smartphones", slug: "smartphones", productCount: 3800 },
    brand: "Apple", rating: 4.9, reviewCount: 1204, lowestPrice: 7499, highestPrice: 8200,
    prices: [{ store: MOCK_STORE, price: 7499, inStock: true, updatedAt: "Hoje", url: "#" }],
  },
  {
    id: "3", name: "Smart TV Samsung 65\" QLED 4K Q80C", slug: "tv-samsung-q80c",
    description: "", image: "https://via.placeholder.com/400x400?text=TV",
    category: { id: "1", name: "Eletrônicos", slug: "eletronicos", productCount: 12400 },
    brand: "Samsung", rating: 4.6, reviewCount: 876, lowestPrice: 3799, highestPrice: 4500,
    prices: [{ store: MOCK_STORE, price: 3799, originalPrice: 4500, inStock: true, updatedAt: "Ontem", url: "#" }],
  },
  {
    id: "4", name: "PlayStation 5 Slim Sony", slug: "ps5-slim",
    description: "", image: "https://via.placeholder.com/400x400?text=PS5",
    category: { id: "4", name: "Games", slug: "games", productCount: 4100 },
    brand: "Sony", rating: 4.8, reviewCount: 2341, lowestPrice: 3699, highestPrice: 3999,
    prices: [{ store: MOCK_STORE, price: 3699, inStock: false, updatedAt: "2 dias", url: "#" }],
  },
  {
    id: "5", name: "AirFryer Philips Walita Série 3000 4.1L", slug: "airfryer-philips-walita",
    description: "", image: "https://via.placeholder.com/400x400?text=AirFryer",
    category: { id: "3", name: "Eletrodomésticos", slug: "eletrodomesticos", productCount: 6200 },
    brand: "Philips", rating: 4.5, reviewCount: 3200, lowestPrice: 399, highestPrice: 499,
    prices: [{ store: MOCK_STORE, price: 399, originalPrice: 499, inStock: true, updatedAt: "Hoje", url: "#" }],
  },
  {
    id: "6", name: "Galaxy S24 Ultra 256GB Samsung", slug: "galaxy-s24-ultra",
    description: "", image: "https://via.placeholder.com/400x400?text=S24+Ultra",
    category: { id: "2", name: "Smartphones", slug: "smartphones", productCount: 3800 },
    brand: "Samsung", rating: 4.7, reviewCount: 890, lowestPrice: 6299, highestPrice: 7000,
    prices: [{ store: MOCK_STORE, price: 6299, inStock: true, updatedAt: "Hoje", url: "#" }],
  },
];

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevância" },
  { value: "price_asc", label: "Menor preço" },
  { value: "price_desc", label: "Maior preço" },
  { value: "rating", label: "Melhor avaliação" },
];

interface ProductsPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export default async function ProdutosPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";

  const filtered = query
    ? MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_PRODUCTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? `Resultados para "${query}"` : "Todos os produtos"}
        </h1>
        <p className="text-gray-500 mt-1">{filtered.length} produtos encontrados</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="card p-4 sticky top-20">
            <h2 className="font-semibold text-gray-800 mb-4">Filtros</h2>

            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Faixa de preço
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Disponibilidade
              </label>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" className="accent-primary-600" />
                <span className="text-sm text-gray-600">Em estoque</span>
              </label>
            </div>

            <button className="btn-primary w-full justify-center text-sm">
              Aplicar filtros
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Sort */}
          <div className="flex items-center justify-end mb-4 gap-2">
            <label className="text-sm text-gray-500">Ordenar por:</label>
            <select className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-500">
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="card p-10 text-center text-gray-400">
              <p className="text-lg font-medium">Nenhum produto encontrado</p>
              <p className="text-sm mt-1">Tente outro termo de busca</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
