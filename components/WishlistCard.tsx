import { useFavorites } from "@/context/FavoritesContext";
import { WishlistProduct } from "@/types/wishlist";
import products from "@/data/products";

import React from "react";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";

type WishCardProps = {
  wishlist: number;
};

const WishProduct = ({ productId }: { productId: number }) => {
  const product = products.find((p) => p.id == productId);
  if (!product) return null;

  return (
    <div>
      <div>
        <ProductCard product={product} />
      </div>
    </div>
  );
};

const WishCard = ({ wishlist }: WishCardProps) => {
  return (
    <div>
      <div>
        <WishProduct productId={wishlist} />
      </div>
    </div>
  );
};

export default WishCard;
