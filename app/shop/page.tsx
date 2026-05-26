"use client";

import * as React from "react";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useState } from "react";

export default function Shop() {
  const [value, setValue] = React.useState([200, 800]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  function handleFilterChange(
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    let updated;

    if (selected.includes(item)) {
      updated = selected.filter((x) => x !== item);
    } else {
      updated = [...selected, item];
    }

    setSelected(updated);
  }
  const filterMenu = [
    {
      title: "CATEGORY",
      options: [
        "FLOORING",
        "GYM & FITNESS",
        "SPORT WEAR",
        "EQUIPMENT",
        "SOCCAR",
        "TENNIS",
      ],
    },
    {
      title: "COMPANY",
      options: ["NIKE", "ADIDAS", "PUMA", "REEBOK", "UNDER ARMOUR", "ASICS"],
    },
  ];

  React.useEffect(() => {
    let filtered = products;

    if (selectedCategories.length) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.toUpperCase()),
      );
    }

    if (selectedCompanies.length) {
      filtered = filtered.filter((product) =>
        selectedCompanies.includes(product.brand.toUpperCase()),
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedCompanies]);

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

          <div className="flex flex-col gap-8 mt-8">
            {filterMenu.map((menu, i) => (
              <div key={i} className="flex flex-col gap-5">
                <div className="font-bold text-primary text-lg">
                  {menu.title}
                </div>

                <div className="flex flex-col gap-5">
                  {menu.options.map((option: string, j: number) => (
                    <div key={j} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={
                          menu.title === "CATEGORY"
                            ? selectedCategories.includes(option)
                            : selectedCompanies.includes(option)
                        }
                        onChange={() => {
                          if (menu.title === "CATEGORY") {
                            handleFilterChange(
                              option,
                              selectedCategories,
                              setSelectedCategories,
                            );
                          }

                          if (menu.title === "COMPANY") {
                            handleFilterChange(
                              option,
                              selectedCompanies,
                              setSelectedCompanies,
                            );
                          }
                        }}
                      />
                      <label className="text-zinc-400 text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* price filter */}
            <div className="flex flex-col gap-4 w-full">
              <div>
                <Field className="w-full max-w-xs">
                  <FieldTitle className="text-primary text-lg">
                    PRICE
                  </FieldTitle>
                  <FieldDescription className="text-sm">
                    ($
                    <span className="font-medium tabular-nums">
                      {value[0]}
                    </span>{" "}
                    -{" "}
                    <span className="font-medium tabular-nums">{value[1]}</span>
                    )
                  </FieldDescription>
                  <Slider
                    value={value}
                    onValueChange={(value) =>
                      setValue(value as [number, number])
                    }
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
