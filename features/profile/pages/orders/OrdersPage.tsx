"use client";
import React from "react";

import OrderCard from "@/components/OrderCard";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

const OrdersPage = () => {
  const { data: currentUser } = useGetCurrentUser();

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
};
export default OrdersPage;
