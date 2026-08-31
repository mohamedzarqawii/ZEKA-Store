import { supabase } from "@/lib/supabase";
import { AddressType, reqAddAdderess } from "@/types/address";

export const getAddresses = async (userId: string) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("userId", userId)
    .order("isDefault", { ascending: false });

  console.log(data);
  if (error) throw error;
  return data as unknown as AddressType[];
};

export const getAddressItem = async (addressId: string) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", addressId)
    .single();

  console.log(data);

  if (error) throw error;
  return data;
};

export const addAddress = async (userId: string, addressData: AddressType) => {
  const { data, error } = await supabase
    .from("addresses")
    .insert([
      {
        ...addressData,
        userId: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAddress = async (
  addressId: string,
  addressData: Partial<AddressType>,
) => {
  const { data, error } = await supabase
    .from("addresses")
    .update(addressData)
    .eq("id", addressId)
    .select();

  if (error) throw error;
  return data;
};

export const deleteAddress = async (addressId: string) => {
  const { data, error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .select();

  if (error) throw error;
  return data;
};
