import products from "@/data/products";
import { useState } from "react";
import { CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { IconTrash } from "@tabler/icons-react";
import { Minus, Plus } from "lucide-react";

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  onRemove: () => void;
  maxValue: number;
  className?: string;
  classNames?: {
    plusButton?: string;
    minusButton?: string;
    value?: string;
    icon?: string;
  };
};

const NewCounter = ({
  value,
  onChange,
  onRemove,
  className,
  classNames,
  maxValue,
}: CounterProps) => {
  return (
    <div className={className} onClick={(e) => e.preventDefault()}>
      {/* Minus / Remove Buttons */}
      <button
        className={classNames?.minusButton}
        onClick={(e) => {
          e.preventDefault();
          if (value > 1) onChange(value - 1);
          else onRemove();
        }}
      >
        {value > 1 ? (
          <Minus className={classNames?.icon} />
        ) : (
          <IconTrash className={classNames?.icon} />
        )}
      </button>

      {/* Value */}
      <div className={classNames?.value}>{value}</div>

      {/* Plus Button */}
      <button
        className={`${classNames?.plusButton} disabled:text-zinc-500 disabled:cursor-not-allowed`}
        disabled={value >= maxValue}
        onClick={(e) => {
          e.preventDefault();
          onChange(value + 1);
        }}
      >
        <Plus className={classNames?.icon} />
      </button>
    </div>
  );
};

{
  /* <NewCounter
                      value={quantity}
                      onChange={setQuantity}
                      onRemove={() => {
                        removeFromCart(cartItem.id);
                      }}
                      maxValue={product.stock}
                    /> */
}

export default NewCounter;
