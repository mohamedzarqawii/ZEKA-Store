import { supabase } from "@/lib/supabase";
import { CartItemType } from "@/types/cartItemType";

export const getCart = async (userId: string) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `id,
      userId,
      productId,
      quantity,
      product:products (*, category:categories(*) , brand:brands(*))
    `,
    )
    .eq("userId", userId)
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data as unknown as CartItemType[];
};

export const toggleCart = async (
  userId: string,
  productId: number,
  action: "add" | "decrease" = "add",
) => {
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("userId", userId)
    .eq("productId", productId)
    .maybeSingle();

  if (action === "add") {
    if (existingItem) {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id)
        .select();

      if (error) throw error;
      return { action: "updated", data };
    } else {
      const { data, error } = await supabase
        .from("cart_items")
        .insert({ userId, productId, quantity: 1 })
        .select();

      if (error) throw error;
      return { action: "added", data };
    }
  }

  if (action === "decrease") {
    if (!existingItem) return null;

    if (existingItem.quantity === 1) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", existingItem.id);

      if (error) throw error;
      return { action: "deleted" };
    } else {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity - 1 })
        .eq("id", existingItem.id)
        .select();

      if (error) throw error;
      return { action: "updated", data };
    }
  }
};
