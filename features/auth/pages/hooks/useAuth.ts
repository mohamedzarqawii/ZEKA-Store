import { DeleteProductAdmin } from "@/services/adminServices/products.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth.service";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
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
