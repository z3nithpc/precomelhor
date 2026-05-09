import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categorias
  const eletronicos = await prisma.category.upsert({
    where: { slug: "eletronicos" },
    update: {},
    create: { name: "Eletrônicos", slug: "eletronicos", icon: "💻" },
  });
  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: { name: "Smartphones", slug: "smartphones", icon: "📱" },
  });
  const games = await prisma.category.upsert({
    where: { slug: "games" },
    update: {},
    create: { name: "Games", slug: "games", icon: "🎮" },
  });

  // Lojas
  const amazon = await prisma.store.upsert({
    where: { id: "store-amazon" },
    update: {},
    create: { id: "store-amazon", name: "Amazon", url: "https://amazon.com.br", rating: 4.8 },
  });
  const mercadoLivre = await prisma.store.upsert({
    where: { id: "store-ml" },
    update: {},
    create: { id: "store-ml", name: "Mercado Livre", url: "https://mercadolivre.com.br", rating: 4.5 },
  });
  const kabum = await prisma.store.upsert({
    where: { id: "store-kabum" },
    update: {},
    create: { id: "store-kabum", name: "Kabum", url: "https://kabum.com.br", rating: 4.7 },
  });

  // Produtos
  const notebook = await prisma.product.upsert({
    where: { slug: "notebook-asus-rog-strix-g16" },
    update: {},
    create: {
      name: "Notebook Gamer ASUS ROG Strix G16 Intel Core i9",
      slug: "notebook-asus-rog-strix-g16",
      description: "Notebook gamer de alta performance com processador Intel Core i9.",
      brand: "ASUS",
      categoryId: eletronicos.id,
      rating: 4.7,
      reviewCount: 312,
    },
  });

  const iphone = await prisma.product.upsert({
    where: { slug: "iphone-15-pro-256gb" },
    update: {},
    create: {
      name: "iPhone 15 Pro 256GB Titânio Natural",
      slug: "iphone-15-pro-256gb",
      description: "O iPhone mais avançado da Apple com chip A17 Pro.",
      brand: "Apple",
      categoryId: smartphones.id,
      rating: 4.9,
      reviewCount: 1204,
    },
  });

  const ps5 = await prisma.product.upsert({
    where: { slug: "playstation-5-slim" },
    update: {},
    create: {
      name: "PlayStation 5 Slim Sony",
      slug: "playstation-5-slim",
      description: "Console de nova geração da Sony com SSD ultrarrápido.",
      brand: "Sony",
      categoryId: games.id,
      rating: 4.8,
      reviewCount: 2341,
    },
  });

  // Preços
  const prices = [
    { productId: notebook.id, storeId: amazon.id, price: 8999, originalPrice: 10500, inStock: true, installmentsCount: 12, installmentsValue: 749.92, url: "https://amazon.com.br" },
    { productId: notebook.id, storeId: mercadoLivre.id, price: 9199, originalPrice: 10500, inStock: true, installmentsCount: 10, installmentsValue: 919.9, url: "https://mercadolivre.com.br" },
    { productId: notebook.id, storeId: kabum.id, price: 9449, inStock: true, installmentsCount: 12, installmentsValue: 787.42, url: "https://kabum.com.br" },
    { productId: iphone.id, storeId: amazon.id, price: 7499, inStock: true, installmentsCount: 12, installmentsValue: 624.92, url: "https://amazon.com.br" },
    { productId: iphone.id, storeId: mercadoLivre.id, price: 7699, inStock: true, url: "https://mercadolivre.com.br" },
    { productId: ps5.id, storeId: amazon.id, price: 3699, inStock: false, url: "https://amazon.com.br" },
    { productId: ps5.id, storeId: kabum.id, price: 3799, inStock: true, installmentsCount: 10, installmentsValue: 379.9, url: "https://kabum.com.br" },
  ];

  for (const p of prices) {
    await prisma.priceEntry.create({ data: p });
  }

  console.log("Seed concluído com sucesso.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
