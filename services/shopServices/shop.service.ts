import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { supabase } from "@/lib/supabase";
import { ProductType } from "@/types/product";

// -------------- getProducts --------------

export const getShopProducts = async (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
) => {
  const from = (page - 1) * 12;
  const to = from + 12 - 1;

  let query = supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*) ", {
      count: "exact",
    });

  if (categories.length > 0) {
    query = query.in("category_id", categories);
  }

  if (brands.length > 0) {
    query = query.in("brand_id", brands);
  }

  query = query.gte("price", minPrice).lte("price", maxPrice).range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }
  if (data) {
    console.log(data);
  }

  return {
    data: data ?? [],
    meta: {
      pagination: {
        page,
        pageSize: 12,
        pageCount: Math.ceil((count ?? 0) / 12),
        total: count ?? 0,
      },
    },
  };
};

// -------------- get one product --------------

export const getShopProduct = async (productId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("id", productId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
// -------------- get categories --------------

export const getShopCategories = async () => {
  const { data, error } = await supabase.from("categories").select("name , id");

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get brands --------------

export const getShopBrands = async () => {
  const { data, error } = await supabase.from("brands").select("name , id");

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get related products by category --------------

export const getShopRelatedProductsByCategory = async (categoryId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("category_id", categoryId);

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get related products by brand --------------

export const getShopRelatedProductsByBrand = async (brandId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("brand_id", brandId);

  if (error) {
    throw error;
  }
  return data;
};
// ----------------- FAVORITES -----------------

// -------------- update user favorites --------------

export const updateUserFavorites = async (
  userId: string,
  newFavorites: number[],
) => {
  const { data } = await api.put(API_ROUTES.favorite.update(userId), {
    favorites: newFavorites,
  });

  return data;
};

// // -------------- get favorites --------------

// export const getFavorites = async (userId: number) => {
//   const { data } = await api.get<ResFavorite>(API_ROUTES.favorite.get, {
//     params: {
//       "pagination[pageSize]": 999,
//       populate: ["product.images", "product.brand", "product.category"],
//       filters: {
//         user: {
//           $eq: userId,
//         },
//       },
//     },
//   });
//   return data.data;
// };

// // -------------- add to favorite --------------

// export const addToFavorite = async (userId: number, productDocId: string) => {
//   const { data } = await api.post(API_ROUTES.favorite.add, {
//     data: {
//       product: productDocId,
//       user: userId,
//     },
//   });
//   return data.data;
// };

// export const removeFromFavorite = async (productId: string) => {
//   const { data } = await api.delete(API_ROUTES.favorite.remove, {
//     params: {
//       productId,
//     },
//   });
//   return data;
// };

// --------------------------------------
