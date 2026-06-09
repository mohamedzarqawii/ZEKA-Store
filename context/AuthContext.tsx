"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";

type AuthContextType = {
  currentUser: User | null;
  login: (emailORPhonenNumber: string, password: string) => void;
  logout: () => void;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber?: string,
  ) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  password: string;
  setPassword: (password: string) => void;
  updateProfile: (newFirstName?: string, newLastName?: string) => void;
  deleteAccount: () => void;
  addToUserCart: (
    productId: number,

    quantity: number,

    size?: number,
  ) => void;

  removeFromUserCart: (productId: number, size?: number) => void;
  addToUserFavorites: (productId: number) => void;
  removeFromUserFavorites: (productId: number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  function login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (user: any) =>
        (user.email === email.trim() || user.phoneNumber === email.trim()) &&
        user.password === password,
    );
    if (!foundUser) {
      alert("Invalid email or phone number or password please register first!");
      return;
    } else if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setCurrentUser(foundUser);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  function signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber?: string,
  ) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((user: any) => user.email === email.trim());
    if (existingUser) {
      alert("Email already exists");
      return;
    } else if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      wishlist: [],
      cart: [],
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Account Created Successfully");
  }

  function updateProfile(newFirstName?: string, newLastName?: string) {
    if (!currentUser) {
      alert("No user is currently logged in");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: any) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          firstName: newFirstName ?? user.firstName,
          lastName: newLastName ?? user.lastName,
        };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        firstName: newFirstName ?? currentUser.firstName,
        lastName: newLastName ?? currentUser.lastName,
      }),
    );
    alert("Profile updated successfully");
  }

  function deleteAccount() {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(
      (user: any) => user.email !== currentUser.email,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    logout();
    alert("Account deleted successfully");
  }

  function addToUserCart(productId: number, quantity: number, size?: number) {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: User) => {
      if (user.id !== currentUser.id) return user;

      const existingItem = user.cart?.find(
        (item) => item.productId === productId && item.size === size,
      );

      if (existingItem) {
        return {
          ...user,
          cart: user.cart?.map((item) =>
            item.productId === productId && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item,
          ),
        };
      }

      return {
        ...user,
        cart: [
          ...(user.cart || []),
          {
            productId,
            quantity,
            size,
          },
        ],
      };
    });

    const updatedCurrentUser = updatedUsers.find(
      (u: User) => u.id === currentUser.id,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    setCurrentUser(updatedCurrentUser);
  }

  function removeFromUserCart(productId: number) {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((user: User) => {
      if (user.id !== currentUser.id) return user;

      return {
        ...user,
        cart: user.cart?.filter((item) => !(item.productId === productId)),
      };
    });

    const updatedCurrentUser = updatedUsers.find(
      (u: User) => u.id === currentUser.id,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    setCurrentUser(updatedCurrentUser);
  }

  function addToUserFavorites(productId: number) {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((user: User) => {
      if (user.id !== currentUser.id) return user;

      const existingItem = user.wishlist?.find(
        (item) => item.productId === productId,
      );

      if (existingItem) return user;

      return {
        ...user,
        wishlist: [...(user.wishlist || []), { productId }],
      };
    });

    const updatedCurrentUser = updatedUsers.find(
      (u: User) => u.id === currentUser.id,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    setCurrentUser(updatedCurrentUser);
  }

  function removeFromUserFavorites(productId: number) {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((user: User) => {
      if (user.id !== currentUser.id) return user;

      return {
        ...user,
        wishlist: user.wishlist?.filter(
          (item) => !(item.productId === productId),
        ),
      };
    });

    const updatedCurrentUser = updatedUsers.find(
      (u: User) => u.id === currentUser.id,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    setCurrentUser(updatedCurrentUser);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        login,
        logout,
        signup: signup,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        updateProfile,
        deleteAccount,
        addToUserCart,
        removeFromUserCart,
        addToUserFavorites,
        removeFromUserFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return context;
}
