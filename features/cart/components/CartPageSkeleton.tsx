import { Skeleton } from "@/components/ui/skeleton";

export const CartPageSkeleton = () => {
  return (
    <div className="mx-10 animate-pulse">
      <div className="flex flex-col gap-10 mt-15">
        {/* Title Skeleton */}
        <div className="text-primary text-3xl">YOUR SHOPPING BAG</div>

        <div className="flex gap-10">
          {/* Left Column: Cart Items List */}
          <div className="flex flex-col gap-6 w-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary/20 rounded-3xl"
              >
                {/* Image + Product Info */}
                <div className="flex items-center gap-5">
                  <Skeleton className="rounded-2xl w-25 h-25 shrink-0" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-48 h-5" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                </div>

                {/* Counter + Favorite Button */}
                <div className="flex justify-between items-center gap-3">
                  <Skeleton className="rounded-md w-21.5 h-8" />
                  <Skeleton className="rounded-md size-8" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="top-24 sticky flex flex-col gap-8 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary/20 rounded-3xl w-130 h-fit shrink-0">
            {/* Header */}
            <Skeleton className="w-40 h-6" />

            {/* Subtotal & Shipping */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-14 h-4" />
              </div>
            </div>

            {/* Separator */}
            <div className="bg-zinc-800 w-full h-px" />

            {/* Total & Checkout Button */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <Skeleton className="w-20 h-7" />
                <Skeleton className="w-24 h-7" />
              </div>

              <Skeleton className="rounded-lg w-full h-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
