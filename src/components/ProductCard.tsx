import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductCard({ product }: ProductCardProps) {
  const bestEntry = product.prices.reduce((a, b) =>
    a.price < b.price ? a : b
  );
  const storeCount = product.prices.length;
  const discount =
    bestEntry.originalPrice && bestEntry.originalPrice > bestEntry.price
      ? Math.round(
          ((bestEntry.originalPrice - bestEntry.price) /
            bestEntry.originalPrice) *
            100
        )
      : null;

  return (
    <Link href={`/produtos/${product.slug}`} className="card group hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {discount && (
          <span className="absolute top-2 left-2 badge-discount">-{discount}%</span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="mt-auto">
          {bestEntry.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(bestEntry.originalPrice)}
            </p>
          )}
          <p className="text-lg font-bold text-primary-600">
            {formatPrice(bestEntry.price)}
          </p>
          <p className="text-xs text-gray-500">
            em {storeCount} {storeCount === 1 ? "loja" : "lojas"}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs font-medium text-primary-600 mt-1">
          Ver ofertas <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
