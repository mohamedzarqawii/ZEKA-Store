import {
  getProfile,
  updateProfile,
} from "@/services/profileServices/profile.service";
import { reqUpdateProfile } from "@/types/auth/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UpdateProfileParams {
  userId: number;
  body: reqUpdateProfile;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, body }: UpdateProfileParams) => {
      return updateProfile(userId, body);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Profile Updated Successfully !", {
        position: "bottom-right",
      });
    },
    onError: (error: unknown) => {
      toast.error("Could not update profile, please try again later.");
    },
  });
};

export const useGetProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return getProfile(userId);
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: unknown) => {
      toast.error("Could not get profile");
    },
  });
};
