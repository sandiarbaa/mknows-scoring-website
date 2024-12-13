"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SidebarItem {
  href: string;
  imageTrue: string;
  imageFalse: string;
  linkName: string;
}

const dataSidebarLink: SidebarItem[] = [
  {
    href: "/dashboard",
    imageTrue: "/assets/dashboard/sidebarNavbar/dashboard-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/dashboard.png",
    linkName: "Dashboard",
  },
  {
    href: "/permintaan",
    imageTrue: "/assets/dashboard/sidebarNavbar/permintaan-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/permintaan.png",
    linkName: "Permintaan",
  },
  {
    href: "/laporan",
    imageTrue: "/assets/dashboard/sidebarNavbar/laporan-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/laporan.png",
    linkName: "Laporan",
  },
  {
    href: "/kuota",
    imageTrue: "/assets/dashboard/sidebarNavbar/network-add-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/network-add.png",
    linkName: "Kuota",
  },
  {
    href: "/notifikasi",
    imageTrue: "/assets/dashboard/sidebarNavbar/inbox-active.png",
    imageFalse: "/assets/dashboard/sidebarNavbar/inbox.png",
    linkName: "Notifikasi",
  },
];

interface SidebarLinkProps {
  hover: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ hover }) => {
  const [isClicked, setIsClicked] = useState(false);
  // const isRole = localStorage.getItem("role");
  const [isRole, setIsRole] = useState<string | null>(null);

  useEffect(() => {
    // Memastikan akses localStorage hanya di client-side
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      setIsRole(role);
    }
  }, []); // Hanya dijalankan sekali setelah komponen mount

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex flex-col">
      <div>
        {dataSidebarLink.map((item, index) => {
          let imageSize;
          if (index === 1) {
            imageSize = 15;
          } else if (index === 3) {
            imageSize = 25;
          } else {
            imageSize = 20;
          }

          if (index === 6 && hover === "admin") {
            return null;
          } else {
          }

          const isActive =
            (index === 1 && hover === "/permintaan/tambahData") ||
            (index === 1 && hover === "/permintaan/tambahData/inputTemplate") ||
            hover === item.href;

          const linkClassName = `${
            isActive ? "bg-ijoToska text-white" : ""
          } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`;

          return (
            <Link key={index} href={item.href} className={linkClassName}>
              <Image
                src={isActive ? item.imageTrue : item.imageFalse}
                alt={`${item.linkName}-link-icon`}
                width={imageSize}
                height={imageSize}
                className="mr-3"
              />
              <p
                className={`font-medium ${
                  isActive ? "text-white" : "text-tulisan"
                }`}
              >
                {item.linkName}
              </p>
            </Link>
          );
        })}
      </div>

      {/* <div>
        {isRole === "admin" || "superadmin" ? (
          <Link
            href="/register"
            onClick={handleClick}
            className={`flex items-center pl-5 p-2 rounded-md 
        ${isClicked ? "bg-ijoToska text-white" : "bg-white text-tulisan"} 
        transition-colors duration-300`}
          >
            <Image
              src={
                isClicked
                  ? "/assets/dashboard/sidebarNavbar/register-aktif.png"
                  : "/assets/dashboard/sidebarNavbar/register.png"
              }
              width={30}
              height={30}
              alt="icon"
              className="w-6 h-6 mr-2"
            />
            <span>Register</span>
          </Link>
        ) : (
          ""
        )}
      </div> */}

      <div>
        {(isRole === "admin" || isRole === "superadmin") && (
          <Link
            href="/register"
            onClick={handleClick}
            className={`flex items-center pl-5 p-2 rounded-md 
        ${isClicked ? "bg-ijoToska text-white" : "bg-white text-tulisan"} 
        transition-colors duration-300`}
          >
            <Image
              src={
                isClicked
                  ? "/assets/dashboard/sidebarNavbar/register-active.png"
                  : "/assets/dashboard/sidebarNavbar/register.png"
              }
              width={30}
              height={30}
              alt="icon"
              className="w-6 h-6 mr-2"
            />
            <span>Register</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SidebarLink;
