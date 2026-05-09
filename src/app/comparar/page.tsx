import type { Metadata } from "next";
import ComparisonTable from "@/components/ComparisonTable";
import type { PriceEntry } from "@/types";

export const metadata: Metadata = {
  title: "Comparar preços",
  description: "Compare preços de um produto em todas as lojas disponíveis.",
};

const MOCK_PRICES: PriceEntry[] = [
  {
    store: { id: "s1", name: "Amazon", url: "#", rating: 4.8 },
    price: 8999,
    originalPrice: 10500,
    discount: 14,
    inStock: true,
    installments: { count: 12, value: 749.92 },
    url: "#",
    updatedAt: "Hoje, 14h30",
  },
  {
    store: { id: "s2", name: "Mercado Livre", url: "#", rating: 4.5 },
    price: 9199,
    originalPrice: 10500,
    discount: 12,
    inStock: true,
    installments: { count: 10, value: 919.9 },
    url: "#",
    updatedAt: "Hoje, 11h00",
  },
  {
    store: { id: "s3", name: "Kabum", url: "#", rating: 4.7 },
    price: 9449,
    inStock: true,
    installments: { count: 12, value: 787.42 },
    url: "#",
    updatedAt: "Ontem, 18h00",
  },
  {
    store: { id: "s4", name: "Magazine Luiza", url: "#", rating: 4.3 },
    price: 9799,
    inStock: false,
    url: "#",
    updatedAt: "2 dias atrás",
  },
  {
    store: { id: "s5", name: "Americanas", url: "#", rating: 4.2 },
    price: 10100,
    inStock: true,
    installments: { count: 10, value: 1010 },
    url: "#",
    updatedAt: "Hoje, 09h15",
  },
];

export default function CompararPage() {
  const lowestPrice = Math.min(...MOCK_PRICES.map((p) => p.price));
  const highestPrice = Math.max(...MOCK_PRICES.map((p) => p.price));
  const savings = highestPrice - lowestPrice;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-sm text-primary-600 font-medium mb-1">Eletrônicos</p>
        <h1 className="text-2xl font-bold text-gray-900">
          Notebook Gamer ASUS ROG Strix G16 Intel Core i9
        </h1>
        <p className="text-gray-500 text-sm mt-1">ASUS • EAN: 4711387322048</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Menor preço</p>
          <p className="text-2xl font-bold text-green-600">
            {lowestPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Maior preço</p>
          <p className="text-2xl font-bold text-red-500">
            {highestPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Economia máxima</p>
          <p className="text-2xl font-bold text-primary-600">
            {savings.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Preços por loja</h2>
      <ComparisonTable prices={MOCK_PRICES} />

      <p className="text-xs text-gray-400 mt-3">
        * Preços atualizados automaticamente. Verifique o valor final na loja antes de comprar.
      </p>
    </div>
  );
}
