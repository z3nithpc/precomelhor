import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug, icon } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "name e slug são obrigatórios" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: { name, slug, icon },
  });

  return NextResponse.json(category, { status: 201 });
}
