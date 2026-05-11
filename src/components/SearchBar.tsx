"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ initialValue = "" }: { initialValue?: string }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/produtos?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produto, marca ou categoria..."
        className="w-full pl-5 pr-14 py-3.5 text-sm border-2 border-gray-200 rounded-2xl bg-white
          focus:outline-none focus:border-primary-500
          placeholder:text-gray-400 transition-all shadow-sm"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white bg-primary-600
          hover:bg-primary-700 rounded-xl transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
