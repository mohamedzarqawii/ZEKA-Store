import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { reqFavorite, ResFavorite } from "@/types/shop/favorite";
import { use } from "react";

// -------------- getProducts --------------

export const getProducts = async (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
) => {
  const { data } = await api.get(API_ROUTES.shop.getProducts, {
    params: {
      "pagination[page]": page,
      "pagination[pageSize]": 12,

      "filters[price][$gte]": minPrice,
      "filters[price][$lte]": maxPrice,

      populate: "*",

      ...(categories.length > 0 && {
        "filters[category][id][$in]": categories,
      }),

      ...(brands.length > 0 && {
        "filters[brand][id][$in]": brands,
      }),
    },
  });
  return data;
};

// -------------- get one product --------------

export const getProduct = async (productId: string) => {
  const { data } = await api.get(API_ROUTES.shop.getProduct(productId));

  return data.data;
};

// -------------- get related products by category --------------

export const getRelatedProductsByCategory = async (categoryId: number) => {
  const { data } = await api.get(
    API_ROUTES.shop.getRelatedProductsByCategory(categoryId),
  );
  return data.data;
};

// -------------- get related products by brand --------------

export const getRelatedProductsByBrand = async (brandId: number) => {
  const { data } = await api.get(
    API_ROUTES.shop.getRelatedProductsByBrand(brandId),
  );
  return data.data;
};

// -------------- get brands --------------

export const getBrands = async () => {
  const { data } = await api.get(API_ROUTES.shop.getBrands);
  return data.data;
};

// -------------- get categories --------------

export const getCategories = async () => {
  const { data } = await api.get(API_ROUTES.shop.getCategories);
  return data.data;
};

// ----------------- FAVORITES -----------------

// -------------- get favorites --------------

export const getFavorites = async (userId: number) => {
  const { data } = await api.get<ResFavorite>(API_ROUTES.favorite.get, {
    params: {
      "pagination[pageSize]": 999,
      populate: ["product.images", "product.brand", "product.category"],
      filters: {
        user: {
          $eq: userId,
        },
      },
    },
  });
  return data.data;
};

// -------------- add to favorite --------------

export const addToFavorite = async (userId: number, productDocId: string) => {
  const { data } = await api.post(API_ROUTES.favorite.add, {
    data: {
      product: productDocId,
      user: userId,
    },
  });
  return data.data;
};

export const removeFromFavorite = async (productId: string) => {
  const { data } = await api.delete(API_ROUTES.favorite.remove, {
    params: {
      productId,
    },
  });
  return data;
};
