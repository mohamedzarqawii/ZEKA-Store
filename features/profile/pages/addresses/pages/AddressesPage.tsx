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

const AddressesPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: Addresses = [], isLoading: isAddressesLoading } =
    useGetAddresses(currentUser?.id);
  const { mutateAsync: handleUpdateAddress, isPending: isAddressUpdating } =
    useUpdateAddress();
  const { mutate: addMutate, isPending: isAdding } = useAddAddress();

  // type AddressFormValues = {
  //   address: string[];
  // };
  // const {
  //   values,
  //   errors,
  //   touched,
  //   handleSubmit,
  //   handleChange,
  //   setFieldValue,
  //   initialValues,
  //   dirty,
  // } = useFormik<AddressFormValues>({
  //   enableReinitialize: true,
  //   initialValues: {},
  //   validationSchema: updateProfileSchema,
  //   onSubmit: async (values) => {
  //     if (!currentUser) return;
  //     const changedValues = getChangedValues(values, initialValues);
  //     await handleUpdateProfile({
  //       userId: currentUser?.id,
  //       body: changedValues,
  //     });
  //   },
  // });

  return (
    <div>
      <div className="text-primary text-3xl">ADDRESSES</div>

      {/* contact information */}
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="flex justify-between">
          <div className="mb-7 text-md">Saved Addresses</div>
          <Button
            onClick={() => {
              router.push("addresses/add");
            }}
          >
            Add New
          </Button>
        </div>
        <div className="gap-4 grid grid-cols-3 w-full">
          {Addresses.map((Address, i) => {
            console.log(Address);
            return <AddressCard key={i} address={Address} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default AddressesPage;
