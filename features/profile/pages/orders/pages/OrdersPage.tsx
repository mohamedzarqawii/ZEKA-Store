"use client";

import React from "react";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetOrders } from "./hooks/useOrder";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: orders, isLoading } = useGetOrders(currentUser?.id);

  if (isLoading) {
    return <div>Loading orders...</div>;
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
// "use client";

// import React from "react";

// import OrderCard from "@/features/profile/pages/orders/components/OrderCard";
// import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
// import { useGetOrders } from "./hooks/useOrder";

// const OrdersPage = () => {
//   const { data: currentUser } = useGetCurrentUser();
//   const { data: orders, isLoading } = useGetOrders(currentUser?.id);

// if (!currentUser) return null;

// if (isLoading) {
//   return <div>Loading orders...</div>;
// }

//   return (
//     <div>
//       <div className="text-primary text-3xl">ORDERS</div>

//       <div>
//         {orders?.map((order) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
