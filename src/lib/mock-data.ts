import type { Category, Product } from "@/types";

const STORE_A = { id: "s1", name: "Amazon", url: "#", rating: 4.8 };
const STORE_B = { id: "s2", name: "Mercado Livre", url: "#", rating: 4.5 };
const STORE_C = { id: "s3", name: "Magazine Luiza", url: "#", rating: 4.3 };

export const CATEGORIES: Category[] = [
  { id: "1", name: "Eletrônicos", slug: "eletronicos", icon: "💻", productCount: 12400 },
  { id: "2", name: "Smartphones", slug: "smartphones", icon: "📱", productCount: 3800 },
  { id: "3", name: "Eletrodomésticos", slug: "eletrodomesticos", icon: "🏠", productCount: 6200 },
  { id: "4", name: "Games", slug: "games", icon: "🎮", productCount: 4100 },
  { id: "5", name: "Moda", slug: "moda", icon: "👗", productCount: 28000 },
  { id: "6", name: "Livros", slug: "livros", icon: "📚", productCount: 15000 },
  { id: "7", name: "Esportes", slug: "esportes", icon: "⚽", productCount: 9500 },
  { id: "8", name: "Beleza", slug: "beleza", icon: "💄", productCount: 7300 },
  { id: "9", name: "Casa", slug: "casa", icon: "🛋️", productCount: 5100 },
  { id: "10", name: "Ferramentas", slug: "ferramentas", icon: "🔧", productCount: 2900 },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Notebook Gamer ASUS ROG Strix G16 Intel Core i9",
    slug: "notebook-asus-rog-strix-g16",
    description:
      "Notebook gamer de alto desempenho com processador Intel Core i9 de 13ª geração, tela de 16\" QHD 240Hz, placa de vídeo NVIDIA RTX 4070, 16GB RAM DDR5 e SSD NVMe de 1TB. Ideal para jogos AAA e criação de conteúdo.",
    image: "https://via.placeholder.com/600x600?text=Notebook+ASUS",
    category: CATEGORIES[0],
    brand: "ASUS",
    ean: "0197105198292",
    rating: 4.7,
    reviewCount: 312,
    lowestPrice: 8999,
    highestPrice: 10500,
    prices: [
      { store: STORE_A, price: 8999, originalPrice: 10500, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 12, value: 833 } },
      { store: STORE_B, price: 9299, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 10, value: 929 } },
      { store: STORE_C, price: 9799, originalPrice: 10500, inStock: false, updatedAt: "Ontem", url: "#" },
    ],
  },
  {
    id: "2",
    name: "iPhone 15 Pro 256GB Titânio Natural Apple",
    slug: "iphone-15-pro-256gb",
    description:
      "iPhone 15 Pro com chip A17 Pro de 3nm, câmera de 48MP com zoom óptico 5x, corpo em titânio de grau aeroespacial, Dynamic Island, porta USB-C com velocidade USB 3 e Action Button.",
    image: "https://via.placeholder.com/600x600?text=iPhone+15+Pro",
    category: CATEGORIES[1],
    brand: "Apple",
    ean: "0194253218456",
    rating: 4.9,
    reviewCount: 1204,
    lowestPrice: 7499,
    highestPrice: 8200,
    prices: [
      { store: STORE_A, price: 7499, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 12, value: 624 } },
      { store: STORE_B, price: 7699, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 12, value: 641 } },
      { store: STORE_C, price: 8200, inStock: true, updatedAt: "2 dias", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Smart TV Samsung 65\" QLED 4K Q80C",
    slug: "tv-samsung-65-qled-q80c",
    description:
      "Smart TV Samsung de 65\" com painel QLED 4K, processador Neural Quantum 4K, suporte a HDR10+, 4 entradas HDMI 2.1, Wi-Fi 5, Bluetooth 5.2 e sistema Tizen com acesso a todos os apps de streaming.",
    image: "https://via.placeholder.com/600x600?text=TV+Samsung+65",
    category: CATEGORIES[0],
    brand: "Samsung",
    ean: "0887276700274",
    rating: 4.6,
    reviewCount: 876,
    lowestPrice: 3799,
    highestPrice: 4500,
    prices: [
      { store: STORE_A, price: 3799, originalPrice: 4500, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 12, value: 316 } },
      { store: STORE_B, price: 3999, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 10, value: 399 } },
      { store: STORE_C, price: 4299, originalPrice: 4500, inStock: true, updatedAt: "Ontem", url: "#" },
    ],
  },
  {
    id: "4",
    name: "PlayStation 5 Console Slim Sony",
    slug: "playstation-5-slim",
    description:
      "PlayStation 5 Slim com SSD ultra-rápido de 1TB, suporte a jogos 4K/120fps, ray tracing em tempo real, áudio 3D Tempest, controle DualSense com feedback háptico e gatilhos adaptáveis.",
    image: "https://via.placeholder.com/600x600?text=PlayStation+5",
    category: CATEGORIES[3],
    brand: "Sony",
    ean: "0711719572398",
    rating: 4.8,
    reviewCount: 2341,
    lowestPrice: 3699,
    highestPrice: 3999,
    prices: [
      { store: STORE_A, price: 3699, inStock: false, updatedAt: "2 dias", url: "#" },
      { store: STORE_B, price: 3799, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 12, value: 316 } },
      { store: STORE_C, price: 3999, inStock: true, updatedAt: "Hoje", url: "#", installments: { count: 10, value: 399 } },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category.slug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
