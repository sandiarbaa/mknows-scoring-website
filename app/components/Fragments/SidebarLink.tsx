"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  // {
  //   href: "/kuota",
  //   imageTrue: "/assets/dashboard/sidebarNavbar/network-add-active.png",
  //   imageFalse: "/assets/dashboard/sidebarNavbar/network-add.png",
  //   linkName: "Kuota",
  // },
];

interface SidebarLinkProps {
  hover: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ hover }) => {
  return (
    <div className="flex flex-col">
      <div>
        {dataSidebarLink.map((item, index) => {
          // Tentukan ukuran gambar berdasarkan index atau href
          let imageSize;
          if (index === 1) {
            imageSize = 15;
          } else if (index === 3) {
            imageSize = 25;
          } else {
            imageSize = 20;
          }

          // Tentukan className berdasarkan kondisi hover dan index
          // kalau hover = item.href atau khusus untuk indeks 1, yaitu apakah hover = "/permintaan/tambahData"
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
    </div>
  );
};

export default SidebarLink;
