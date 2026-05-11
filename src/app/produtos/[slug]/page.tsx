import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Store, ArrowLeft, ExternalLink, Package, Tag } from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/lib/mock-data";
import AddToListButton from "@/components/AddToListButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const bestEntry = product.prices.reduce((a, b) => (a.price < b.price ? a : b));
  const discount =
    bestEntry.originalPrice && bestEntry.originalPrice > bestEntry.price
      ? Math.round(((bestEntry.originalPrice - bestEntry.price) / bestEntry.originalPrice) * 100)
      : null;
  const saving =
    bestEntry.originalPrice && bestEntry.originalPrice > bestEntry.price
      ? bestEntry.originalPrice - bestEntry.price
      : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Início
        </Link>
        <span>/</span>
        <Link href="/produtos" className="hover:text-primary-600 transition-colors">Produtos</Link>
        <span>/</span>
        <Link
          href={`/categorias/${product.category.slug}`}
          className="hover:text-primary-600 transition-colors"
        >
          {product.category.icon} {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {discount && (
            <span className="absolute top-4 left-4 badge-discount text-sm px-3 py-1">-{discount}%</span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge-best-price">{product.brand}</span>
            <Link
              href={`/categorias/${product.category.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Tag className="w-3 h-3" />
              {product.category.icon} {product.category.name}
            </Link>
          </div>

          {/* Name */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">
                ({product.reviewCount?.toLocaleString("pt-BR")} avaliações)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="bg-primary-50 rounded-2xl p-4">
            <p className="text-xs text-gray-500 font-medium mb-1">Melhor preço encontrado</p>
            {bestEntry.originalPrice && (
              <p className="text-sm text-gray-400 line-through">{formatPrice(bestEntry.originalPrice)}</p>
            )}
            <p className="text-3xl font-extrabold text-primary-600">
              {formatPrice(bestEntry.price)}
            </p>
            {bestEntry.installments && (
              <p className="text-xs text-gray-500 mt-1">
                ou {bestEntry.installments.count}x de{" "}
                <span className="font-semibold text-gray-700">
                  {formatPrice(bestEntry.installments.value)}
                </span>{" "}
                sem juros
              </p>
            )}
            {saving && (
              <p className="text-xs text-primary-700 font-semibold mt-2">
                Você economiza {formatPrice(saving)} vs. maior preço
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              em {bestEntry.store.name} · atualizado {bestEntry.updatedAt}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <a
              href={bestEntry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Ver melhor oferta em {bestEntry.store.name}
            </a>
            <AddToListButton product={product} variant="full" />
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Descrição</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* EAN */}
          {product.ean && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Package className="w-3.5 h-3.5" />
              EAN: {product.ean}
            </div>
          )}
        </div>
      </div>

      {/* Price comparison */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Store className="w-5 h-5 text-primary-600" />
          Comparar preços ({product.prices.length} lojas)
        </h2>

        <div className="flex flex-col gap-3">
          {[...product.prices].sort((a, b) => a.price - b.price).map((entry, idx) => {
            const entryDiscount =
              entry.originalPrice && entry.originalPrice > entry.price
                ? Math.round(((entry.originalPrice - entry.price) / entry.originalPrice) * 100)
                : null;

            return (
              <div
                key={entry.store.id}
                className={`card p-4 flex items-center gap-4 ${idx === 0 ? "border-primary-200 ring-1 ring-primary-100" : ""}`}
              >
                {idx === 0 && (
                  <span className="absolute -mt-8 text-[10px] font-bold text-primary-600 uppercase tracking-wide hidden" />
                )}

                {/* Store info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-gray-800">{entry.store.name}</p>
                    {idx === 0 && (
                      <span className="badge-best-price">Menor preço</span>
                    )}
                    {!entry.inStock && (
                      <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">
                        Esgotado
                      </span>
                    )}
                  </div>
                  {entry.installments && (
                    <p className="text-xs text-gray-400">
                      {entry.installments.count}x de {formatPrice(entry.installments.value)} sem juros
                    </p>
                  )}
                  <p className="text-xs text-gray-400">Atualizado: {entry.updatedAt}</p>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  {entry.originalPrice && (
                    <p className="text-xs text-gray-400 line-through">{formatPrice(entry.originalPrice)}</p>
                  )}
                  <p className={`text-lg font-extrabold ${idx === 0 ? "text-primary-600" : "text-gray-800"}`}>
                    {formatPrice(entry.price)}
                  </p>
                  {entryDiscount && (
                    <span className="badge-discount">-{entryDiscount}%</span>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    entry.inStock
                      ? idx === 0
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                  }`}
                >
                  {entry.inStock ? "Ver oferta" : "Indisponível"}
                  {entry.inStock && <ExternalLink className="w-3.5 h-3.5" />}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
