import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categorias/${category.slug}`}
      className="card group p-5 flex flex-col items-center gap-3 text-center hover:shadow-md hover:border-primary-200 transition-all duration-200"
    >
      {category.icon && (
        <span className="text-3xl" role="img" aria-label={category.name}>
          {category.icon}
        </span>
      )}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {category.productCount.toLocaleString("pt-BR")} produtos
        </p>
      </div>
    </Link>
  );
}
