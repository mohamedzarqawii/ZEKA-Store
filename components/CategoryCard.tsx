import Link from "next/link";
import { ProductType } from "@/types/product";

const CategoryCard = () => {
  return (
    <Link href="/category/gym">
      <div className="group relative border border-zinc-700 rounded-3xl w-100 h-150 overflow-hidden">
        {/* image */}
        <img
          src="/images/basketball.jpeg"
          className="blur-[2px] w-full h-full object-cover object-left group-hover:scale-107 transition-transform duration-600 group-hover:cursor-pointer"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h2 className="font-bold text-primary text-3xl">GYM & FITNESS</h2>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end items-center mb-5">
          <h3 className="font-light text-sm">80 PRODUCTS</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
