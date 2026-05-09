import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const inStock = searchParams.get("inStock");
  const sort = searchParams.get("sort") ?? "relevance";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? "20"));

  const products = await prisma.product.findMany({
    where: {
      ...(q && {
        OR: [
          { name: { contains: q } },
          { brand: { contains: q } },
          { description: { contains: q } },
        ],
      }),
      ...(category && { category: { slug: category } }),
      ...(minPrice || maxPrice || inStock
        ? {
            prices: {
              some: {
                ...(minPrice && { price: { gte: Number(minPrice) } }),
                ...(maxPrice && { price: { lte: Number(maxPrice) } }),
                ...(inStock === "true" && { inStock: true }),
              },
            },
          }
        : {}),
    },
    include: {
      category: true,
      prices: {
        include: { store: true },
        orderBy: { price: "asc" },
      },
    },
    orderBy:
      sort === "price_asc"
        ? { prices: { _count: "asc" } }
        : sort === "rating"
        ? { rating: "desc" }
        : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({ data: products, page, limit });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug, description, image, brand, ean, categoryId, rating, reviewCount } = body;

  if (!name || !slug || !brand || !categoryId) {
    return NextResponse.json(
      { error: "name, slug, brand e categoryId são obrigatórios" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: { name, slug, description, image, brand, ean, categoryId, rating, reviewCount },
    include: { category: true },
  });

  return NextResponse.json(product, { status: 201 });
}
