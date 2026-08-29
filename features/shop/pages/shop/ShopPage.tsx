"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import ProductCard from "../../components/ProductCard";
import {
  useGetShopProducts,
  useGetShopBrands,
  useGetShopCategories,
} from "./hooks/useShop";
import { ProductCardSkeleton } from "../../components/ProductCardSkilton";
import { FilterBar } from "../../components/FilterLeftBar";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

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

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
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

  if (
    isProductsLoading ||
    !products ||
    isBrandsLoading ||
    isCategoriesLoading ||
    isCurrentUserLoading
  ) {
    return (
      <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
        {/* 1 */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-primary text-3xl">Loading Products . . .</div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-10">
      {/* body */}
      <div className="flex flex-wrap gap-10 mt-15">
        {/* Left - Filter Component */}
        <FilterBar
          filterMenu={filterMenu}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          handleFilterChange={handleFilterChange}
          setSelectedCategories={setSelectedCategories}
          setSelectedBrands={setSelectedBrands}
          value={value}
          setValue={setValue}
          setPriceRange={setPriceRange}
          setCurrentPage={setCurrentPage}
        />

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
            {isProductsLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products?.data && products?.data?.length > 0 ? (
              products.data.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-10 text-muted-foreground text-center">
                No products found.
              </div>
            )}
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
