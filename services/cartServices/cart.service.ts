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
      product:products (
        id,
        name,
        description,
        price,
        stock,
        images
      )
    `,
    )
    .eq("userId", userId);

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
      // إذا كان موجوداً: زيادة الكمية بـ 1
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id)
        .select();

      if (error) throw error;
      return { action: "updated", data };
    } else {
      // إذا لم يكن موجوداً: إضافته بقدر كمية 1
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

// export const toggleCart = async (
//   userId: string,
//   productId: number,
//   action: "add" | "decrease" = "add",
// ) => {
//   const { data: existingItem, error: fetchError } = await supabase
//     .from("cart_items")
//     .select("id, quantity, product:products (stock)")
//     .eq("userId", userId)
//     .eq("productId", productId)
//     .maybeSingle();

//   if (fetchError) throw fetchError;

//   // استخراج الـ stock بأمان ومعالجة أنواع البيانات
//   const rawProduct = existingItem?.product as unknown as
//     | { stock: number }
//     | { stock: number }[]
//     | null;
//   const currentStock = Array.isArray(rawProduct)
//     ? rawProduct[0]?.stock
//     : rawProduct?.stock;

//   if (action === "add") {
//     if (existingItem) {
//       // التأكد من وجود مخزون كافي قبل الإضافة
//       if (currentStock !== undefined && currentStock <= 0) {
//         throw new Error("Out of stock");
//       }

//       // 1. زيادة الكمية في السلة
//       const { data, error } = await supabase
//         .from("cart_items")
//         .update({ quantity: existingItem.quantity + 1 })
//         .eq("id", existingItem.id)
//         .select();

//       if (error) throw error;

//       // 2. تحديث الـ stock في جدول المنتجات
//       if (currentStock !== undefined) {
//         const { error: updateError } = await supabase
//           .from("products")
//           .update({ stock: currentStock - 1 })
//           .eq("id", productId);

//         if (updateError) throw updateError;
//       }

//       return { action: "updated", data };
//     } else {
//       // تجلب المخزون الحالي للمنتج إذا لم يكن موجوداً بالسلة اصلاً
//       const { data: productData, error: productError } = await supabase
//         .from("products")
//         .select("stock")
//         .eq("id", productId)
//         .single();

//       if (productError) throw productError;
//       if (productData.stock <= 0) throw new Error("Out of stock");

//       // 1. إضافة المنتج للسلة
//       const { data, error } = await supabase
//         .from("cart_items")
//         .insert({ userId, productId, quantity: 1 })
//         .select();

//       if (error) throw error;

//       // 2. تنقيص الـ stock للمنتج المضاف لأول مرة
//       const { error: updateError } = await supabase
//         .from("products")
//         .update({ stock: productData.stock - 1 })
//         .eq("id", productId);

//       if (updateError) throw updateError;

//       return { action: "added", data };
//     }
//   }

//   if (action === "decrease") {
//     if (!existingItem) return null;

//     if (existingItem.quantity === 1) {
//       // 1. حذف العنصر من السلة
//       const { error } = await supabase
//         .from("cart_items")
//         .delete()
//         .eq("id", existingItem.id);

//       if (error) throw error;

//       // 2. إرجاع الـ stock للمنتج (+1)
//       if (currentStock !== undefined) {
//         const { error: updateError } = await supabase
//           .from("products")
//           .update({ stock: currentStock + 1 })
//           .eq("id", productId);

//         if (updateError) throw updateError;
//       }

//       return { action: "deleted" };
//     } else {
//       // 1. تنقيص الكمية في السلة
//       const { data, error } = await supabase
//         .from("cart_items")
//         .update({ quantity: existingItem.quantity - 1 })
//         .eq("id", existingItem.id)
//         .select();

//       if (error) throw error;

//       // 2. إرجاع الـ stock للمنتج (+1)
//       if (currentStock !== undefined) {
//         const { error: updateError } = await supabase
//           .from("products")
//           .update({ stock: currentStock + 1 })
//           .eq("id", productId);

//         if (updateError) throw updateError;
//       }

//       return { action: "updated", data };
//     }
//   }
// };
