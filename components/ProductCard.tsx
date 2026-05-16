"use client";

import Link from "next/link";
import { ProductType } from "@/types/product";
import {
  IconHeartFilled,
  IconHeart,
  IconShoppingCartCopy,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [liked, setLiked] = useState(false);
  const [addToCart, setAddToCart] = useState(false);

  return (
    <div>
      <Link href={`/shop/${product.id}`}>
        <div className="group border border-zinc-700 rounded-3xl w-full overflow-hidden">
          {/* image & cart icon */}

          <div className="relative">
            {/* cart icon */}

            <button
              className={`top-4 right-4 absolute p-1.5 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer ${liked ? "animate-[heartPop_300ms_ease]" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setLiked(!liked);
              }}
            >
              {liked ? (
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
                <div className="font-light text-base">{product.name}</div>

                {/* add to cart */}

                <button
                  className={`p-1.5 border border-primary rounded-lg hover:scale-105 transition-transform duration-600 group-hover:cursor-pointer ${addToCart ? "animate-[cartPop_300ms_ease]" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setAddToCart(!addToCart);
                  }}
                >
                  {addToCart ? (
                    <IconShoppingCartCopy className="size-5 text-primary" />
                  ) : (
                    <IconShoppingCartPlus className="size-5 text-primary" />
                  )}
                </button>
              </div>
              <p className="text-gray-400 text-xs line-clamp-1">
                {product.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              {/* category */}
              <div className="bg-zinc-800 px-1 border border-zinc-700 rounded-3xl text-zinc-400 text-xs">
                {product.category}
              </div>
              <div className="font-semibold text-sm text-right t">
                {product.price} EGP
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
