"use client";
import { IconHeart, IconHeartFilled, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useParams } from "next/navigation";
import { ProductType } from "@/types/product";
import { CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import { Cart } from "@hugeicons/core-free-icons";

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

  const quantityButtons = (product: CartItemType) => (
    <div className="flex justify-between items-center bg-primary px-4 py-6 rounded-2xl w-full font-extrabold text-lg text-center transition-colors duration-300 hover:cursor-pointer">
      <button
        className="flex justify-center items-center w-6 h-6 text-lg hover:cursor-pointer"
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
            updateQuantity(product.id, quantity - 1);
          } else {
            removeFromCart(product.id);
          }
        }}
      >
        {quantity > 1 ? "-" : <IconTrash className="size-5" />}
      </button>
      <span className="mx-3 text-lg">{quantity}</span>
      <button
        className="flex justify-center items-center w-6 h-6 text-lg hover:cursor-pointer"
        onClick={() => {
          setQuantity(quantity + 1);
          updateQuantity(product.id, quantity + 1);
        }}
      >
        +
      </button>
    </div>
  );

  return (
    <div className="mx-10 mt-15">
      <div className="flex gap-6 w-full h-fit">
        {/* left */}
        <div className="flex gap-8 w-full max-w-2xl">
          {/* 1 */}

          <div className="flex flex-col gap-4 h-120 overflow-y-auto shrink- no-scrollbar">
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
              className="border border-primary rounded-2xl w-130 h-120 object-center object-cover hover:cursor-pointer"
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

            {/* size */}
            <div className="flex flex-col gap-4 mt-10">
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

              {isInCart && cartItem ? (
                quantityButtons(cartItem)
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
                  <IconHeartFilled className="size-6 text-primary" />
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
