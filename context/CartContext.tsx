"use client";

import { createContext, useContext, useState } from "react";
import { ProductType } from "@/types/product";
export type CartItemType = ProductType & { quantity: number; size?: number };

type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: ProductType, size: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateSize: (id: number, size: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  function addToCart(product: ProductType, size: number, quantity: number) {
    setCart((prev) => {
      // بنشيك إذا المنتج موجود بنفس الـ ID ونفس الـ Size مسبقاً
      const existingItem = prev.find(
        (item) => item.id === product.id && item.size === size,
      );

      if (existingItem) {
        // إذا موجود، بس بنزيد الكمية
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // إذا مش موجود، بنضيفه كعنصر جديد مع الـ size والـ quantity
      return [...prev, { ...product, size, quantity }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id: number, quantity: number) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function updateSize(id: number, size: number) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, size } : item)),
    );
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, updateSize }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be inside CartProvider");
  }

  return context;
}
