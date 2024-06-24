"use client";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React from "react";

const LaporanPage = () => {
  const pathname = usePathname();
  return (
    <DashboardLayout hover={pathname}>
      <h1>Laporan Content</h1>
    </DashboardLayout>
  );
};

export default LaporanPage;
