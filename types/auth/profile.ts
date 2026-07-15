import { error } from "console";
import * as y from "yup";

export const updateProfileSchema = y.object({
  firstName: y.string().notRequired(),
  lastName: y.string().notRequired(),
  gender: y.string().oneOf(["male", "female"]).notRequired(),
  birthday: y.string().notRequired(),
});

export type reqUpdateProfile = y.InferType<typeof updateProfileSchema>;
