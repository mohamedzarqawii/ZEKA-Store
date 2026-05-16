"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function Home() {
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
                  <a
                    href="/shop"
                    className="bg-primary hover:bg-secondary p-3 rounded-lg text-[#FEFEFE] hover:text-[#FEFEFE] transition-colors duration-300"
                  >
                    Explore Shop
                  </a>
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
          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4 w-full">
            {/* <ProductCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
