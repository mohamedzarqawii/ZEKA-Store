import {
  getFavorites,
  toggleFavorite,
} from "@/services/favoriteServices/favorite.service";
import { FavoriteItem } from "@/types/shop/favoriteItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetFavorites = (userId?: string) => {
  return useQuery<FavoriteItem[]>({
    queryKey: ["favorites", userId],
    enabled: !!userId,
    queryFn: () => getFavorites(userId!),
  });
};

interface FavoritesMutationParams {
  userId: string;
  productId: number;
}

export const useToggleFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, productId }: FavoritesMutationParams) => {
      return toggleFavorite(userId, productId);
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });

      if (res?.action === "added") {
        toast.success("Added to favorites successfully!", {
          position: "bottom-right",
          richColors: true,
        });
      } else if (res?.action === "deleted") {
        toast.success("Item removed from Favorites", {
          position: "bottom-right",
          richColors: true,
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update cart", {
        position: "bottom-right",
        richColors: true,
      });
    },
  });
};
