import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { ReqLoginType, ResLoginType } from "@/types/auth/login";
import { ReqResetPassType, ResResetPassType } from "@/types/auth/resetPassword";
import { ReqSignUpType, ResSignUpType } from "@/types/auth/signup";

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
