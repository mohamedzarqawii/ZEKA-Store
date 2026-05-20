"use client";

import * as React from "react";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const [value, setValue] = React.useState([200, 800]);

  return (
    <div className="mx-10">
      {/* body */}
      <div className="flex gap-10 mt-15">
        {/* Left */}

        <div className="top-24 sticky flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl w-full max-w-xs h-fit">
          {/* 1 L */}
          <div className="flex flex-col gap-3">
            <div>FILTERS</div>
            <div className="bg-[#FEFEFE] w-full h-px"></div>
          </div>

          {/* 2 L */}

          <div className="flex flex-col gap-4 mt-8">
            <div className="font-bold text-primary text-lg">CATEGORY</div>

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
            <div className="font-bold text-primary text-lg">COMPANY</div>

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
            <div>
              <Field className="w-full max-w-xs">
                <FieldTitle className="text-primary text-lg">PRICE</FieldTitle>
                <FieldDescription className="text-sm">
                  ($
                  <span className="font-medium tabular-nums">
                    {value[0]}
                  </span> -{" "}
                  <span className="font-medium tabular-nums">{value[1]}</span>)
                </FieldDescription>
                <Slider
                  value={value}
                  onValueChange={(value) => setValue(value as [number, number])}
                  max={1000}
                  min={0}
                  step={10}
                  className="mt-2 w-full"
                  aria-label="Price Range"
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-10 w-full">
          {/* 1 R */}
          <div className="flex justify-between items-end">
            <div className="text-primary text-3xl">ALL PRODUCTS</div>
            <div className="text-[13px]">Showing 1-12 of 120 products</div>
          </div>

          {/* 2 R */}
          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
