"use client";

import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/features/dashboard/pages/products/hooks/useProducts";
import ProductCard from "@/features/shop/components/ProductCard";
import { ProductType } from "@/types/product";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: products, isLoading: isProductsLoading } = useGetProducts();

  return (
    <div className="mx-10">
      {/* <div className="bg-[#FEFEFE] h-px"></div> */}

      {/* body */}

      <div className="flex flex-col">
        {/* first slide */}

        <div className="flex justify-center items-center mt-15">
          <div className="flex flex-col gap-15">
            <div className="font-bold text-primary">NEW COLLECTION</div>

            <div className="flex flex-col gap-10">
              <div className="text-6xl">
                PUSH YOUR <span className="text-primary">LIMITS</span> FURTHER
              </div>
              <div className="flex flex-col gap-15">
                <div>
                  High-performance equipment designed for athletes who <br />{" "}
                  never settle for second place.
                </div>

                <div>
                  <Button variant="default" asChild>
                    <Link href="/shop">Explore Shop</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/images/hamester.jpeg"
              className="shadow-[0_0_50px] shadow-primary rounded-[65px] w-175"
            />
          </div>
        </div>
        {/* second slide */}
        <div className="flex flex-col gap-10 mt-20">
          <div className="flex justify-between items-end">
            <div className="text-primary text-3xl">MOST PRODUCT POPULAR</div>
          </div>
          {isProductsLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4 w-full">
              {products?.data?.length > 0 &&
                products?.data?.map((product: ProductType) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
