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

const ProductCard = () => {
  const [liked, setLiked] = useState(false);
  const [addToCart, setAddToCart] = useState(false);

  return (
    <div className="group border border-zinc-700 rounded-3xl w-full overflow-hidden">
      {/* image & cart icon */}

      <div className="relative">
        {/* cart icon */}

        <div
          className={`top-4 right-4 absolute p-1.5 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer ${liked ? "animate-[heartPop_300ms_ease]" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <IconHeartFilled className="size-6 text-[#F97A14]" />
          ) : (
            <IconHeart className="size-6 text-[#F97A14]" />
          )}
        </div>

        {/* image */}
        <img
          src="/images/tennis2.jpeg"
          className="w-full h-full object-center object-cover hover:cursor-pointer"
        />
      </div>
      {/* content */}
      <div className="bg-zinc-900 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="font-light text-base">Tennis Ball</div>

            {/* add to cart */}

            <div
              className={`p-1.5 border border-[#F97A14] rounded-lg hover:scale-105 transition-transform duration-600 group-hover:cursor-pointer ${addToCart ? "animate-[cartPop_300ms_ease]" : ""}`}
              onClick={() => setAddToCart(!addToCart)}
            >
              {addToCart ? (
                <IconShoppingCartCopy className="size-5 text-[#F97A14]" />
              ) : (
                <IconShoppingCartPlus className="size-5 text-[#F97A14]" />
              )}
            </div>
          </div>
          <p className="text-gray-400 text-xs line-clamp-1">
            Match ball for tennis games.
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          {/* category */}
          <div className="bg-zinc-800 px-1 border border-zinc-700 rounded-3xl text-zinc-400 text-xs">
            Sports
          </div>
          <div className="font-semibold text-sm text-right t">500 EGP</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
