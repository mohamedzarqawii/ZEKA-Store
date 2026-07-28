import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";

// -------------- getProducts --------------

export const getProductsAdmin = async (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
) => {
  const { data } = await api.get(API_ROUTES.admin.products, {
    params: {
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
