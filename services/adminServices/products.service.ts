import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import {
  ReqCreateProductType,
  ResUpdateProductType,
} from "@/types/admin/product";
import { ProductType } from "@/types/product";

// -------------- getProducts --------------

export const getProductsAdmin = async (
  page: number = 1,
  categories: string[] = [],
  brands: string[] = [],
) => {
  const { data } = await api.get(API_ROUTES.admin.getProducts, {
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

// -------------- GetProduct --------------
export const getProductAdmin = async (productDocId: string) => {
  const { data } = await api.get<ResUpdateProductType>(
    API_ROUTES.shop.getProduct(productDocId),
  );

  return data.data;
};

// -------------- UpdatProduct --------------

export const UpdateProductAdmin = async (
  productDocId: string,
  updateData: Record<string, any> = {},
) => {
  const { data } = await api.put(API_ROUTES.admin.updateProduct(productDocId), {
    data: updateData,
  });
  return data;
};

// -------------- DeleteProduct --------------

export const DeleteProductAdmin = async (productDocId: string) => {
  const { data } = await api.delete(
    API_ROUTES.admin.deleteProduct(productDocId),
  );
  return data;
};

// -------------- CreateProduct --------------

export const CreateProductAdmin = async (body: ReqCreateProductType) => {
  const { data } = await api.post(API_ROUTES.admin.createProduct, {
    data: body,
  });
  return data;
};
