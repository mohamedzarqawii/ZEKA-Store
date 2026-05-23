"use client";

import { ProductType } from "@/types/product";
import { CartItemType } from "@/context/CartContext";
import { IconTrash } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Counter from "@/components/Counter";
import Link from "next/link";

const ItemCart = ({ product }: { product: CartItemType }) => {
  const { cart, addToCart, removeFromCart, updateQuantity, updateSize } =
    useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="flex justify-between items-center gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl">
      {/* 1 */}

      <Link href={`/shop/${product.id}`} className="block">
        <div className="flex items-center gap-5">
          {/* image */}

          <img
            src={product.image}
            className="rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
          />

          {/* content */}

          <div className="flex flex-col gap-1">
            <div>{product.name}</div>

            <div className="flex gap-1">
              {/* color  */}
              <div>
                {product.color != null ? (
                  <div className="text-zinc-500 text-sm">
                    Color:
                    <span
                      style={{ color: product.colorCode ?? undefined }}
                      className="mx-1"
                    >
                      {product.color}
                    </span>
                    |
                  </div>
                ) : null}
              </div>

              {/* size  */}
              <div className="text-zinc-500 text-sm">
                Size: {cartItem?.size}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* 2 */}
      <div className="flex justify-between items-center gap-6">
        {/* Counter */}
        <Counter
          product={product}
          classname="flex items-center bg-zinc-700 px-1 py-1 rounded-md w-21"
          plusClass="flex justify-center items-center w-6 h-6 hover:cursor-pointer"
          minusClass="flex justify-center items-center w-6 h-6 "
          spanClass="mx-3"
          trashSize="size-4"
        />

        {/* price */}
        <div className="font-bold text-xl">${product.price.toFixed(2)}</div>
        {/* delete */}
        <button
          className="text-primary hover:text-secondary hover:cursor-pointer"
          onClick={() => removeFromCart(product.id)}
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
};

export default ItemCart;
