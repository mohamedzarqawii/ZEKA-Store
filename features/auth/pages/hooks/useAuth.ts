import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteAccount,
  getCurrentUser,
  login,
  signUp,
} from "@/services/auth.service";
import { ReqLoginType } from "@/types/auth/login";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/services/profile.service";
import { ReqSignUpType } from "@/types/auth/signup";
import { kebabCase, random } from "lodash";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ReqLoginType) => login(body),
    onSuccess: (res) => {
      localStorage.setItem("token", res.jwt);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Login Successfully", { position: "bottom-right" });
      router.push("/profile");
    },
    onError: (error) => {
      toast.error("Invalid email or password please register first!", {
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
      const username = kebabCase(
        `${firstName} ${lastName} ${random(1000, 9000)}`,
      );
      const res = await signUp({ username, email, password });

      localStorage.setItem("token", res.jwt);

      if (res.user?.id) {
        await updateProfile(res.user.id, { firstName, lastName });
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
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error?.message || "This Account Already Exists!",
        {
          position: "bottom-right",
        },
      );
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["currentUser"] });
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
      queryClient.clear();
      toast.success("Account deleted successfully");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error?.message || "Failed to delete account",
      );
    },
  });
};
