export interface Store {
  id: string;
  name: string;
  logo?: string;
  url: string;
  rating: number;
}

export interface PriceEntry {
  store: Store;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock: boolean;
  installments?: {
    count: number;
    value: number;
  };
  url: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: Category;
  brand: string;
  ean?: string;
  prices: PriceEntry[];
  lowestPrice: number;
  highestPrice: number;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  productCount: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  store?: string;
  inStock?: boolean;
  sortBy?: "price_asc" | "price_desc" | "relevance" | "rating";
}
