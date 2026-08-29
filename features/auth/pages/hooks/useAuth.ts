import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  forgotPassword,
  getCurrentUser,
  login,
  resetPassword,
  signUp,
} from "@/services/authServices/auth.service";
import { ReqLoginType } from "@/types/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReqResetPassType } from "@/types/auth/resetPassword";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";
import { reqForgotPassword } from "@/types/auth/forgotPassword";
import { deleteAccount } from "@/services/authServices/deleteAccount.service";

const AUTH_TOKEN_CHANGED_EVENT = "auth-token-changed";

const notifyAuthTokenChanged = () => {
  window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT));
};

type ApiError = {
  response?: {
    data?: {
      error?: {
        status?: string;
        message?: string;
      };
    };
  };
  error?: {
    message?: string;
  };
  message?: string;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) return fallback;

  const apiError = error as ApiError;

  return (
    apiError.response?.data?.error?.message ??
    apiError.error?.message ??
    apiError.message ??
    fallback
  );
};
export const useGetCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ReqLoginType) => login(body),
    onSuccess: (res) => {
      notifyAuthTokenChanged();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Login Successfully", { position: "bottom-right" });
      router.push("/profile");
    },
    onError: (error: unknown) => {
      toast.error("Invalid email or password, register first", {
        position: "bottom-right",
        action: {
          label: "Register",
          onClick: () => router.push("/register"),
        },
      });
    },
  });
};

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
    }: SignUpParams) => {
      // const username = kebabCase(
      //   `${firstName} ${lastName} ${random(1000, 9000)}`,
      // );
      return signUp({ firstName, lastName, email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Account Created Successfully", {
        position: "bottom-right",
      });
      router.push("/profile");
    },
    onError: () => {
      toast.error("This account already exists, please login", {
        position: "bottom-right",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async () => {
    const { error } = await supabase.auth.signOut();
    notifyAuthTokenChanged();
    queryClient.clear();
    router.push("/login");
  };
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: reqForgotPassword) => forgotPassword(email),
    onSuccess: (_, variables) => {
      toast.success(`Please check your email ${variables.email}`, {
        position: "bottom-right",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send recovery email. Please try again.";

      toast.error(message, {
        position: "bottom-right",
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (password: string) => resetPassword(password),
    onSuccess: () => {
      toast.success("Password updated successfully!", {
        position: "bottom-right",
      });
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error("Failed to update password", {
        position: "bottom-right",
      });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await deleteAccount();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Account deleted successfully.");
      router.push("/login");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete account.");
    },
  });
};
