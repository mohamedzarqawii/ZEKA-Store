import { Button } from "@/components/ui/button";
import { AddressType } from "@/types/address";
import { IconTrash } from "@tabler/icons-react";
import { Edit, Loader2, Pin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteAddress } from "../hooks/useAddresses";

const AddressCard = ({ address }: { address: AddressType }) => {
  const router = useRouter();
  const { mutate: handleDelete, isPending: isDeleting } = useDeleteAddress();

  return (
    <div className="bg-card px-4 py-5 border border-border rounded-md w-full">
      <div className="flex flex-col gap-3 text-primary">
        <div className="flex justify-between items-center my-auto mb-1.5">
          <div className="capitalize">{address.title}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              className="p-2 border border-border cursor-pointer"
              onClick={() => {
                handleDelete(address.id);
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 text-destructive animate-spin" />
              ) : (
                <IconTrash className="w-4 h-4 text-destructive hover:cursor-pointer" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              className="p-2 border border-border cursor-pointer"
              onClick={() => {
                router.push(`addresses/${address.id}/edit`);
              }}
              disabled={isDeleting}
            >
              <Edit className="w-4 h-4" />
            </Button>

            {address.isDefault ? (
              <Button
                disabled={address.isDefault}
                variant={"outline"}
                size={"sm"}
              >
                Default address
              </Button>
            ) : (
              <Button
                variant="outline"
                size={"icon-sm"}
                className="p-2 border border-border cursor-pointer"
              >
                <Pin className="w-4 h-4 hover:cursor-pointer" />
              </Button>
            )}
          </div>
        </div>
        <div className="bg-primary mb-4 w-full h-px"></div>
      </div>
      <div className="flex flex-col gap-2 text-muted-foreground text-sm">
        <div className="text-primary">{address.name}</div>
        <div>{address.addressLine}</div>
        <div>{address.addressDetails}</div>
        <div>
          {address.country} - {address.city}
        </div>
        <div>
          <span className="text-foreground">Phone Number :</span>{" "}
          {address.phone}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
