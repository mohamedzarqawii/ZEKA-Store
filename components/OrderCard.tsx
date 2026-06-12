import products from "@/data/products";
import { OrderType } from "@/types/order";
import Link from "next/link";
import React from "react";
import Counter from "./Counter";
import { Button } from "./ui/button";

type OrderCardProps = {
  order: OrderType;
};

const OrderProduct = ({ productId }: { productId: number }) => {
  const product = products.find((p) => p.id == productId);

  return (
    <div className="flex justify-between items-center gap-5">
      {/* 1 */}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          {/* image */}

          <img
            src={product?.image}
            className="border border-primary rounded-xl w-18 h-18 object-center object-cover hover:cursor-pointer"
          />

          {/* content */}

          <div className="flex flex-col gap-1">
            <div className="text-primary">{product?.name}</div>

            <div className="flex gap-1">
              {/* color  */}
              {/* <div>
                {product?.color != null ? (
                  <div className="text-zinc-500 text-sm">
                    Color:
                    <span className="mx-1">{product?.color}</span>
                  </div>
                ) : null}
              </div> */}
            </div>
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
        {order.products.map((product, j) => (
          <OrderProduct key={j} productId={product.productId} />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
