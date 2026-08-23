import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { reqUpdateProfile } from "@/types/auth/profile";
// -------------- update profile --------------

export const updateProfile = async (userId: number, body: reqUpdateProfile) => {
  const { data } = await api.put(API_ROUTES.profile.update(userId), body, {
    params: {},
  });
  return data;
};

// -------------- get profile --------------
export const getProfile = async () => {
  const { data } = await api.get(API_ROUTES.profile.get, {
    params: {
      populate: "role",
    },
  });

  return data;
};
