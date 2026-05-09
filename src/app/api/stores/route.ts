import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const stores = await prisma.store.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(stores);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, url, logo, rating } = body;

  if (!name || !url) {
    return NextResponse.json(
      { error: "name e url são obrigatórios" },
      { status: 400 }
    );
  }

  const store = await prisma.store.create({
    data: { name, url, logo, rating: rating ?? 0 },
  });

  return NextResponse.json(store, { status: 201 });
}
