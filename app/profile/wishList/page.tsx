"use client";

import ItemCart from "@/components/CartItemCard";
import { useFavorites } from "@/context/FavoritesContext";
import React from "react";

export default function test() {
  const { favorites } = useFavorites();

  return (
    <div>
      <div className="text-primary text-3xl">WISHLIST</div>
      <div>
        {/* {favorites.map((item) => (
          <ItemCart key={item.id} product={item} />
        ))} */}
      </div>
    </div>
  );
}
