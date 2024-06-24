"use client";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React from "react";

const PermintaanPage = () => {
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <DashboardLayout hover={pathname}>
      <h1>Permintaan Content</h1>
    </DashboardLayout>
  );
};

export default PermintaanPage;
