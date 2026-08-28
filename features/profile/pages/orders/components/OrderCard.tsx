// import { Button } from "@/components/ui/button";
// import { OrderType } from "@/types/order";
// import Link from "next/link";

// type OrderCardProps = {
//   order: OrderType;
// };

// const OrderCard = ({ order }: OrderCardProps) => {
//   return (
//     <div>
//       <div>Order #{order.id}</div>

//       {order.order_items.map((item) => (
//         <div key={item.id}>
//           <div className="flex justify-between items-center gap-5">
//             {/* 1 */}
//             <div className="flex flex-col gap-3">
//               <div className="flex items-center gap-5">
//                 {/* image */}
//                 <img
//                   src={item.product?.images[0]}
//                   className="border border-primary rounded-xl w-18 h-18 object-center object-cover hover:cursor-pointer"
//                 />
//                 {/* content */}
//                 <div className="flex flex-col gap-1">
//                   <div className="text-primary">{item.product?.name}</div>

//                   {/* price */}
//                   <div className="min-w-3 font-bold text-sm">
//                     ${item.product?.price.toFixed(2)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* 2 */}
//             <div className="flex justify-between items-center gap-6">
//               <Link href={`/shop/${item.product?.id}`} className="block">
//                 <Button variant="outline" size="lg">
//                   Buy Again
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div>Total: ${order.total}</div>
//     </div>
//   );
// };

// export default OrderCard;

import { Button } from "@/components/ui/button";
import { OrderType } from "@/types/order";
import { ProductType } from "@/types/product";
import Link from "next/link";

const OrderProduct = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex justify-between items-center gap-5">
      {/* 1 */}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          {/* image */}

          <img
            src={product?.images[0]}
            className="border border-primary rounded-xl w-18 h-18 object-center object-cover hover:cursor-pointer"
          />

          {/* content */}

          <div className="flex flex-col gap-1">
            <div className="text-primary">{product?.name}</div>

            {/* price */}
            <div className="min-w-3 font-bold text-sm">
              ${product?.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="flex justify-between items-center gap-6">
        <Link href={`/shop/${product?.id}`} className="block">
          <Button variant="outline" size="lg">
            Buy Again
          </Button>
        </Link>
      </div>
    </div>
  );
};

type OrderCardProps = {
  order: OrderType;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="flex flex-col gap-4 bg-[#1a1a1a]/20 mt-10 p-6 border border-primary rounded-3xl w-full">
      <div>Delevired at {date}</div>
      <div className="bg-primary w-full h-px"></div>
      <div className="flex flex-col gap-6">
        {order.order_items.map((item, j) => (
          <OrderProduct key={j} product={item.product} />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
