import * as y from "yup";
import { ResLoginType } from "./login";

export const resetPassSchema = y.object({
  currentPassword: y.string().required("Current password is requaired"),
  password: y
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirmation: y
    .string()
    .required("Confirmation password is required")
    .oneOf([y.ref("password")], "Passwords must match"),
});

export type ReqResetPassType = y.InferType<typeof resetPassSchema>;

export type ResResetPassType = ResLoginType;
