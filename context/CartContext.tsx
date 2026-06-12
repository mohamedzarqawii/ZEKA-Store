"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";

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
  const { currentUser } = useAuth();
  const { addToUserCart, removeFromUserCart } = useAuth();

  useEffect(() => {
    if (!currentUser?.cart) {
      setCart([]);
      return;
    }

    const loadedCart: CartItemType[] = currentUser.cart
      .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);

        if (!product) return null;

        return {
          ...product,
          quantity: cartItem.quantity,
          size: cartItem.size,
        };
      })
      .filter(Boolean) as CartItemType[];

    setCart(loadedCart);
  }, [currentUser]);

  const [cart, setCart] = useState<CartItemType[]>([]);

  function addToCart(product: ProductType, size: number, quantity: number) {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.size === size,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { ...product, size, quantity }];
    });

    addToUserCart(product.id, quantity, size);
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
    removeFromUserCart(id);
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
