"use client";

import ProtectedRoute from "../../(auth)/login/protectedRoute/ProtectedRoute";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import DatePicker from "@/app/components/Elements/DatePicker";
import { useRouter } from "next/navigation";
import TableRegister from "@/app/components/Fragments/register/TableRegister";
// import axios from "axios";
import { useEffect } from "react";
import { headers } from "next/headers";
import api from "../../(auth)/login/api";

const RegisterPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const fecthUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await api.get("http://localhost/users/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("users :", res);
      return res.data;
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fecthUsers();
  }, []);

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

            {/* Header Register */}
            <div className="py-5 flex flex-col lg:flex-row justify-between gap-y-3">
              <div>
                <DatePicker />
              </div>
              <div className="flex flex-col lg:flex-row">
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
                <div className="flex items-center">
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
            </div>
            {/* /Header Register */}

            <TableRegister />
            {/* <Pagination noAwal={}/> */}
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </div>
  );
};

export default RegisterPage;
