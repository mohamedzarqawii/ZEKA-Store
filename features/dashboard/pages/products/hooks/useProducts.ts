import {
  DeleteProductAdmin,
  getProductAdmin,
  getProductsAdmin,
  UpdateProductAdmin,
} from "@/services/adminServices/products.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../columns";
import { getBrands, getCategories } from "@/services/shop.service";

export const useGetProducts = (page: number = 1) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProductsAdmin(page),
  });
};

export const useGetProduct = (productDocId: string) => {
  return useQuery({
    queryKey: ["product", productDocId],
    queryFn: () => getProductAdmin(productDocId),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productDocId: string) => DeleteProductAdmin(productDocId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productDocId,
      updatedData,
    }: {
      productDocId: string;
      updatedData: Partial<Product>;
    }) => UpdateProductAdmin(productDocId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export const useGetBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });
};
