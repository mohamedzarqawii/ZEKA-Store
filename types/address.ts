import * as y from "yup";

export type AddressType = {
  id: string;
  userId: string;
  title: string;
  phone: string;
  phoneCode: string;
  isDefault: boolean;
  created_at: string;
  name: string;
  addressLine: string;
  addressDetails: string;
  zip: string;
  city: string;
  country: string;
};

export const AddAddressSchema = y.object({
  title: y.string().required(),
  phone: y.string().required(),
  phoneCode: y.string().required(),
  name: y.string().required(),
  addressLine: y.string().required(),
  addressDetails: y.string().required(),
  zip: y.string().required(),
  city: y.string().required(),
  country: y.string().required(),
});

export const UpdateAddressSchema = y.object({
  title: y.string().notRequired(),
  phone: y.string().notRequired(),
  phoneCode: y.string().notRequired(),
  name: y.string().notRequired(),
  addressLine: y.string().notRequired(),
  addressDetails: y.string().notRequired(),
  zip: y.string().notRequired(),
  city: y.string().notRequired(),
  country: y.string().notRequired(),
  isDefault: y.boolean(),
});

export type reqAddAdderess = y.InferType<typeof AddAddressSchema>;

export type reqUpdateAdderess = y.InferType<typeof UpdateAddressSchema>;
