import Link from "next/link";
import { ProductType } from "@/types/product";
import { CartItemType } from "@/context/CartContext";
import { IconTrash } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const ItemCart = ({ product }: { product: CartItemType }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <div className="flex justify-between items-center gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl">
      {/* 1 */}
      <div className="flex items-center gap-5">
        {/* image */}

        <img
          src={product.image}
          className="rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
        />

        {/* content */}

        <div className="flex flex-col gap-1">
          <div>{product.name}</div>
          <div className="text-zinc-500 text-sm">
            Size: 10.5 | Color: Yellow
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex items-center gap-6">
        {/* count */}
        <div className="flex items-center bg-zinc-700 px-1 py-1 rounded-md w-21">
          <button
            className="flex justify-center items-center w-6 h-6 hover:cursor-pointer"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
                updateQuantity(product.id, quantity - 1);
              } else {
                removeFromCart(product.id);
              }
            }}
          >
            {quantity > 1 ? "-" : <IconTrash className="size-4" />}
          </button>
          <span className="mx-3">{quantity}</span>
          <button
            className="flex justify-center items-center w-6 h-6 hover:cursor-pointer"
            onClick={() => {
              setQuantity(quantity + 1);
              updateQuantity(product.id, quantity + 1);
            }}
          >
            +
          </button>
        </div>

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
