import {
  addAddress,
  deleteAddress,
  getAddresses,
  getAddressItem,
  updateAddress,
} from "@/services/addressesServices/addresses.service";
import { AddressType } from "@/types/address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAddresses = (userId?: string) => {
  return useQuery<AddressType[]>({
    queryKey: ["addresses", userId],
    enabled: !!userId,
    queryFn: () => getAddresses(userId!),
  });
};

export const useGetAddress = (addressId: string) => {
  return useQuery<AddressType>({
    queryKey: ["addressItem", addressId],
    queryFn: () => getAddressItem(addressId),
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAddress: AddressType) => addAddress(newAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      addressId,
      addressData,
    }: {
      addressId: string;
      addressData: Partial<AddressType>;
    }) => updateAddress(addressId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address Updated Successfully !", {
        position: "bottom-right",
      });
    },
    onError: () => {
      toast.error("Could not update Address, please try again later.");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
