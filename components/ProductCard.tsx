"use client";
import Link from "next/link";
import { ProductType } from "@/types/product";
import {
  IconHeartFilled,
  IconHeart,
  IconShoppingCartFilled,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { CartItemType } from "@/context/CartContext";
import Counter from "./Counter";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [liked, setLiked] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isInCart = cart.some((item) => item.id === product.id);
  const isInFavorites = favorites.some((item) => item.id === product.id);
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div>
      <Link href={`/shop/${product.id}`}>
        <div className="group border border-zinc-700 rounded-3xl w-full overflow-hidden">
          {/* image & cart icon */}

          <div className="relative">
            {/* love icon */}

            <button
              className="top-4 right-4 absolute p-1.5 rounded-lg transition-transform duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (isInFavorites) {
                  removeFromFavorites(product.id);
                } else {
                  addToFavorites(product);
                }
              }}
            >
              {isInFavorites ? (
                <IconHeartFilled className="size-6 text-primary" />
              ) : (
                <IconHeart className="size-6 text-primary" />
              )}
            </button>

            {/* image */}
            <img
              src={product.image}
              className="w-full h-64 object-center object-cover hover:cursor-pointer"
            />
          </div>
          {/* content */}
          <div className="bg-zinc-900 p-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="font-light text-[15px]">{product.name}</div>

                {/* add to cart */}

                {/* <Counter
                  product={cartItem}
                  classname="flex justify-between items-center bg-primary px-4 py-6 rounded-2xl w-full font-extrabold text-lg text-center hover:cursor-pointer"
                  plusClass="flex justify-center items-center w-6 h-6 text-lg"
                  minusClass="flex justify-center items-center w-6 h-6 text-lg hover:cursor-pointer"
                  spanClass="mx-3 text-lg"
                  trashSize="size-5"
                /> */}

                {isInCart && cartItem ? (
                  <Counter
                    product={cartItem}
                    classname="flex items-center bg-zinc-700 px-2 py-1 rounded-md w-18"
                    plusClass="flex justify-center items-center w-full h-4 hover:cursor-pointer"
                    minusClass="flex justify-center items-center w-full h-4 "
                    spanClass="px-3"
                    trashSize="size-4"
                  />
                ) : (
                  <button
                    className={`p-1.5 border border-primary rounded-lg hover:scale-105 transition-transform duration-600 group-hover:cursor-pointer ${isInCart ? "animate-[cartPop_300ms_ease]" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isInCart) {
                        removeFromCart(product.id);
                      } else {
                        addToCart(product, 8, 1);
                      }
                    }}
                  >
                    {isInCart ? (
                      <IconShoppingCartFilled className="size-4 text-primary" />
                    ) : (
                      <IconShoppingCartPlus className="size-4 text-primary" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-xs line-clamp-1">
                {product.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              {/* category */}
              <div className="bg-zinc-800 px-1 border border-zinc-700 rounded-3xl text-[10px] text-zinc-400">
                {product.category}
              </div>
              <div className="font-semibold text-[14px] text-right">
                ${product.price}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
