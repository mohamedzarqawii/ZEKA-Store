import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkilton";

export const ProductPageSkeleton = () => {
  return (
    <div className="mx-10 my-15 animate-pulse">
      {/* القسم العلوي: الصور على اليسار والبيانات على اليمين */}
      <div className="flex items-center gap-6 w-full h-fit">
        {/* اليسار: الصور (Thumbs + Main Image) */}
        <div className="relative flex gap-8 w-full max-w-155">
          {/* المصغرات Side Thumbnails */}
          <div className="flex flex-col gap-4 rounded-2xl w-31 h-130">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="border border-primary/20 rounded-2xl w-full h-25"
              />
            ))}
          </div>

          {/* الصورة الرئيسية Main Image */}
          <div className="rounded-2xl w-full max-w-130 overflow-hidden">
            <Skeleton className="border border-primary/20 rounded-2xl w-full max-w-130 h-130" />
          </div>
        </div>

        {/* اليمين: تفاصيل المنتج (Product Details) */}
        <div className="flex flex-col justify-between gap-4 w-full h-130">
          <div className="w-full">
            {/* Category | Brand */}
            <Skeleton className="w-48 h-5" />

            {/* Title */}
            <Skeleton className="mt-6 w-3/4 h-12" />

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-5">
              <Skeleton className="w-60 h-4" />
            </div>

            {/* Price */}
            <Skeleton className="mt-6 w-34 h-4" />

            {/* Description */}
            <div className="flex flex-col gap-2 mt-6">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/6 h-4" />
            </div>

            {/* Stock indicator */}
            <Skeleton className="mt-6 w-32 h-5" />
          </div>

          {/* الأزرار في الأسفل: Add to Cart & Favorites */}
          <div className="flex justify-between items-center gap-3 w-full">
            <Skeleton className="rounded-2xl w-full h-20" />
            <Skeleton className="rounded-2xl w-20 h-20 shrink-0" />
          </div>
        </div>
      </div>

      {/* القسم السفلي: المنتجات المقترحة (Suggested Products) */}
      <div className="flex flex-col gap-8 mt-15">
        {/* Title */}
        <Skeleton className="w-100 h-8" />

        {/* Grid Product Cards */}
        <div className="gap-4 sm:gap-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
