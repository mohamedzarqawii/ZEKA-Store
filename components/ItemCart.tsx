import Link from "next/link";
import { ProductType } from "@/types/product";
import CategoryCard from "./CategoryCard";
import { IconTrash } from "@tabler/icons-react";

const ItemCart = () => {
  return (
    <div className="flex justify-between items-center gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-[#F97A14] rounded-3xl">
      {/* 1 */}
      <div className="flex items-center gap-5">
        {/* image */}

        <img
          src="/images/hamester.jpeg"
          className="rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
        />

        {/* content */}

        <div className="flex flex-col gap-1">
          <div>Hamster</div>
          <div className="text-zinc-500 text-sm">
            Size: 10.5 | Color: Yellow
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex items-center gap-6">
        {/* count */}
        <div className="flex items-center bg-zinc-700 rounded-md">
          <button className="flex justify-center items-center w-6 h-6 hover:cursor-pointer">
            -
          </button>
          <span className="mx-3">1</span>
          <button className="flex justify-center items-center w-6 h-6 hover:cursor-pointer">
            +
          </button>
        </div>

        {/* price */}
        <div className="font-bold text-xl">$19.99</div>

        {/* delete */}
        <div className="text-[#F97A14] hover:text-[#F95A20] hover:cursor-pointer">
          <IconTrash />
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
