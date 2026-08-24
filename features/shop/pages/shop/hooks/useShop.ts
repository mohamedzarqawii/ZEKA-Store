import {
  getShopBrands,
  getShopCategories,
  getShopProduct,
  getShopProducts,
  getShopRelatedProductsByBrand,
  getShopRelatedProductsByCategory,
} from "@/services/shop.service";
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
