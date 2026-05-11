"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, ExternalLink } from "lucide-react";
import { useShoppingList } from "@/lib/use-shopping-list";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ListaPage() {
  const { list, remove, mounted } = useShoppingList();

  const total = list.reduce((acc, p) => acc + p.lowestPrice, 0);

  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-5">
          <ShoppingBag className="w-9 h-9 text-primary-400" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Lista vazia</h1>
        <p className="text-gray-500 text-sm mb-7">
          Adicione produtos à lista clicando no{" "}
          <span className="font-semibold text-gray-700">ícone de marcador</span> nos cards.
        </p>
        <Link href="/" className="btn-primary text-sm">
          Explorar produtos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Minha Lista</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {list.length} {list.length === 1 ? "produto" : "produtos"}
          </p>
        </div>
        <Link href="/produtos" className="text-sm text-primary-600 hover:underline flex items-center gap-1 font-medium">
          + Adicionar <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Product list */}
      <div className="flex flex-col gap-3 mb-6">
        {list.map((product) => {
          const bestEntry = product.prices.reduce((a, b) => (a.price < b.price ? a : b));
          const discount =
            bestEntry.originalPrice && bestEntry.originalPrice > bestEntry.price
              ? Math.round(((bestEntry.originalPrice - bestEntry.price) / bestEntry.originalPrice) * 100)
              : null;

          return (
            <div key={product.id} className="card flex items-start gap-3 p-3">
              {/* Image */}
              <Link href={`/produtos/${product.slug}`} className="shrink-0">
                <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                  {product.brand} · {product.category.name}
                </p>
                <Link href={`/produtos/${product.slug}`}>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-extrabold text-primary-600">
                    {formatPrice(bestEntry.price)}
                  </span>
                  {discount && (
                    <span className="badge-discount">-{discount}%</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Melhor preço em {bestEntry.store.name}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => remove(product.id)}
                  aria-label="Remover da lista"
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <a
                  href={bestEntry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline"
                >
                  Ver oferta <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">Estimativa de economia</span>
          <span className="text-xs text-gray-400">somando melhores preços</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Total estimado</span>
          <span className="text-xl font-extrabold text-primary-600">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          * Valores sujeitos a alteração. Consulte cada loja para o preço final.
        </p>
      </div>
    </div>
  );
}
