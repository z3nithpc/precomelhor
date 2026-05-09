import { ExternalLink, CheckCircle, XCircle } from "lucide-react";
import type { PriceEntry } from "@/types";

interface ComparisonTableProps {
  prices: PriceEntry[];
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ComparisonTable({ prices }: ComparisonTableProps) {
  const sorted = [...prices].sort((a, b) => a.price - b.price);

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 font-semibold text-gray-600">Loja</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600">Preço</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Parcelas</th>
            <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Estoque</th>
            <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Atualizado</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, idx) => (
            <tr
              key={entry.store.id}
              className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                idx === 0 ? "bg-green-50" : ""
              }`}
            >
              {/* Store */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-medium text-gray-800">{entry.store.name}</p>
                    {idx === 0 && (
                      <span className="badge-best-price">Melhor preço</span>
                    )}
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="px-4 py-3 text-right">
                <p className={`font-bold ${idx === 0 ? "text-green-700 text-base" : "text-gray-800"}`}>
                  {formatPrice(entry.price)}
                </p>
                {entry.originalPrice && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatPrice(entry.originalPrice)}
                  </p>
                )}
              </td>

              {/* Installments */}
              <td className="px-4 py-3 text-right text-gray-500 hidden sm:table-cell">
                {entry.installments
                  ? `${entry.installments.count}x ${formatPrice(entry.installments.value)}`
                  : "—"}
              </td>

              {/* In stock */}
              <td className="px-4 py-3 text-center hidden md:table-cell">
                {entry.inStock ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                )}
              </td>

              {/* Updated at */}
              <td className="px-4 py-3 text-right text-xs text-gray-400 hidden sm:table-cell">
                {entry.updatedAt}
              </td>

              {/* CTA */}
              <td className="px-4 py-3 text-right">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  Comprar <ExternalLink className="w-3 h-3" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
