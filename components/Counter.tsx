import products from "@/data/products";
import { useState } from "react";
import { CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { IconTrash } from "@tabler/icons-react";

const Counter = ({
  product,
  classname,
  plusClass,
  minusClass,
  spanClass,
  trashSize,
}: {
  product: CartItemType;
  classname?: string;
  plusClass?: string;
  minusClass?: string;
  spanClass?: string;
  trashSize?: string;
}) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <div className={classname}>
      <button
        className={plusClass}
        onClick={(e) => {
          e.preventDefault();
          if (quantity > 1) {
            setQuantity(quantity - 1);
            updateQuantity(product.id, quantity - 1);
          } else {
            removeFromCart(product.id);
          }
        }}
      >
        {quantity > 1 ? "-" : <IconTrash className={trashSize} />}
      </button>
      <div
        className={` ${spanClass}`}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {quantity}
      </div>
      <button
        className={`${minusClass} ${quantity >= product.stock ? "text-zinc-400 cursor-not-allowed" : "hover:cursor-pointer"}`}
        disabled={quantity >= product.stock}
        onClick={(e) => {
          e.preventDefault();
          if (quantity < product.stock) {
            setQuantity(quantity + 1);
            updateQuantity(product.id, quantity + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
