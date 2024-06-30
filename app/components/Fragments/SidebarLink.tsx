"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidebarLink = ({ hover }: { hover: string }) => {
  return (
    <div className="flex flex-col">
      <div>
        <Link
          href="/dashboard"
          className={`${
            hover === "/dashboard" ? "bg-ijoToska text-white" : ""
          } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`}
        >
          {hover === "/dashboard" ? (
            <Image
              src="/assets/dashboard/sidebarNavbar/dashboard-active.png"
              alt="dashboard-link-icon"
              width={20}
              height={20}
              className="mr-3"
            />
          ) : (
            <Image
              src="/assets/dashboard/sidebarNavbar/dashboard.png"
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
          } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`}
        >
          {hover === "/permintaan" ? (
            <Image
              src="/assets/dashboard/sidebarNavbar/permintaan-active.png"
              alt="dashboard-link-icon"
              width={15}
              height={15}
              className="mr-3"
            />
          ) : (
            <Image
              src="/assets/dashboard/sidebarNavbar/permintaan.png"
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
          } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`}
        >
          {hover === "/laporan" ? (
            <Image
              src="/assets/dashboard/sidebarNavbar/laporan-active.png"
              alt="dashboard-link-icon"
              width={23}
              height={23}
              className="mr-3 -ml-1"
            />
          ) : (
            <Image
              src="/assets/dashboard/sidebarNavbar/laporan.png"
              alt="dashboard-link-icon"
              width={23}
              height={23}
              className="mr-3 -ml-1"
            />
          )}
          Laporan
        </Link>
        <Link
          href="/kuota"
          className={`${
            hover === "/kuota" ? "bg-ijoToska text-white" : ""
          } w-full px-5 py-2.5 mb-3 rounded-md flex items-center`}
        >
          {hover === "/kuota" ? (
            <Image
              src="/assets/dashboard/sidebarNavbar/network-add-active.png"
              alt="dashboard-link-icon"
              width={26}
              height={26}
              className="mr-3 -ml-1"
            />
          ) : (
            <Image
              src="/assets/dashboard/sidebarNavbar/network-add.png"
              alt="dashboard-link-icon"
              width={26}
              height={26}
              className="mr-3 -ml-1"
            />
          )}
          Kuota
        </Link>
      </div>
    </div>
  );
};

export default SidebarLink;
