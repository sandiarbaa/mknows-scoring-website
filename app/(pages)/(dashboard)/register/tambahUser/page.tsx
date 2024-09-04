"use client";

import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";
import InputRegister from "@/app/components/Fragments/register/InputRegister";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

const TambahUser = () => {
  const pathname = usePathname();

  return (
    <>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div className="py-6 px-10">
            {/* Navigasi */}
            <div className="flex items-center w-full py-3 max-w-xs space-x-1">
              <Link
                href="/register"
                className="text-sm font-semibold text-ijoToska"
              >
                Data User
              </Link>
              <BiChevronRight className="text-2xl text-tulisan" />
              <Link
                href="/register/tambahUser"
                className="text-sm font-semibold text-ijoToska"
              >
                Tambah Account
              </Link>
              <BiChevronRight className="text-2xl text-tulisan" />
            </div>
            <div className="text-sm font-semibold flex justify-between py-4">
              <div>Tambah User Baru</div>
              <div>
                <Link
                  href="#"
                  className="bg-ijoToska active:bg-tulisan text-sm rounded font-semibold text-white py-2 text-center px-5"
                >
                  Tambah User
                </Link>
              </div>
            </div>

            {/* Tambah User */}
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm text-grey-300">Nama Lengkap</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border text-sm w-full py-2.5 rounded-md px-3"
                  placeholder="Masukkan Nama Lengkap"
                />
                <p className="text-xs text-ijoToska">
                  Nama Lengkap Harus Sesuai KTP
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 pt-4">
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm text-grey-300">
                  Nomor Induk Kependudukan
                </p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border text-sm w-full py-2.5 rounded-md px-3"
                  placeholder="Masukkan Nomor Induk Kependudukan"
                />
                <p className="text-xs text-ijoToska">
                  Nomor Induk Kependudukan(NIK) Harus Sesuai KTP
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 pt-4">
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm text-grey-300">Email</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border text-sm w-full py-2.5 rounded-md px-3"
                  placeholder="Masukkan Email"
                />
                <p className="text-xs text-ijoToska">
                  contoh:usercreditscoring@gmail.com
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 pt-4">
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm text-grey-300">Password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border text-sm w-full py-2.5 rounded-md px-3"
                  placeholder="Masukkan Nama Lengkap"
                />
                <p className="text-xs text-ijoToska">
                  Password harus berisi satu huruf kapital, dan berisikan angka
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 pt-4">
              <div className="flex flex-col gap-y-0.5">
                <p className="text-sm text-grey-300">Konfirmasi Password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border text-sm w-full py-2.5 rounded-md px-3"
                  placeholder="Masukkan Konfirmasi Password"
                />
                <p className="text-xs text-ijoToska">
                  Password harus berisi satu huruf kapital, dan berisikan angka
                </p>
              </div>
            </div>

            <div className="pt-4">
              <InputRegister title={"PasFoto"} />
              <InputRegister title={"PasSelfie"} />
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </>
  );
};

export default TambahUser;
