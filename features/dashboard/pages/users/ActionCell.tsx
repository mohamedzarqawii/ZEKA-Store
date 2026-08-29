"use client";

import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Users } from "./columns";

interface ActionCellProps {
  user: Users;
  onDelete: (documentId: string) => void;
  toggleBlock: (userId: string, currentStatus: boolean) => void;
}

export const ActionCell = ({
  user,
  toggleBlock,
  onDelete,
}: ActionCellProps) => {
  const userId = user.id || user.documentId;

  return (
    <div className="flex justify-end items-center gap-2">
      {/* Block Button */}

      <Button
        variant="outline"
        onClick={() => toggleBlock(userId, user.blocked)}
        size="icon-sm"
        className={`border cursor-pointer ${
          user.blocked
            ? "border-border hover:bg-emerald-500/10 text-emerald-500"
            : "border-border hover:bg-destructive/10 text-destructive"
        }`}
        title={user.blocked ? "Unblock User" : "Block User"}
      >
        {user.blocked ? (
          <ShieldCheck />
        ) : (
          <ShieldX className="text-destructive hover:cursor-pointer" />
        )}
      </Button>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onDelete(user.id)}
        className="p-2 border border-border cursor-pointer"
      >
        <IconTrash className="text-destructive hover:cursor-pointer" />
      </Button>
    </div>
  );
};
