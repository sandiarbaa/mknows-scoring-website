"use client";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React from "react";

const KuotaPage = () => {
  const pathname = usePathname();
  return (
    <DashboardLayout hover={pathname}>
      <h1>Kuota Content</h1>
    </DashboardLayout>
  );
};

export default KuotaPage;
