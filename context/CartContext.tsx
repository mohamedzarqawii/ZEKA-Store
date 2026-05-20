"use client";

import { createContext, useContext, useState } from "react";
import { ProductType } from "@/types/product";

type CartContextType = {
  cart: ProductType[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ProductType[]>([]);

  function addToCart(product: ProductType, quantity: number) {
    setCart((prev) => [...prev, { ...product, quantity }]);
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id: number, quantity: number) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
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
