"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SecurityInfomationCard from "@/features/profile/components/securityInfomationCard";
import {
  useDeleteAccount,
  useGetCurrentUser,
  useResestPassword,
} from "@/features/auth/pages/hooks/useAuth";

const SecuritySettingsPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const { mutate: deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccount();

  const handleDelete = () => {
    if (currentUser?.id) {
      deleteAccount(currentUser.id);
    }
  };

  return (
    <div>
      <div className="text-primary text-3xl">SECURITY SETTINGS</div>
      <div className="mt-10">
        <SecurityInfomationCard />

        <div className="flex justify-between items-center bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
          <div className="flex flex-col gap-2">
            <div className="text-primary text-xl">Account Deletion</div>
            <div className="text-xs">
              We are sad to see you go, but hope to see you again!
            </div>
          </div>

          {/* ------------- */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="justify-start p-6 rounded-lg outline-none text-md"
              >
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="md">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <div className="flex flex-col gap-3">
                  <AlertDialogTitle>Delete Your Account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="text-destructive">
                      Deleting your account
                    </span>{" "}
                    is permanent. All your profile information, orders,
                    favorites items, and account data will be removed and cannot
                    be restored.
                  </AlertDialogDescription>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
export default SecuritySettingsPage;
