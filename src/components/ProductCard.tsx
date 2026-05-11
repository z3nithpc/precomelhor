import Link from "next/link";
import Image from "next/image";
import { Store } from "lucide-react";
import AddToListButton from "./AddToListButton";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductCard({ product }: ProductCardProps) {
  const bestEntry = product.prices.reduce((a, b) => (a.price < b.price ? a : b));
  const storeCount = product.prices.length;
  const discount =
    bestEntry.originalPrice && bestEntry.originalPrice > bestEntry.price
      ? Math.round(((bestEntry.originalPrice - bestEntry.price) / bestEntry.originalPrice) * 100)
      : null;
  const saving =
    bestEntry.originalPrice && bestEntry.originalPrice > bestEntry.price
      ? bestEntry.originalPrice - bestEntry.price
      : null;

  return (
    // relative so the bookmark button can be positioned above the Link
    <div className="card group relative hover:shadow-md hover:border-primary-100 transition-all duration-200 flex flex-col">

      {/* Bookmark button — sits above the card link (z-10 > link z-0) */}
      <div className="absolute top-2 right-2 z-10">
        <AddToListButton product={product} variant="icon" />
      </div>

      {/* Single Link covers the whole card */}
      <Link href={`/produtos/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {discount && (
            <span className="absolute top-2 left-2 badge-discount">-{discount}%</span>
          )}
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto pt-2 flex flex-col gap-1">
            {bestEntry.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(bestEntry.originalPrice)}
              </p>
            )}
            <p className="text-base font-extrabold text-primary-600">
              {formatPrice(bestEntry.price)}
            </p>
            {saving && (
              <span className="badge-economy w-fit">
                economize {formatPrice(saving)}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
              <Store className="w-3 h-3" />
              {storeCount} {storeCount === 1 ? "loja" : "lojas"}
            </div>
          </div>

          <div className="mt-2 w-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold py-2 rounded-xl text-center transition-colors">
            VER OFERTAS
          </div>
        </div>
      </Link>
    </div>
  );
}
