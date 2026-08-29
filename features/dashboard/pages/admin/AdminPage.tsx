"use client";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/products");
  }, []);
  return <div></div>;
};

export default AdminPage;
