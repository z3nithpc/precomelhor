"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types";

const STORAGE_KEY = "precomelhor_lista";

export function useShoppingList() {
  const [list, setList] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setList(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const save = useCallback((newList: Product[]) => {
    setList(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch {
      // ignore storage errors
    }
  }, []);

  const add = useCallback(
    (product: Product) => {
      setList((prev) => {
        if (prev.find((p) => p.id === product.id)) return prev;
        const next = [...prev, product];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const remove = useCallback(
    (productId: string) => {
      setList((prev) => {
        const next = prev.filter((p) => p.id !== productId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const has = useCallback(
    (productId: string) => list.some((p) => p.id === productId),
    [list]
  );

  const toggle = useCallback(
    (product: Product) => {
      setList((prev) => {
        const exists = prev.find((p) => p.id === product.id);
        const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  return { list, add, remove, has, toggle, mounted, count: list.length };
}
