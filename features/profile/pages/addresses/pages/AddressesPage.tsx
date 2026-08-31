"use client";

import { Button } from "@/components/ui/button";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { useRouter } from "next/navigation";
import AddressCard from "../components/AddressCard";
import {
  useAddAddress,
  useDeleteAddress,
  useGetAddresses,
  useUpdateAddress,
} from "../hooks/useAddresses";
import { AddressType } from "@/types/address";

const AddressesPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: addresses = [], isLoading: isAddressesLoading } =
    useGetAddresses(currentUser?.id);

  const { mutate: addAddress, isPending: isAdding } = useAddAddress();

  return (
    <div>
      <div className="text-primary text-3xl">ADDRESSES</div>

      {/* contact information */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="flex justify-between">
          <div className="mb-10 text-md">Saved Addresses</div>
          <Button
            onClick={() => {
              router.push("addresses/add");
            }}
          >
            Add New
          </Button>
        </div>
        <div className="gap-4 grid grid-cols-2 w-full">
          {addresses.map((Address, i) => {
            console.log(Address);
            return <AddressCard key={i} address={Address} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default AddressesPage;
