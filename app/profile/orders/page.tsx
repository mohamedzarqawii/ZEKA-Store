"use client";
import React from "react";

import ItemCart from "@/components/CartItemCard";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function test() {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const shippingFee = cart.length > 0 ? 20 : 0;
  const total = subtotal + shippingFee;

  return (
    <div>
      <div className="text-primary text-3xl">ORDERS</div>
    </div>
  );
}
