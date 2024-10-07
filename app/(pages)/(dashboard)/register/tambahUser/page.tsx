"use client";

import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";
import FieldRegister from "@/app/components/Fragments/register/FieldRegister";
import InputRegister from "@/app/components/Fragments/register/InputRegister";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const TambahUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] =
    useState<boolean>(false);
  const pathname = usePathname();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleKonfirmasiPassword = () => {
    setShowKonfirmasiPassword(!showKonfirmasiPassword);
  };
  return (
    <>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div className="py-6 px-10">
            {/* Navigasi */}
            <div className="flex items-center w-full py-3 max-w-xs space-x-1">
              <Link
                href="/register"
                className="text-sm font-semibold text-tulisan"
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
              <FieldRegister
                title="Nama Lengkap Harus Sesuai KTP"
                name="name"
                placeholder="Masukkan Nama Lengkap"
                type="text"
                lowerText="Nama Sesuai KTP"
              />
              <FieldRegister
                title="Nomor Induk Kependudukan"
                name="NIK"
                placeholder="Ketik Nomor Induk Kependudukan"
                type="text"
                lowerText="Nomor Induk Kependudukan(NIK) Harus Sesuai KTP"
              />
              <FieldRegister
                title="Email"
                name="email"
                placeholder="Ketik Email"
                type="email"
                lowerText="contoh:usercreditscoring@gmail.com"
              />
              <div>
                <FieldRegister
                  title="Password"
                  name="password"
                  placeholder="Ketik Password"
                  type={showPassword ? "text" : "password"}
                  lowerText="Password harus berisi satu huruf kapital, dan berisikan angka"
                />
                <button
                  className="flex flex-row gap-x-4"
                  onClick={togglePassword}
                >
                  <Image
                    src={"/assets/dashboard/register/eye.png"}
                    width={20}
                    height={20}
                    alt="eye"
                  />
                  <p className="text-xs pt-0.5">Tampilkan Password</p>
                </button>
              </div>
              <div>
                <FieldRegister
                  title="konfirmasi Password"
                  name="password"
                  placeholder="Ketik Konfirmasi Password"
                  type={showKonfirmasiPassword ? "text" : "password"}
                  lowerText="Password harus berisi satu huruf kapital, dan berisikan angka"
                />
                <button
                  className="flex flex-row gap-x-4"
                  onClick={toggleKonfirmasiPassword}
                >
                  <Image
                    src={"/assets/dashboard/register/eye.png"}
                    alt="eye"
                    width={20}
                    height={20}
                  />
                  <p className="text-xs pt-0.5">Tampilkan Password</p>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-y-4 mt-4 w-full">
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
