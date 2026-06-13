"use client";

import ItemCart from "@/components/CartItemCard";
import WishCard from "@/components/WishlistCard";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import React from "react";

export default function wishlist() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div>
      <div className="text-primary text-3xl">WISHLIST</div>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {currentUser.wishlist.map((wishProduct, i) => (
          <WishCard key={i} wishlist={wishProduct.productId} />
        ))}
      </div>
    </div>
  );
}
