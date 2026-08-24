import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { ReqLoginType, ResLoginType } from "@/types/auth/login";
import { ReqResetPassType, ResResetPassType } from "@/types/auth/resetPassword";
import { ReqSignUpType, ResSignUpType } from "@/types/auth/signup";
import { User } from "@/types/user";
import { useState } from "react";

// -------------- get current user --------------

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem("currentUser");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("currentUser");
    return null;
  }
};

const currentUser = getCurrentUser();

console.log(currentUser);
// -------------- login --------------
export const login = async (body: ReqLoginType) => {
  const { data } = await api.post<ResLoginType>(API_ROUTES.auth.login, body);
  return data;
};

// -------------- sign up --------------
export const signUp = async (body: ReqSignUpType) => {
  const { data } = await api.post<ResSignUpType>(API_ROUTES.auth.signup, body);
  return data;
};

// -------------- delete account --------------

export const deleteAccount = async (userId: number) => {
  const { data } = await api.delete(API_ROUTES.auth.deleteAccount(userId));
  return data;
};

// -------------- reset password --------------

export const resetPassword = async (body: ReqResetPassType) => {
  const { data } = await api.post<ResResetPassType>(
    API_ROUTES.auth.resetPassword,
    body,
  );
  return data;
};
