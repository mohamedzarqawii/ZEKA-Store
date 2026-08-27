import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { supabase } from "@/lib/supabase";
import {
  ReqCreateProductType,
  ResUpdateProductType,
} from "@/types/admin/product";
import { ProductType } from "@/types/product";

// -------------- getProducts --------------

export const getAdminProducts = async (
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

// -------------- GetProduct --------------

export const getAdminProduct = async (productId: string) => {
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

// -------------- UpdatProduct --------------

export const UpdateAdminProduct = async (
  productId: string,
  updatedData: Record<string, any> = {},
) => {
  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", productId)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- DeleteProduct --------------

export const DeleteAdminProduct = async (productId: string) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    throw error;
  }
};

// -------------- CreateProduct --------------

export const CreateAdminProduct = async (body: ReqCreateProductType) => {
  const { data, error } = await supabase.from("products").insert(body).select();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get categories --------------

export const getAdminCategories = async () => {
  const { data, error } = await supabase.from("categories").select("id, name");

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get brands --------------

export const getAdminBrands = async () => {
  const { data, error } = await supabase.from("brands").select("id , name");

  if (error) {
    throw error;
  }
  return data;
};
