"use client";
import SidebarLink from "@/Components/Fragments/SidebarLink";
import UserPhoto from "@/Components/Fragments/UserPhoto";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
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
