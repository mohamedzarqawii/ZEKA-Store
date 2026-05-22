"use client";
import {
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useParams } from "next/navigation";
import { ProductType } from "@/types/product";
import { CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import { Cart } from "@hugeicons/core-free-icons";
import Counter from "@/components/Counter";

const ProductPage = () => {
  const { id } = useParams();
  const product: ProductType | undefined = products.find(
    (p) => p.id === Number(id),
  );

  const sizes = [8, 9, 10, 11, 12];
  const [selectedSize, setSelectedSize] = useState<number>(sizes[0]);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  if (!product) return <div>Not found</div>;
  const isInCart = cart.some((item) => item.id === product.id);
  const isInFavorites = favorites.some((item) => item.id === product.id);
  const productCategory = products.find((p) => p.id === Number(id))?.category;
  const cartItem = cart.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity ?? 1);
  const [rating, setRating] = useState(0);

  return (
    <div className="mx-10 mt-15">
      <div className="flex gap-6 w-full h-fit">
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
        <div className="flex flex-col justify-between gap-4 w-full h-130">
          <div>
            {/* category */}
            <div className="text-primary"> {product.category}</div>

            {/* title */}
            <div className="mt-6 text-5xl">{product.name}</div>

            {/* Rates */}

            <div className="flex items-center gap-2 mt-5">
              <div className="text-sm">{rating}</div>

              {[1, 2, 3, 4, 5].map((star: number) => (
                <button key={star} onClick={() => setRating(star)}>
                  {star <= rating ? (
                    <IconStarFilled className="size-5 text-primary cursor-pointer" />
                  ) : (
                    <IconStar className="size-5 text-primary cursor-pointer" />
                  )}
                </button>
              ))}

              <div className="pl-2 border-zinc-400 border-l-2 text-zinc-400">
                1501 Ratings
              </div>
            </div>

            {/* price */}
            <div className="mt-6 text-primary text-3xl">
              ${product.price.toFixed(2)}
            </div>

            {/* description */}
            <div className="flex flex-col gap-2 mt-6">
              Desciption:
              <div className="text-zinc-400 text-sm">{product.description}</div>
            </div>

            {/* size */}
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

          <div className="flex flex-col justify-between gap-6">
            <div className="flex items-center gap-3 w-full">
              {/* add to cart button  */}

              {/* Counter */}
              {isInCart && cartItem ? (
                <Counter
                  product={cartItem}
                  classname="flex justify-between items-center bg-primary px-4 py-6 rounded-2xl w-full font-extrabold text-lg text-center hover:cursor-pointer"
                  plusClass="flex justify-center items-center w-6 h-6 text-lg"
                  minusClass="flex justify-center items-center w-6 h-6 text-lg hover:cursor-pointer"
                  spanClass="mx-3 text-lg"
                  trashSize="size-5"
                />
              ) : (
                <button
                  className="bg-primary hover:bg-secondary px-4 py-6 rounded-2xl w-full font-extrabold text-lg text-center transition-colors duration-300 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInCart) {
                      removeFromCart(product.id);
                    } else {
                      addToCart(product, 1);
                    }
                  }}
                >
                  {isInCart ? "REMOVE FROM CART" : "ADD TO CART"}
                </button>
              )}

              {/* add to favorites button  */}
              <button
                className="px-6 py-6 border border-primary hover:border-secondary rounded-2xl w-fit text-lg transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  if (isInFavorites) {
                    removeFromFavorites(product.id);
                  } else {
                    addToFavorites(product);
                  }
                }}
              >
                {isInFavorites ? (
                  <IconHeartFilled className="size-7 text-primary" />
                ) : (
                  <IconHeart className="size-7 text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* suggested products */}
        <div className="flex flex-col gap-8 mt-20">
          <div className="text-3xl">YOU MIGHT ALSO LIKE</div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {products.map(
                (product) =>
                  product.category === productCategory && (
                    <ProductCard key={product.id} product={product} />
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
