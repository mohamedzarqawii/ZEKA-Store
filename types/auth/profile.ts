import * as y from "yup";

export const updateProfileSchema = y.object({
  first_name: y.string().notRequired(),
  last_name: y.string().notRequired(),
  gender: y.string().oneOf(["male", "female"]).notRequired(),
  birthday: y.string().notRequired(),
});

export type reqUpdateProfile = y.InferType<typeof updateProfileSchema>;
