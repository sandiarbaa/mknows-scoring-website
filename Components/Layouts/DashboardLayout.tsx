import Image from "next/image";
import React from "react";
import UserPhoto from "../Fragments/UserPhoto";
import SidebarLink from "../Fragments/SidebarLink";

const DashboardLayout = ({
  children,
  hover,
}: {
  children: React.ReactNode;
  hover: string;
}) => {
  return (
    <main className="w-full h-screen bg-primary">
      <div className="container mx-auto border flex justify-between h-full">
        {/* Sidebar */}
        <section className="w-2/12 bg-white p-5 shadow">
          {/* Logo */}
          <Image
            src="/assets/login/mknows_logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          {/* Photo & Username */}
          <UserPhoto />
          <hr className="border-b-2 my-5 rounded-full" />
          {/* Sidebar Link */}
          <SidebarLink hover={hover} />
        </section>

        {/* Content */}
        <section className="w-10/12 bg-primary p-5">
          <div className="bg-white border w-full rounded-md">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
