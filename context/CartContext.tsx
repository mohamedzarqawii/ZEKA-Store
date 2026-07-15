"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type CartItemType = ProductType & { quantity: number };

type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.cart) {
      setCart([]);
      return;
    }

    const loadedCart: CartItemType[] = currentUser.cart
      .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);

        if (!product) return null;

        return {
          ...product,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean) as CartItemType[];

    setCart(loadedCart);
  }, [currentUser]);

  const [cart, setCart] = useState<CartItemType[]>([]);

  function addToCart(product: ProductType, quantity: number) {
    if (currentUser) {
      setCart((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);

        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        return [...prev, { ...product, quantity }];
      });

      // addToUserCart(product.id, quantity);
    } else {
      toast.info("Plase login first", {
        position: "top-center",

        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
    }
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
    // removeFromUserCart(id);
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
