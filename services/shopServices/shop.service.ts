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
  const params: Record<string, any> = {
    "pagination[page]": page,
    "pagination[pageSize]": 12,
    "filters[price][$gte]": minPrice,
    "filters[price][$lte]": maxPrice,
    populate: "*",
  };

  categories.forEach((catId, index) => {
    params[`filters[category][documentId][$in][${index}]`] = catId;
  });

  brands.forEach((brandId, index) => {
    params[`filters[brand][documentId][$in][${index}]`] = brandId;
  });

  const { data } = await api.get(API_ROUTES.shop.getProducts, { params });
  return data;
};

// -------------- get one product --------------

export const getShopProduct = async (productId: string) => {
  const { data } = await api.get(API_ROUTES.shop.getProduct(productId));

  return data.data;
};

// -------------- get related products by category --------------

export const getShopRelatedProductsByCategory = async (categoryId: number) => {
  const { data } = await api.get(
    API_ROUTES.shop.getRelatedProductsByCategory(categoryId),
  );
  return data.data;
};

// -------------- get related products by brand --------------

export const getShopRelatedProductsByBrand = async (brandId: number) => {
  const { data } = await api.get(
    API_ROUTES.shop.getRelatedProductsByBrand(brandId),
  );
  return data.data;
};

// -------------- get brands --------------

export const getShopBrands = async () => {
  const { data } = await api.get(API_ROUTES.shop.getBrands);
  return data.data;
};

// -------------- get categories --------------

export const getShopCategories = async () => {
  const { data } = await api.get(API_ROUTES.shop.getCategories);
  return data.data;
};

// ----------------- SupaBase -----------------

// ----------------- getSupaProducts -----------------

export const getSupaShopProducts = async (
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
    throw new Error(error.message);
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

// --------------------- getSupaShopProduct------------------------

export const getSupaShopProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("id", productId)
    .single();

  return data;
};

// --------------------- getSupaShopBrands------------------------

export const getSupaShopBrands = async () => {
  const { data } = await supabase.from("brands").select("name , id");

  return data;
};

// -------------- getSupaShopCategories --------------

export const getSupaShopCategories = async () => {
  const { data, error } = await supabase.from("categories").select("name , id");
  console.log(data);
  return data;
};

// -------------- getSupaShopRelatedProductsByCategory --------------

export const getSupaShopRelatedProductsByCategory = async (
  categoryId: number,
) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("category_id", categoryId);

  return data;
};

// -------------- getSupaShopRelatedProductsByBrand --------------

export const getSupaShopRelatedProductsByBrand = async (brandId: number) => {
  const { data, error } = await supabase
    .from("products")
    .select("* , category:categories(*) , brand:brands(*)")
    .eq("brand_id", brandId);

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

// <div className="flex flex-col flex-1 gap-10 w-full min-h-screen">
//   {/* 1 R - Header */}
//   <div className="flex sm:flex-row flex-col justify-between items-start sm:items-end gap-2">
//     <h1 className="font-bold text-primary text-2xl sm:text-3xl tracking-tight">
//       ALL PRODUCTS
//     </h1>
//     <div className="text-zinc-400 text-xs sm:text-sm">
//       Showing{" "}
//       <span className="font-medium text-primary">
//         {fromItem} - {toItem}
//       </span>{" "}
//       of{" "}
//       <span className="font-medium text-primary">{productsNumber}</span>{" "}
//       products
//     </div>
//   </div>

//   {/* 2 R - Flexible Grid */}
//   <div className="gap-4 sm:gap-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full">
//     {supaProducts?.length > 0 &&
//       supaProducts?.map((product: ProductType) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//   </div>
// </div>
