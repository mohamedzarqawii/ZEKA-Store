import CategoryCard from "@/app/category/CategoryCard";

export default function Home() {
  return (
    <div className="mx-10">
      {/* body */}
      <div className="flex flex-col gap-10 mt-15">
        <div className="flex justify-center items-center">
          <div className="text-primary text-3xl">BROWSE BY SPORT</div>
        </div>
        <div className="flex gap-6 overflow-x-auto shrink-0 no-scrollbar">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </div>
  );
}
