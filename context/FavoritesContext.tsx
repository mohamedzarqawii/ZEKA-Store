"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  addToFavorite,
  getFavorites,
  removeFromFavorite,
} from "@/services/shop.service";
import { FavoriteItem } from "@/types/shop/favorite";

type FavoritesContextType = {
  favoritesData: FavoriteItem[];
  refreshFavorites: () => void;
  handleAddFavorite: (productDocId: string) => void;
  handleRemoveFavorite: (favoriteDocId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [favoritesData, setFavoritesData] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    refreshFavorites();
  }, [currentUser]);

  const refreshFavorites = () => {
    if (!currentUser) {
      setFavoritesData([]);
      return;
    }

    getFavorites(currentUser.id).then((res) => {
      setFavoritesData(res);
    });
  };

  function handleAddFavorite(productDocId: string) {
    if (!currentUser) {
      toast.warning("Please login to add items to your favorites", {
        position: "bottom-right",
      });
      return;
    }

    addToFavorite(currentUser.id, productDocId).then(() => {
      refreshFavorites();
    });
  }

  async function handleRemoveFavorite(favoriteDocId: string) {
    if (!currentUser) {
      toast.warning("Please login to add items to your favorites", {
        position: "bottom-right",
      });
      return;
    }

    removeFromFavorite(favoriteDocId).then(() => {
      refreshFavorites();
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoritesData,
        handleRemoveFavorite,
        handleAddFavorite,
        refreshFavorites,
      }}
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
