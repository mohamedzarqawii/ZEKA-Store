"use client";

import ItemCart from "@/components/CartItemCard";
import FavoriteCard from "@/components/FavoriteCard";
import ProductCard from "@/components/ProductCard";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { getFavorites } from "@/services/shop.service";
import { FavoriteItem } from "@/types/shop/favorite";
import { Link } from "lucide-react";

import React, { useEffect, useState } from "react";

export default function favorites() {
  const { favoritesData, refreshFavorites } = useFavorites();

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return (
    <div>
      <div className="text-primary text-3xl">FAVORITES</div>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {favoritesData.map((favorite, i) => (
          <ProductCard key={favorite.id} product={favorite.product} />
        ))}
      </div>
    </div>
  );
}
