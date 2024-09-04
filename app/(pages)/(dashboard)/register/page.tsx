"use client";

import React, { useState } from "react";
import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import ModalRegister from "../../(auth)/register/ModalRegister";
import Link from "next/link";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import DatePicker from "@/app/components/Elements/DatePicker";

const RegisterPage = () => {
  const pathname = usePathname();
  const [akun, setAkun] = useState(false);

  const handleAkun = () => {
    setAkun(true);
  };
  const handleClose = () => {
    setAkun(false);
  };

  return (
    <div>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div className="p-8">
            <div>
              <p className="text-sm font-semibold">Registrasi Account</p>
            </div>
            {/* Navigasi */}
            <div className="flex items-center py-3 w-full max-w-xs space-x-1">
              <Link
                href="/register"
                className="text-sm font-semibold text-ijoToska"
              >
                Data User
              </Link>
              <BiChevronRight className="text-2xl text-tulisan" />
            </div>
            <div className="py-5 flex justify-between">
              <div>
                <DatePicker />
              </div>
              <div className="flex space-x-4">
                {/* <SearchBox /> */}
                <div className="relative inline-block mr-2">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="border text-sm w-[288px] -mr-2 lg:mr-0 lg:w-[300px] py-2.5 rounded-md px-3 pl-10"
                    placeholder="Search by NIK or Nama"
                    autoComplete="off"
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                  <Image
                    src="/assets/dashboard/permintaan/search.png"
                    alt="search"
                    width={20}
                    height={0}
                    className="absolute text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <Link
                  href={"/register/tambahUser"}
                  className="border-2 mt-2 lg:mt-0 text-center border-ijoToska py-2 px-3 rounded-md text-sm font-semibold text-ijoToska active:shadow active:shadow-ijoToska"
                >
                  <Image
                    src={"/assets/dashboard/permintaan/tambah.png"}
                    alt="tambah"
                    width={15}
                    height={0}
                    className="inline-block mr-2"
                  />
                  Tambah Data
                </Link>
              </div>
            </div>
            <div>
              <table className="w-full text-xs bg-white table-auto text-start">
                <thead className="bg-[#F5F8FF] text-tulisan">
                  <tr>
                    <th colSpan={2} className="py-2 border-b-[1.8px]">
                      No
                    </th>
                    <th className="min-w-[20px] border-b-[1.8px]">NIK</th>
                    <th className="min-w-[20px] border-b-[1.8px]">Nama</th>
                    <th className="min-w-[20px] border-b-[1.8px]">Email</th>
                    <th className="min-w-[20px] border-b-[1.8px]">
                      Tanggal Input
                    </th>
                    <th className="min-w-[20px] border-b-[1.8px]">Foto</th>
                    <th className="min-w-[20px] border-b-[1.8px]">Action</th>
                  </tr>
                </thead>
              </table>
            </div>
            {/* {akun ? <ModalRegister close={handleClose} /> : ""} */}
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </div>
  );
};

export default RegisterPage;
