"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import {
  deleteAccount,
  login,
  resetPassword,
  signUp,
} from "@/services/auth.service";
import { getProfile, updateProfile } from "@/services/profile.service";
import { kebabCase, random } from "lodash";
import { reqUpdateProfile } from "@/types/auth/profile";
import { ReqResetPassType } from "@/types/auth/resetPassword";
import { ReqLoginType } from "@/types/auth/login";

type AuthContextType = {
  currentUser: User | null;

  handleLogin: (data: ReqLoginType) => void;
  logout: () => void;
  handleSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => void;
  handleUpdateProfile: (data: reqUpdateProfile) => void;
  haneleDeleteAccount: () => void;
  addToUserFavorites: (productId: number) => void;
  removeFromUserFavorites: (productId: number) => void;
  // checkout: () => void;
  handleResetPassword: (data: ReqResetPassType) => void;
  // addToUserCart: (productId: number, quantity: number) => void;
  // removeFromUserCart: (productId: number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("currentUser");
  }, [currentUser]);

  // ---------------- Login ----------------
  function handleLogin(data: ReqLoginType) {
    login(data)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.jwt);

          getProfile().then((res) => {
            console.log(res);
            toast.success("Login Successfully", { position: "bottom-right" });
            setCurrentUser(res);
            router.push("/profile");
          });
        }
      })
      .catch((error) => {
        toast.error("Invalid email or password please register first!", {
          position: "bottom-right",
          action: {
            label: "Register",
            onClick: () => router.push("/register"),
          },
        });
      });
  }

  // ---------------- Signup ----------------
  function handleSignUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const username = kebabCase(
      `${firstName} ${lastName} ${random(1000, 9000)}`,
    );

    signUp({ username, email, password })
      .then((res) => {
        localStorage.setItem("token", res.jwt);
        const userId = res.user.id;

        console.log({
          username,

          email,

          password,
        });
        updateProfile(userId, { firstName, lastName }).then((res) => {
          toast.success("Account Created Successfully", {
            position: "bottom-right",
          });
          setCurrentUser(res);

          router.push("/profile");
        });
      })
      .catch((res) => {
        toast.error(res.error.message || "This Account Already Exists!", {
          position: "bottom-right",
        });
        return;
      });
  }

  // ---------------- Logout ----------------
  function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setCurrentUser(null);
    router.push("/login");
  }

  // ---------------- Update Profile ----------------

  function handleUpdateProfile(data: reqUpdateProfile) {
    if (!currentUser) return;

    updateProfile(currentUser.id, data)
      .then((res) => {
        setCurrentUser({
          ...res,
          cart: currentUser.cart,
          favorite: currentUser.favorite,
        });

        toast.success("Profile Updated Successfully !", {
          position: "bottom-right",
        });
      })
      .catch((res) => {
        toast.error("Could not update profile, please try again later.");
      });
  }

  // ---------------- Delete Account ----------------
  function haneleDeleteAccount() {
    if (!currentUser) return;

    deleteAccount(currentUser.id)
      .then((res) => {
        logout();
        toast.success("Your account has been deleted permanently.", {
          position: "bottom-right",
        });
      })
      .catch(() => {
        toast.error("Could not delete account, please try again later.");
      });
  }

  // ---------------- Reset Password ----------------

  function handleResetPassword(data: ReqResetPassType) {
    if (!currentUser) return;

    resetPassword(data)
      .then((res) => {
        toast.success("Your Password has been changed successfully.", {
          position: "bottom-right",
        });
      })
      .catch(() => {
        toast.error("Current password is not correct! Try agian.");
      });
    // deleteAccount(currentUser.id)
    //   .then((res) => {
    //     logout();
    // toast.success("Your account has been deleted permanently.", {
    //   position: "bottom-right",
    // });
    //   })
    //   .catch(() => {
    //     toast.error("Could not delete account, please try again later.");
    //   });
  }

  // ---------------- Add To User Favorites (Toggle) ----------------
  async function addToUserFavorites(productId: number) {
    if (!currentUser) {
      toast.warning("Please login to add items to your favorites", {
        position: "bottom-right",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired, please login again");
      return;
    }

    try {
      const currentFavorites = currentUser.favorite || [];
      const isExisting = currentFavorites.some(
        (item) => item.productId === productId,
      );

      let updatedFavorites;
      let isAdded = false;

      if (isExisting) {
        updatedFavorites = currentFavorites.filter(
          (item) => item.productId !== productId,
        );
        isAdded = false;
      } else {
        updatedFavorites = [...currentFavorites, { productId }];
        isAdded = true;
      }

      const response = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ favorites: updatedFavorites }),
      });

      if (!response.ok) throw new Error("Failed to update favorites");

      setCurrentUser({ ...currentUser, favorite: updatedFavorites });
      toast.success(
        isAdded ? "Added to favorites!" : "Removed from favorites",
        { position: "bottom-right" },
      );
    } catch (error) {
      console.error("Favorites error:", error);
      toast.error("Could not update favorites.");
    }
  }

  // ---------------- Remove From User Favorites ----------------
  async function removeFromUserFavorites(productId: number) {
    if (!currentUser) return;
    // استدعاء نفس منطق الفلترة المباشر لحذفه دون الحاجة لأكواد LocalStorage القديمة
    await addToUserFavorites(productId);
  }

  // // ---------------- Add To User Cart ----------------
  // async function addToUserCart(productId: number, quantity: number) {
  //   if (!currentUser) {
  //     toast.warning("Please login to add items to your cart", {
  //       position: "bottom-right",
  //     });
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Session expired, please login again");
  //     return;
  //   }

  //   try {
  //     const currentCart = currentUser.cart || [];
  //     const existingItemIndex = currentCart.findIndex(
  //       (item) => item.id === productId,
  //     );

  //     let updatedCart;
  //     if (existingItemIndex > -1) {
  //       updatedCart = currentCart.map((item, index) =>
  //         index === existingItemIndex
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item,
  //       );
  //     } else {
  //       updatedCart = [...currentCart, { productId, quantity }];
  //     }

  //     const response = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ cart: updatedCart }),
  //     });

  //     if (!response.ok) throw new Error("Failed to update cart");

  //     handleUserUpdate({ ...currentUser, cart: updatedCart });
  //     toast.success("Item added to cart successfully!", {
  //       position: "bottom-right",
  //     });
  //   } catch (error) {
  //     console.error("Add to cart error:", error);
  //     toast.error("Could not add item to cart.");
  //   }
  // }

  // // ---------------- Remove From User Cart ----------------
  // async function removeFromUserCart(productId: number) {
  //   if (!currentUser) {
  //     toast.warning("Please login to remove items from your cart", {
  //       position: "bottom-right",
  //     });
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Session expired, please login again");
  //     return;
  //   }

  //   try {
  //     const currentCart = currentUser.cart || [];
  //     const updatedCart = currentCart.filter(
  //       (item) => !(item.id === productId),
  //     );

  //     const response = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ cart: updatedCart }),
  //     });

  //     if (!response.ok) throw new Error("Failed to remove item from cart");

  //     handleUserUpdate({ ...currentUser, cart: updatedCart });
  //     toast.success("Item removed from cart", { position: "bottom-right" });
  //   } catch (error) {
  //     console.error("Remove from cart error:", error);
  //     toast.error("Could not remove item.");
  //   }
  // }

  // ---------------- Checkout ----------------
  // function checkout() {
  //   if (!currentUser) return;

  //   const cart = currentUser.cart || [];
  //   const currentOrders = currentUser.orders || [];

  //   const orders = [
  //     ...currentOrders,
  //     {
  //       id: Date.now().toString(),
  //       createdAt: new Date(),
  //       products: cart,
  //     },
  //   ].sort((a, b) => b.id.localeCompare(a.id));

  //   const newUser: User = {
  //     ...currentUser,
  //     orders: orders,
  //     cart: [],
  //   };

  //   handleUserUpdate(newUser);
  // }

  // ---------------- Update Quantity  ----------------

  // async function updateQuantity(productId: number, quantity: number) {
  //   // setCart((prev) =>
  //   //   prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
  //   // );

  //   if (!currentUser) {
  //     toast.warning("Please login to add items to your cart", {
  //       position: "bottom-right",
  //     });
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Session expired, please login again");
  //     return;
  //   }

  //   try {
  //     const currentCart = currentUser.cart || [];
  //     const existingItemIndex = currentCart.findIndex(
  //       (item) => item.productId === productId,
  //     );

  //     let updatedCart;
  //     if (existingItemIndex > -1) {
  //       updatedCart = currentCart.map((item, index) =>
  //         index === existingItemIndex
  //           ? { ...item, quantity: item.quantity + quantity }
  //           : item,
  //       );
  //     } else {
  //       updatedCart = [...currentCart, { productId, quantity }];
  //     }

  //     const response = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ cart: updatedCart }),
  //     });

  //     if (!response.ok) throw new Error("Failed to update cart");

  //     handleUserUpdate({ ...currentUser, cart: updatedCart });
  //     toast.success("Item added to cart successfully!", {
  //       position: "bottom-right",
  //     });
  //   } catch (error) {
  //     console.error("Add to cart error:", error);
  //     toast.error("Could not add item to cart.");
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogin,
        logout,
        handleSignUp,
        handleUpdateProfile,
        haneleDeleteAccount: haneleDeleteAccount,
        addToUserFavorites,
        removeFromUserFavorites,
        handleResetPassword,
        // addToUserCart,
        // removeFromUserCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
