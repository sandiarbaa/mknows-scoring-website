"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import path from "path";

const SidebarLink = ({ hover }: { hover: string }) => {
  return (
    <div className="flex flex-col">
      <Link
        href="/dashboard"
        className={`${
          hover === "/dashboard" ? "bg-ijoToska text-white" : ""
        } w-full px-5 py-2 rounded-md flex items-center`}
      >
        {hover === "/dashboard" ? (
          <Image
            src="/assets/dashboard/dashboard-active.png"
            alt="dashboard-link-icon"
            width={20}
            height={20}
            className="mr-3"
          />
        ) : (
          <Image
            src="/assets/dashboard/dashboard.png"
            alt="dashboard-link-icon"
            width={20}
            height={20}
            className="mr-3"
          />
        )}
        Dashboard
      </Link>
      <Link
        href="/permintaan"
        className={`${
          hover === "/permintaan" ? "bg-ijoToska text-white" : ""
        } w-full px-5 py-2 rounded-md flex items-center`}
      >
        {hover === "/permintaan" ? (
          <Image
            src="/assets/dashboard/permintaan-active.png"
            alt="dashboard-link-icon"
            width={15}
            height={15}
            className="mr-3"
          />
        ) : (
          <Image
            src="/assets/dashboard/permintaan.png"
            alt="dashboard-link-icon"
            width={15}
            height={15}
            className="mr-3"
          />
        )}
        Permintaan
      </Link>
      <Link
        href="/laporan"
        className={`${
          hover === "/laporan" ? "bg-ijoToska text-white" : ""
        } w-full px-5 py-2 rounded-md flex items-center`}
      >
        {hover === "/laporan" ? (
          <Image
            src="/assets/dashboard/laporan-active.png"
            alt="dashboard-link-icon"
            width={23}
            height={23}
            className="mr-3"
          />
        ) : (
          <Image
            src="/assets/dashboard/laporan.png"
            alt="dashboard-link-icon"
            width={23}
            height={23}
            className="mr-3"
          />
        )}
        Laporan
      </Link>
      <Link
        href="/kuota"
        className={`${
          hover === "/kuota" ? "bg-ijoToska text-white" : ""
        } w-full px-5 py-2 rounded-md flex items-center`}
      >
        {hover === "/kuota" ? (
          <Image
            src="/assets/dashboard/network-add-active.png"
            alt="dashboard-link-icon"
            width={26}
            height={26}
            className="mr-3"
          />
        ) : (
          <Image
            src="/assets/dashboard/network-add.png"
            alt="dashboard-link-icon"
            width={26}
            height={26}
            className="mr-3"
          />
        )}
        Kuota
      </Link>
    </div>
  );
};

export default SidebarLink;
