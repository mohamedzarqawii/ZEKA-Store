"use client";

import * as React from "react";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

import { useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import ProductCard from "../../components/ProductCard";
import {
  useGetShopProducts,
  useGetShopBrands,
  useGetShopCategories,
} from "./hooks/useShop";
import { supabase } from "@/lib/supabase";

type Option = {
  label: string;
  value: string;
};

const ShopPage = () => {
  // ----------- Showing Products Processes ------------

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [value, setValue] = useState<number[]>([0, 1000]);

  const { data: products, isLoading: isProductsLoading } = useGetShopProducts(
    currentPage,
    selectedCategories,
    selectedBrands,
    priceRange[0],
    priceRange[1],
  );

  // ----------- get categories and brands names ------------

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetShopCategories();
  const { data: brands, isLoading: isBrandsLoading } = useGetShopBrands();

  const categoriesOptions: Option[] = Array.isArray(categories)
    ? categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const brandsOptions: Option[] = Array.isArray(brands)
    ? brands.map((brand: any) => ({
        label: brand.name,
        value: brand.id,
      }))
    : [];

  // ----------- calculate first and last product in page ------------

  const totalPages = products?.meta?.pagination?.pageCount ?? 1;
  const productsNumber = products?.meta?.pagination?.total ?? 0;
  const fromItem =
    products?.data?.length === 0 ? 0 : (currentPage - 1) * 12 + 1;
  const toItem = Math.min(currentPage * 12, productsNumber);

  // ----------- filter handeling ------------

  const filterMenu = [
    {
      title: "CATEGORY",
      options: categoriesOptions,
    },
    {
      title: "BRAND",
      options: brandsOptions,
    },
  ];

  const handleFilterChange = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else {
      setSelected([...selected, item]);
    }
    setCurrentPage(1);
  };

  if (isProductsLoading && !products) {
    return (
      <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
        {/* 1 */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-primary text-3xl">Loading Product...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-10">
      {/* body */}
      <div className="flex flex-wrap gap-10 mt-15">
        {/* Left */}

        <div className="top-24 sticky flex flex-col gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl w-full max-w-xs h-fit">
          {/* 1 L */}
          <div className="flex flex-col gap-3 text-primary">
            <div>FILTERS</div>
            <div className="bg-primary w-full h-px"></div>
          </div>

          {/* 2 L */}

          <div className="flex flex-col gap-8 mt-8">
            {filterMenu.map((menu, i) => (
              <div key={i} className="flex flex-col gap-5">
                <div className="font-bold text-primary text-lg">
                  {menu.title}
                </div>

                <div className="flex flex-col gap-5">
                  {menu.options.map((option, j: number) => (
                    <div key={j} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={
                          menu.title === "CATEGORY"
                            ? selectedCategories.includes(option.value)
                            : selectedBrands.includes(option.value)
                        }
                        onChange={() => {
                          if (menu.title === "CATEGORY") {
                            handleFilterChange(
                              option.value,
                              selectedCategories,
                              setSelectedCategories,
                            );
                          }

                          if (menu.title === "BRAND") {
                            handleFilterChange(
                              option.value,
                              selectedBrands,
                              setSelectedBrands,
                            );
                          }
                        }}
                      />
                      <label className="text-zinc-400 text-sm">
                        {option.label}
                      </label>
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
                    onValueChange={(val) => setValue(val)}
                    onValueCommit={(val) => setPriceRange(val)}
                    min={0}
                    max={1000}
                    step={10}
                    className="mt-2 w-full"
                    aria-label="Price Range"
                  />
                </Field>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-10 w-full min-h-screen">
          {/* 1 R - Header */}
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-end gap-2">
            <h1 className="font-bold text-primary text-2xl sm:text-3xl tracking-tight">
              ALL PRODUCTS
            </h1>
            <div className="text-zinc-400 text-xs sm:text-sm">
              Showing{" "}
              <span className="font-medium text-primary">
                {fromItem} - {toItem}
              </span>{" "}
              of{" "}
              <span className="font-medium text-primary">{productsNumber}</span>{" "}
              products
            </div>
          </div>

          {/* 2 R - Flexible Grid */}
          <div className="gap-4 sm:gap-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full">
            {products?.data &&
              products?.data?.length > 0 &&
              products?.data?.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-8 w-full">
          <div className="flex gap-3">
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 border rounded-md cursor-pointer transition ${
                  currentPage === index + 1 ? "bg-primary" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopPage;
