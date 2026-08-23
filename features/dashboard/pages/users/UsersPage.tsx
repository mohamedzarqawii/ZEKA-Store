"use client";

import { DataTable } from "@/components/DataTable";
import React, { useEffect, useState } from "react";
import { columns, Users } from "./columns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  blockUserAdmin,
  deleteUserAdmin,
  getUsersAdmin,
  unblockUserAdmin,
  updateUserAdmin,
} from "@/services/adminServices/users.service";

const UsersPage = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    getUsersAdmin().then((res) => {
      setUsers(Array.isArray(res) ? res : res.data || []);
    });
  }, []);

  const handleToggleBlock = (userId: string, currentBlockedState: boolean) => {
    if (!userId) return;

    const apiCall = currentBlockedState
      ? unblockUserAdmin(userId)
      : blockUserAdmin(userId);

    apiCall.then(() => {
      toast.success(
        currentBlockedState
          ? "User activated successfully!"
          : "User blocked successfully!",
      );
      const newBlockedState = !currentBlockedState;
      setUsers((prevUsers: any[]) =>
        prevUsers.map((u) => {
          const isTargetUser =
            u.id == userId ||
            u.documentId == userId ||
            String(u.id) === String(userId) ||
            String(u.documentId) === String(userId);

          return isTargetUser ? { ...u, blocked: newBlockedState } : u;
        }),
      );
    });
  };
  const handleCreate = () => {
    console.log("CREATE USER WITH DOC_ID:", userId);
    if (!userId) return;
  };

  const handleDelete = (userId: string) => {
    deleteUserAdmin(userId).then((res) => {
      toast.success("User deleted successfully!");

      setUsers((prevProducts: any[]) =>
        prevProducts.filter((p) => p.id !== userId),
      );
    });
  };

  return (
    <div>
      <div className="text-primary text-3xl">USERS MANAGEMENT</div>

      <div className="mt-10">
        <DataTable
          columns={columns(handleToggleBlock, handleDelete)}
          data={users}
          createHref="/register"
          storageKey="usersView"
        />
      </div>
    </div>
  );
};

export default UsersPage;
