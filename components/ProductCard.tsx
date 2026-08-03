"use client";
import Link from "next/link";
import { ProductType } from "@/types/product";
import {
  IconHeartFilled,
  IconHeart,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Counter from "./Counter";

import { useEffect, useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [isFavorite, setIsFavorite] = useState(() => product.isFavorite);
  const [isLoadingFav, setIsLoadingFav] = useState<boolean>();
  const { cart, addToCart, removeFromCart } = useCart();
  const { handleAddFavorite, handleRemoveFavorite } = useFavorites();
  const isInCart = cart.some((item) => item.id === product.id);
  const cartItem = cart.find((item) => item.id === product.id);

  useEffect(() => {
    console.log("isloadingFav", isLoadingFav);
  }, [isLoadingFav]);

  return (
    <div>
      <Link href={`/shop/${product.documentId}`}>
        <div className="group border border-zinc-700 rounded-3xl w-full h-96 overflow-hidden">
          {/* image & cart icon */}

          <div className="relative">
            {/* love icon */}
            <div className="flex flex-col">
              <button
                className="top-4 right-4 absolute p-1.5 rounded-lg transition-transform duration-300 cursor-pointer"
                onClick={(e) => {
                  setIsLoadingFav(true);
                  e.preventDefault();
                  if (isFavorite) {
                    handleRemoveFavorite(product.documentId).finally(() =>
                      setIsLoadingFav(false),
                    );
                  } else {
                    handleAddFavorite(product.documentId).finally(() =>
                      setIsLoadingFav(false),
                    );
                  }
                  setIsFavorite((prev) => !prev);
                }}
              >
                {isFavorite ? (
                  <IconHeartFilled className="size-6 text-primary" />
                ) : (
                  <IconHeart className="size-6 text-primary" />
                )}
              </button>

              {/* love icon */}
              {product.stock == 0 && (
                <div className="top-4 left-4 absolute bg-primary/80 p-1.5 border rounded-lg text-[10px] transition-transform duration-300 cursor-pointer">
                  <div>Out of Stock</div>
                </div>
              )}
            </div>
            {/* image */}
            <img
              src={
                product.images?.[0]?.url
                  ? `http://localhost:1337${product.images[0].url}`
                  : "/images/placeholder.jpeg" // 👈 حط مسار الصورة الافتراضية تبعك هون
              }
              alt={product.name || "Product Image"}
              className="w-full h-64 object-center object-cover hover:cursor-pointer"
            />
          </div>
          {/* content */}
          <div className="bg-zinc-900 p-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center h-7">
                <div className="font-light text-[15px] line-clamp-1">
                  {product.name}
                </div>

                {/* add to cart */}

                {isInCart && cartItem ? (
                  <>
                    <Counter
                      product={cartItem}
                      classname="flex items-center bg-zinc-700 h-7 rounded-md w-18"
                      plusClass="flex justify-center items-center pl-2 py-0.5 hover:cursor-pointer"
                      minusClass="flex justify-center items-center pr-2 py-0.5"
                      spanClass="mx-auto select-none"
                      trashSize="size-4 text-primary"
                    />
                  </>
                ) : (
                  <button
                    className="p-1.5 border border-primary rounded-lg hover:scale-105 transition-transform duration-600 group-hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInCart) {
                        removeFromCart(product.id);
                      } else {
                        addToCart(product, 1);
                      }
                    }}
                  >
                    <IconShoppingCartPlus className="size-4 text-primary" />
                  </button>
                )}
              </div>

              <p className="text-gray-400 text-xs line-clamp-1">
                {product.brand?.name ? product.brand.name : "No Brand"}{" "}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              {/* category */}
              <div className="bg-zinc-800 px-1 border border-zinc-700 rounded-3xl text-[10px] text-zinc-400">
                {product.category?.name ? product.category.name : "No Category"}
              </div>
              <div className="font-semibold text-[14px] text-right">
                ${product.price ? product.price.toFixed(2) : "0.00"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
