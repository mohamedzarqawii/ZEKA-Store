import Header from "@/components/Header";
import ItemCart from "@/components/ItemCart";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10">
      <div className="flex flex-col gap-10 mt-15">
        {/* 1 */}
        <div className="text-[#F97A14] text-3xl">YOUR SHOPPING BAG</div>

        {/* 2 */}

        <div className="flex gap-10">
          {/* left */}
          <div className="flex flex-col gap-6 w-full">
            <ItemCart />
            <ItemCart />
            <ItemCart />
            <ItemCart />
            <ItemCart />
            <ItemCart />
            <ItemCart />
            <ItemCart />
            <ItemCart />
          </div>

          {/* right */}

          <div className="top-24 sticky flex flex-col gap-6 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-[#F97A14] rounded-3xl w-200 h-fit">
            <div>ORDER SUMMARY</div>

            <div>
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>$19.99</div>
              </div>

              <div className="flex justify-between">
                <div>Shipping</div>
                <div>$19.99</div>
              </div>

              <div className="flex justify-between">
                <div>Total</div>
                <div>$19.99</div>
              </div>
            </div>
            <div className="bg-[#FEFEFE] h-px"></div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div>TOTAL</div>
                <div>$19.99</div>
              </div>

              <button className="bg-[#F97A14] hover:bg-[#F95A20] px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300 hover:cursor-pointer">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
