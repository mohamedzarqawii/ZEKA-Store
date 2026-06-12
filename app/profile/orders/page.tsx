"use client";
import React from "react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import OrderCard from "@/components/OrderCard";

export default function Orders() {
  const { checkout } = useAuth();
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div>
      <div className="text-primary text-3xl">ORDERS</div>
      <div>
        {currentUser.orders.map((order, i) => (
          <OrderCard key={i} order={order} />
        ))}
      </div>
    </div>
  );
}
