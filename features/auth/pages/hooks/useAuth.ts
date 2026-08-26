import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteAccount,
  getCurrentUser,
  login,
  resetPassword,
  signUp,
} from "@/services/authServices/auth.service";
import { ReqLoginType } from "@/types/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/profileServices/profile.service";
import { kebabCase, random } from "lodash";
import { ReqResetPassType } from "@/types/auth/resetPassword";

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
  const [token, setToken] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
      setIsTokenReady(true);
    };

    syncToken();
    window.addEventListener("storage", syncToken);
    window.addEventListener(AUTH_TOKEN_CHANGED_EVENT, syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener(AUTH_TOKEN_CHANGED_EVENT, syncToken);
    };
  }, []);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    enabled: isTokenReady && !!token,
    retry: false,
  });

  return {
    ...query,
    hasToken: !!token,
    isLoading: !isTokenReady || (!!token && query.isLoading),
    isTokenReady,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ReqLoginType) => login(body),
    onSuccess: (res) => {
      localStorage.setItem("token", res.jwt);
      notifyAuthTokenChanged();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Login Successfully", { position: "bottom-right" });
      router.push("/profile");
    },
    onError: (error: unknown) => {
      const status =
        (error as ApiError).response?.data?.error?.status ||
        (error as ApiError).response?.data?.error?.status;

      switch (Number(status)) {
        case 400:
          toast.error("Invalid email or password, register first", {
            position: "bottom-right",
            action: {
              label: "Register",
              onClick: () => router.push("/register"),
            },
          });
          break;
        case 401:
          toast.error("Unauthorized access", { position: "bottom-right" });
          break;
      }
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
      const username = kebabCase(
        `${firstName} ${lastName} ${random(1000, 9000)}`,
      );
      const res = await signUp({ username, email, password });

      localStorage.setItem("token", res.jwt);
      notifyAuthTokenChanged();

      if (res.user?.id) {
        await updateProfile(res.user.id, { firstName, lastName }).catch(() => {
          (toast.error("Failed to load profile!"),
            {
              position: "bottom-right",
            });
        });
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Account Created Successfully", {
        position: "bottom-right",
      });
      router.push("/profile");
    },
    onError: (error: string) => {
      const status =
        (error as ApiError).response?.data?.error?.status ||
        (error as ApiError).response?.data?.error?.status;

      switch (Number(status)) {
        case 400:
          toast.error("This account already exist, please login", {
            position: "bottom-right",
            action: {
              label: "Login",
              onClick: () => router.push("/login"),
            },
          });
          break;
        case 401:
          toast.error(error, { position: "bottom-right" });
          break;
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    localStorage.removeItem("token");
    notifyAuthTokenChanged();
    queryClient.clear();
    router.push("/login");
  };
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (userId: number) => deleteAccount(userId),
    onSuccess: () => {
      localStorage.removeItem("token");
      notifyAuthTokenChanged();
      queryClient.clear();
      toast.success("Account deleted successfully");
      router.push("/login");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete account"));
    },
  });
};

export const useResestPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ReqResetPassType) => resetPassword(body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Your Password has been changed successfully.", {
        position: "bottom-right",
      });
    },
    onError: (error: unknown) => {
      toast.error("Current password is not correct! Try agian.");

      // const status =
      //   (error as ApiError).response?.data?.error?.status ||
      //   (error as ApiError).response?.data?.error?.status;
      // switch (Number(status)) {
      //   case 400:
      //     toast.error("Invalid email or password, register first", {
      //       position: "bottom-right",
      //       action: {
      //         label: "Register",
      //         onClick: () => router.push("/register"),
      //       },
      //     });
      //     break;
      //   case 401:
      //     toast.error("Unauthorized access", { position: "bottom-right" });
      //     break;
      // }
    },
  });
};
