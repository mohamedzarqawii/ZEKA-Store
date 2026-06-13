"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";

export type CartItemType = ProductType & { quantity: number; size?: number };

type FavoritesContextType = {
  wishlist: ProductType[];
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const { addToUserFavorites, removeFromUserFavorites } = useAuth();

  useEffect(() => {
    if (!currentUser?.wishlist) {
      setFavorites([]);
      return;
    }

    const loadedFavorites = currentUser.wishlist
      .map((favoriteItem) => {
        return products.find((p) => p.id === favoriteItem.productId);
      })
      .filter(Boolean) as ProductType[];

    setFavorites(loadedFavorites);
  }, [currentUser]);

  const [favorites, setFavorites] = useState<ProductType[]>([]);
  function addToFavorites(product: ProductType) {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) return prev;

      return [...prev, product];
    });

    addToUserFavorites(product.id);
  }

  function removeFromFavorites(id: number) {
    setFavorites((prev) => prev.filter((item) => item.id !== id));

    removeFromUserFavorites(id);
  }

  return (
    <FavoritesContext.Provider
      value={{ wishlist: favorites, addToFavorites, removeFromFavorites }}
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
