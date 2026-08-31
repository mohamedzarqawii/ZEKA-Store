"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex data-vertical:flex-col items-center data-disabled:opacity-50 w-full data-vertical:w-auto data-vertical:h-full data-vertical:min-h-40 touch-none select-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative bg-muted rounded-md data-horizontal:w-full data-vertical:w-1 data-horizontal:h-1 data-vertical:h-full overflow-hidden grow"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary data-vertical:w-full data-horizontal:h-full select-none"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block after:absolute relative after:-inset-2 bg-white disabled:opacity-50 border border-ring rounded-md focus-visible:outline-hidden ring-ring/30 hover:ring-2 focus-visible:ring-2 active:ring-2 size-3 transition-[color,box-shadow] disabled:pointer-events-none select-none shrink-0"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
