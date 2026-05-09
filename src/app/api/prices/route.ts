import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId é obrigatório" }, { status: 400 });
  }

  const prices = await prisma.priceEntry.findMany({
    where: { productId },
    include: { store: true },
    orderBy: { price: "asc" },
  });

  return NextResponse.json(prices);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    productId,
    storeId,
    price,
    originalPrice,
    discount,
    inStock,
    installmentsCount,
    installmentsValue,
    url,
  } = body;

  if (!productId || !storeId || price == null || !url) {
    return NextResponse.json(
      { error: "productId, storeId, price e url são obrigatórios" },
      { status: 400 }
    );
  }

  const entry = await prisma.priceEntry.create({
    data: {
      productId,
      storeId,
      price,
      originalPrice,
      discount,
      inStock: inStock ?? true,
      installmentsCount,
      installmentsValue,
      url,
    },
    include: { store: true },
  });

  return NextResponse.json(entry, { status: 201 });
}
