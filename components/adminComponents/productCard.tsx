"use client";
import Link from "next/link";
import { ProductType } from "@/types/product";
import { IconEdit } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

import { useEffect, useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <Link href={`/shop/${product.documentId}`}>
        <div className="group border border-zinc-700 rounded-3xl w-full h-96 overflow-hidden">
          {/* image & cart icon */}

          <div className="relative">
            {/* image */}
            <img
              src={`http://localhost:1337${product.images[0].url}`}
              alt={product.name}
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

                <button className="p-1.5 border border-primary rounded-lg hover:scale-105 transition-transform duration-600 group-hover:cursor-pointer">
                  <IconEdit className="size-4 text-primary" />
                </button>
              </div>

              <p className="text-gray-400 text-xs line-clamp-1">
                {product.brand.name}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              {/* category */}
              <div className="bg-zinc-800 px-1 border border-zinc-700 rounded-3xl text-[10px] text-zinc-400">
                {product.category.name}
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
