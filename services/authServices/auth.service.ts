import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { supabase } from "@/lib/supabase";
import { ReqLoginType } from "@/types/auth/login";
import { ReqResetPassType, ResResetPassType } from "@/types/auth/resetPassword";
import { ReqSignUpType } from "@/types/auth/signup";
import { User } from "@/types/user";
import { toast } from "sonner";

// -------------- get current user --------------
export const getCurrentUser = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  return {
    ...user,
    ...profile,
  };
};

// -------------- login --------------

export const login = async ({ email, password }: ReqLoginType) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

// -------------- sign up --------------

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: ReqSignUpType) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

// -------------- delete account --------------

export const deleteAccount = async (userId: string) => {
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
