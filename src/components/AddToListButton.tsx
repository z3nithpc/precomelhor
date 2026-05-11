"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useShoppingList } from "@/lib/use-shopping-list";
import type { Product } from "@/types";

interface Props {
  product: Product;
  variant?: "icon" | "full";
}

export default function AddToListButton({ product, variant = "icon" }: Props) {
  const { has, toggle, mounted } = useShoppingList();

  if (!mounted) return null;

  const inList = has(product.id);

  if (variant === "full") {
    return (
      <button
        onClick={() => toggle(product)}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
          inList
            ? "bg-primary-100 text-primary-700 hover:bg-primary-200"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {inList ? (
          <>
            <BookmarkCheck className="w-4 h-4" />
            Na lista
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4" />
            Adicionar à lista
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-label={inList ? "Remover da lista" : "Adicionar à lista"}
      className={`p-1.5 rounded-lg transition-all ${
        inList
          ? "text-primary-600 bg-primary-50"
          : "text-gray-400 bg-white/80 hover:text-primary-600 hover:bg-primary-50"
      }`}
    >
      {inList ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </button>
  );
}
