import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-card border border-border rounded-2xl w-full h-99 overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative w-full h-64 shrink-0">
        <Skeleton className="rounded-none w-full h-full" />

        {/* Top Right Icon Skeleton (Favorite Button) */}
        <Skeleton className="top-4 right-4 absolute rounded-lg size-8" />

        {/* Bottom Right Icon Skeleton (Cart Button) */}
        <Skeleton className="right-3 bottom-3 absolute rounded-lg size-7" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col justify-between bg-card p-4 h-full">
        <div className="flex flex-col gap-2">
          {/* Brand Skeleton */}
          <Skeleton className="w-20 h-3" />
          {/* Title Skeleton (2 lines) */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </div>
        </div>

        {/* Footer Skeleton (Category & Price) */}
        <div className="flex justify-between items-center mt-3 w-full">
          <Skeleton className="rounded-md w-16 h-5" />
          <Skeleton className="w-12 h-4" />
        </div>
      </div>
    </div>
  );
}
