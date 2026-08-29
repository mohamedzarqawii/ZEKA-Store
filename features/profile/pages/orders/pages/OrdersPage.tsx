"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import Link from "next/link";
import OrderCard from "../components/OrderCard";
import { useGetOrders } from "./hooks/useOrder";

const OrdersPage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: orders, isLoading: isOrdersLoading } = useGetOrders(
    currentUser?.id,
  );

  if (orders?.length === 0) {
    return (
      <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="font-bold text-primary text-3xl">
            YOU HAVEN&apos;T PLACED ANY ORDERS YET !
          </div>

          <div className="text-xl">WHAT ARE YOU WAITING FOR?</div>

          <Link
            href="/shop"
            className="bg-primary hover:bg-secondary mt-4 px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
          >
            START SHOPPING NOW!
          </Link>
        </div>
      </div>
    );
  }

  if (isOrdersLoading || isCurrentUserLoading) {
    return (
      <div className="flex justify-center items-center gap-2 h-[calc(100vh-270px)] text-primary text-4xl">
        <Spinner className="size-8" data-icon="inline-start" />
        Loading orders . . .
      </div>
    );
  }
  return (
    <div>
      <div className="text-primary text-3xl">ORDERS</div>

      <div>
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
