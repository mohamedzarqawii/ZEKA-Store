import { supabase } from "@/lib/supabase";
import { FavoriteItem } from "@/types/shop/favoriteItem";

export const getFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorite_items")
    .select(
      `id,
      userId,
      productId,
      product:products (*, category:categories(*) , brand:brands(*))
    `,
    )
    .eq("userId", userId);

  if (error) {
    throw error;
  }

  return data as unknown as FavoriteItem[];
};

export const toggleFavorite = async (userId: string, productId: number) => {
  const { data: existingItem } = await supabase
    .from("favorite_items")
    .select("id")
    .eq("userId", userId)
    .eq("productId", productId)
    .maybeSingle();

  if (!existingItem) {
    const { data, error } = await supabase
      .from("favorite_items")
      .insert({ userId, productId })
      .select();

    if (error) throw error;
    return { action: "added", data };
  } else {
    const { error } = await supabase
      .from("favorite_items")
      .delete()
      .eq("id", existingItem.id);

    if (error) throw error;
    return { action: "deleted" };
  }
};
