"use client";

import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useParams } from "next/navigation";
import { ProductType } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const ProductPage = () => {
  const { id } = useParams();
  const product: ProductType | undefined = products.find(
    (p) => p.id === Number(id),
  );

  const sizes = [8, 9, 10, 11, 12];
  const [selectedSize, setSelectedSize] = useState<number>(sizes[0]);
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  if (!product) return <div>Not found</div>;
  const isInCart = cart.some((item) => item.id === product.id);
  const isInFavorites = favorites.some((item) => item.id === product.id);

  return (
    <div className="mx-10 mt-15">
      <div className="flex gap-6 w-full">
        {/* left */}
        <div className="flex gap-8 w-full max-w-2xl">
          {/* 1 */}
          <div className="flex flex-col gap-4 h-130 overflow-y-auto shrink- no-scrollbar">
            <img
              src={product.image}
              className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />
            <img
              src={product.image}
              className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />

            <img
              src={product.image}
              className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />
            <img
              src={product.image}
              className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />
            <img
              src={product.image}
              className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />
            <img
              src={product.image}
              className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />
          </div>

          {/* 2 */}
          <div>
            <img
              src={product.image}
              className="border border-primary rounded-2xl w-130 h-130 object-center object-cover hover:cursor-pointer"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between gap-3 w-full">
          <div>
            {/* category */}
            <div className="text-primary"> {product.category}</div>

            {/* title */}
            <div className="mt-6 text-5xl">{product.name}</div>

            {/* price */}
            <div className="mt-5 text-primary text-3xl">
              ${product.price.toFixed(2)}
            </div>

            {/* description */}
            <div className="mt-10 text-zinc-400 text-sm">
              {product.description}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <div>CHOOSE SIZE (US)</div>
              <div className="flex items-center gap-2 w-full">
                {sizes.map((size, i) => (
                  <div
                    key={i}
                    className={`size-option ${size === selectedSize ? "bg-primary" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 mt-5">
            {/* size */}

            {/* add to bag */}
            <div className="flex items-center gap-3 w-full">
              {/* add to cart button  */}
              <button
                className="bg-primary hover:bg-secondary px-4 py-6 rounded-2xl w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  if (isInCart) {
                    removeFromCart(product.id);
                  } else {
                    addToCart(product, 1);
                  }
                }}
              >
                {isInCart ? "IN YOUR CART" : "ADD TO CART"}
              </button>

              {/* add to favorites button  */}
              <div
                className="px-6 py-6 border border-primary hover:border-secondary rounded-2xl w-fit transition-transform duration-300 cursor-pointer"
                onClick={() => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
