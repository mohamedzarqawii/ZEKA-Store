"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/products");
  }, []);
  return <div></div>;
};

export default AdminPage;
