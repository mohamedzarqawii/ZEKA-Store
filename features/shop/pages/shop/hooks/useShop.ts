import {
  getShopBrands,
  getShopCategories,
  getShopProduct,
  getShopProducts,
  getShopRelatedProductsByBrand,
  getShopRelatedProductsByCategory,
  getSupaShopBrands,
  getSupaShopProduct,
  getSupaShopProducts,
  getSupaShopCategories,
  getSupaShopRelatedProductsByCategory,
  getSupaShopRelatedProductsByBrand,
} from "@/services/shopServices/shop.service";
import { ProductType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

// -------------- getProducts --------------

export const useGetShopProducts = (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
) => {
  return useQuery({
    queryKey: [
      "products",
      page,
      categories.join(","),
      brands.join(","),
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getShopProducts(page, categories, brands, minPrice, maxPrice),
  });
};

// -------------- get one product --------------

export const useGetShopProduct = (productDocId: string) => {
  return useQuery<ProductType>({
    queryKey: ["product", productDocId],
    queryFn: () => getShopProduct(productDocId),
  });
};

// -------------- get categories --------------

export const useGetShopCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getShopCategories(),
  });
};

// -------------- get brands --------------

export const useGetShopBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getShopBrands(),
  });
};

// -------------- get related products by category --------------

export const useGetShopRelatedProductsByCategory = (categoryId?: number) => {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getShopRelatedProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });
};

// -------------- get related products by brand --------------

export const useGetShopRelatedProductsByBrand = (brandId: number) => {
  return useQuery({
    queryKey: ["brands", brandId],
    queryFn: () => getShopRelatedProductsByBrand(brandId),
    enabled: !!brandId,
  });
};

// ----------------- SupaBase -----------------

// -------------- getProducts --------------

export const useGetSupabseProducts = (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
) => {
  return useQuery({
    queryKey: [
      "products",
      page,
      categories.join(","),
      brands.join(","),
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getSupaShopProducts(page, categories, brands, minPrice, maxPrice),
  });
};

// -------------- get one product --------------

export const useGetSupaShopProduct = (productDocId: string) => {
  return useQuery<ProductType>({
    queryKey: ["product", productDocId],
    queryFn: () => getSupaShopProduct(productDocId),
  });
};

// -------------- get categories --------------

export const useGetSupaShopCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getSupaShopCategories(),
  });
};

// -------------- get brands --------------

export const useGetSupaShopBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getSupaShopBrands(),
  });
};

// -------------- get related products by category --------------

export const useGetSupaShopRelatedProductsByCategory = (
  categoryId?: number,
) => {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getSupaShopRelatedProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });
};

// -------------- get related products by brand --------------

export const useGetSupaShopRelatedProductsByBrand = (brandId: number) => {
  return useQuery({
    queryKey: ["brands", brandId],
    queryFn: () => getSupaShopRelatedProductsByBrand(brandId),
    enabled: !!brandId,
  });
};
