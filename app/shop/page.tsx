import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="mx-10">
      {/* body */}
      <div className="flex gap-10 mt-15">
        {/* Left */}

        <div className="top-24 sticky flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-[#F97A14] rounded-3xl w-full max-w-xs h-fit">
          {/* 1 L */}
          <div className="flex flex-col gap-3">
            <div>FILTERS</div>
            <div className="bg-[#FEFEFE] w-full h-px"></div>
          </div>

          {/* 2 L */}

          <div className="flex flex-col gap-4 mt-8">
            <div className="font-bold text-[#F97A14] text-lg">CATEGORY</div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">FLOORING</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">GYM & FITNESS</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">SPORT WEAR</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">EQUIPMENT</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">SOCCAR</label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">TENNIS</label>
              </div>
            </div>
          </div>

          {/* 3 L */}

          <div className="flex flex-col gap-4">
            <div className="font-bold text-[#F97A14] text-lg">COMPANY</div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">NIKE</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">ADIDAS</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">PUMA</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">REEBOK</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">UNDER ARMOUR</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <label className="text-zinc-400 text-sm">ASICS</label>
              </div>
            </div>
          </div>

          {/* 4 L */}

          <div className="flex flex-col gap-4 mt-8 w-full">
            <div className="text-[#F97A14] text-sm">PRICE</div>
            <div className="flex">
              <div className="flex flex-col gap-1 mr-3">
                <input
                  className="px-3 py-2 border border-[#F97A14] rounded-lg outline-none focus:ring-[#F97A14] focus:ring-2 w-full scroll"
                  type="number"
                  placeholder="From"
                  min={0}
                />
              </div>
              <div>
                <input
                  className="px-3 py-2 border border-[#F97A14] rounded-lg outline-none focus:ring-[#F97A14] focus:ring-2 w-full"
                  type="number"
                  placeholder="To"
                  min={0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-10 w-full">
          {/* 1 R */}
          <div className="flex justify-between items-end">
            <div className="text-[#F97A14] text-3xl">ALL PRODUCTS</div>
            <div className="text-[13px]">Showing 1-12 of 120 products</div>
          </div>

          {/* 2 R */}
          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
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
