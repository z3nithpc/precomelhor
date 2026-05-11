import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categorias/${category.slug}`} className="category-pill shrink-0">
      {category.icon && (
        <span role="img" aria-label={category.name}>
          {category.icon}
        </span>
      )}
      <span>{category.name}</span>
    </Link>
  );
}
