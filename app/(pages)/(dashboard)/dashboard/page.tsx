"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const pathname = usePathname();
  return (
    <DashboardLayout hover={pathname}>
      <h1>Dashboard Content</h1>
    </DashboardLayout>
  );
};

export default DashboardPage;
