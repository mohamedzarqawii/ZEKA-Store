"use client";

import ItemCart from "@/components/CartItemCard";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const shippingFee = cart.length > 0 ? 20 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="mx-10">
      {cart.length > 0 ? (
        <div className="flex flex-col gap-10 mt-15">
          {/* 1 */}
          <div className="text-primary text-3xl">YOUR SHOPPING BAG</div>

          {/* 2 */}

          <div className="flex gap-10">
            {/* left */}
            <div className="flex flex-col gap-6 w-full">
              {cart.map((item) => (
                <ItemCart key={item.id} product={item} />
              ))}
            </div>

            {/* right */}

            <div className="top-24 sticky flex flex-col gap-8 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl w-200 h-fit">
              <div>ORDER SUMMARY</div>

              <div>
                <div className="flex justify-between">
                  <div>SubTotal</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>

                <div className="flex justify-between">
                  <div>Shipping Fee</div>
                  <div>${shippingFee.toFixed(2)}</div>
                </div>
              </div>
              <div className="bg-[#FEFEFE] h-px"></div>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="font-bold text-2xl">TOTAL</div>
                  <div className="font-bold text-2xl">${total.toFixed(2)}</div>
                </div>

                <button className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300 hover:cursor-pointer">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
          {/* 1 */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-primary text-3xl">
              YOUR SHOPPING CART LOOK EMPTY !
            </div>
            <div className="text-xl">WHAT ARE YOU WAITING FOR?</div>
            <a
              href="/shop"
              className="bg-primary hover:bg-secondary mt-4 px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
            >
              START SHOPPING NOW !
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
