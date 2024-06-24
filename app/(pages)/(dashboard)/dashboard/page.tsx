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
    // <main className="w-full h-screen bg-primary">
    //   <div className="container mx-auto border flex justify-between h-full">
    //     {/* Sidebar */}
    //     <section className="w-2/12 bg-white p-5 shadow">
    //       {/* Logo */}
    //       <Image
    //         src="/assets/login/mknows_logo.png"
    //         alt="logo"
    //         width={100}
    //         height={100}
    //       />
    //       {/* Photo & Username */}
    //       <UserPhoto />
    //       <hr className="border-b-2 my-5 rounded-full" />
    //       {/* Sidebar Link */}
    //       <SidebarLink />
    //     </section>

    //     {/* Content */}
    //     <section className="w-10/12 bg-primary p-5">
    //       <div className="bg-white border w-full rounded-md">contet main</div>
    //     </section>
    //   </div>
    // </main>
  );
};

export default DashboardPage;
