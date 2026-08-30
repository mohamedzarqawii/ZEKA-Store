import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";

export function FilterLeftBarSkeleton() {
  const disabled = true;
  return (
    <div className="top-24 sticky flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary/30 rounded-3xl w-full max-w-xs h-fit">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3 text-primary">
        <div>FILTERS</div>
        <div className="bg-primary w-full h-px"></div>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        {/* Section 1: Categories (6 Items) */}
        <div className="flex flex-col gap-4">
          <div className="text-primary text-lg">CATEGORY</div>

          <div className="flex flex-col gap-6 mt-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="bg-zinc-800 rounded-sm w-4 h-4" />
                <Skeleton className="bg-zinc-800/70 rounded-sm w-30 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Brands (6 Items) */}
        <div className="flex flex-col gap-4">
          <div className="font-bold text-primary text-lg">BRAND</div>
          <div className="flex flex-col gap-6 mt-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="bg-zinc-800 rounded-sm w-4 h-4" />
                <Skeleton className="bg-zinc-800/70 rounded-sm w-30 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Price Filter */}
        <div className="flex flex-col gap-4 w-full">
          {/* <div className="flex flex-col w-full">
            <div className="text-primary text-lg">PRICE</div>
            <div className="flex flex-col mt-2">
              <div className="-mt-1 text-muted-foreground text-sm">
                ($
                <span className="font-medium tabular-nums">0</span> -{" "}
                <span className="font-medium tabular-nums">1000</span>)
              </div>
              <Skeleton className="bg-zinc-800 mt-2 rounded-full w-full h-2.5" />
            </div>
          </div> */}

          <div>
            <Field className="w-full max-w-xs">
              <FieldTitle className="text-primary text-lg">PRICE</FieldTitle>
              <FieldDescription className="text-sm">
                ($
                <span className="font-medium tabular-nums">0</span> -{" "}
                <span className="font-medium tabular-nums">1000</span>)
              </FieldDescription>
              <Slider
                value={[0, 1000000]}
                onValueChange={(val) => {}}
                min={0}
                max={1000}
                step={10}
                className="mt-2 w-full"
                aria-label="Price Range"
              />
            </Field>
          </div>
          {/* Slider track skeleton */}
        </div>

        {/* Apply Button Skeleton */}
        <Button
          variant={"default"}
          size={"default"}
          disabled={disabled}
          className="w-full cursor-pointer"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
