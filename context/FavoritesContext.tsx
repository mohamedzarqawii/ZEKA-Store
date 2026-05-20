"use client";

import { createContext, useContext, useState } from "react";
import { ProductType } from "@/types/product";

type FavoritesContextType = {
  favorites: ProductType[];
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  function addToFavorites(product: ProductType) {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) return prev;

      return [...prev, product];
    });
  }

  function removeFromFavorites(id: number) {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be inside FavoritesProvider");
  }

  return context;
}
