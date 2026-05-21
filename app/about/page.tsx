import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-10">
      {/* body */}

      <div className="flex flex-col">
        {/* first slide */}
        <div className="flex justify-between items-center mt-15">
          {/* image */}
          <div className="w-400 h-170">
            <img
              src="/images/dummbles10.jpeg"
              className="shadow-[#FEFEFE] shadow-[0_0_15px] rounded-[65px] w-full h-full object-cover object-left"
            />
          </div>

          {/* text */}

          <div className="flex flex-col gap-15 ml-20">
            <div className="flex flex-col gap-10">
              <div className="text-primary text-4xl">OUR MESSION</div>
              <div className="flex flex-col gap-15">
                <div className="text-lg">
                  Founded in 2024,
                  <span className="text-secondary"> ZEKA SPORTS </span>
                  started with a single goal: to provide high-quality equipment
                  to athletes who are passionate about their craft. We believe
                  that the right gear shouldn't just fit you; it should inspire
                  you.
                </div>

                <div className="flex gap-10">
                  <div className="flex flex-col gap-2 p-2 border-primary border-l-2">
                    <div className="text-primary">Durability</div>
                    <div className="text-[12px]">
                      Built to last the toughest training sessions.
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-2 border-primary border-l-2">
                    <div className="text-primary">Innovation</div>
                    <div className="text-[12px]">
                      Constantly refining materials and design.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
