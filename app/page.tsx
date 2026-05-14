"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10">
      {/* Header */}
      <div className="flex justify-between items-center w-full h-20">
        <div className="">
          <img
            src="/images/image2.png"
            className="bg-transparent w-30 object-contain"
          />
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/home"
            className="after:-bottom-0.75 after:left-1/2 after:absolute relative after:bg-[#FC6216] after:rounded-full after:w-full after:h-0.5 text-[#FC6216] after:content-[''] after:-translate-x-1/2 after:animate-[shrinkLine_300ms_ease_forwards]"
          >
            HOME
          </Link>
          <Link
            href="/shop"
            className="after:-bottom-0.75 after:left-1/2 after:absolute relative after:bg-[#FC6216] after:rounded-full after:w-full after:h-0.5 after:content-[''] after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-tcansform after:-translate-x-1/2 after:duration-300"
          >
            SHOP
          </Link>
          <Link
            href="/category"
            className="after:-bottom-0.75 after:left-1/2 after:absolute relative after:bg-[#FC6216] after:rounded-full after:w-full after:h-0.5 after:content-[''] after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-tcansform after:-translate-x-1/2 after:duration-300"
          >
            CATEGORY
          </Link>
          <Link
            href="/about"
            className="after:-bottom-0.75 after:left-1/2 after:absolute relative after:bg-[#FC6216] after:rounded-full after:w-full after:h-0.5 after:content-[''] after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:-translate-x-1/2 after:duration-300"
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="after:-bottom-0.75 after:left-1/2 after:absolute relative after:bg-[#FC6216] after:rounded-full after:w-full after:h-0.5 after:content-[''] after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:-translate-x-1/2 after:duration-300"
          >
            CONTACT
          </Link>
        </div>

        <div className="flex gap-5">
          <div>
            <Link
              href="/login"
              className="p-1.5 border rounded-lg hover:text-[#FC6216] transition-colors duration-300"
            >
              LOG IN
            </Link>
          </div>

          <div>
            <Link href="/cart" className="group block relative w-6 h-6">
              <img
                src="/images/bag.png"
                className="absolute inset-0 group-hover:opacity-0 w-6 h-6 transition-opacity duration-300"
              />

              <img
                src="/images/bag-hover.png"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 w-6 h-6 transition-opacity duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#FEFEFE] h-px"></div> */}

      {/* body */}

      <div className="flex flex-col">
        {/* first slide */}
        <div className="flex justify-center items-center mt-15">
          <div className="flex flex-col gap-15">
            <div className="font-bold text-[#FC6216]">NEW COLLECTION</div>

            <div className="flex flex-col gap-10">
              <div className="text-6xl">
                PUSH YOUR <span className="text-[#FC6216]">LIMITS</span> FURTHER
              </div>
              <div className="flex flex-col gap-15">
                <div>
                  High-performance equipment designed for athletes who <br />{" "}
                  never settle for second place.
                </div>

                <div>
                  <a
                    href="/shop"
                    className="bg-[#F97A14] hover:bg-[#F95A20] p-3 rounded-lg text-[#FEFEFE] hover:text-[#FEFEFE] transition-colors duration-300"
                  >
                    Explore Shop
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/images/hamesterGym.jpeg"
              className="shadow-[#FEFEFE] shadow-[0_0_15px] rounded-[65px] w-175"
            />
          </div>
        </div>
        {/* second slide */}
        <div className="flex flex-col gap-10 mt-20">
          <div className="flex justify-between items-end">
            <div className="text-[#F97A14] text-3xl">MOST PRODUCT POPULAR</div>
          </div>
          <div className="gap-4 grid grid-cols-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* second body */
}
