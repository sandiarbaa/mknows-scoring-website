"use client";
import DatePicker from "@/app/components/Elements/DatePicker";
import Pagination from "@/app/components/Fragments/Pagination";
import TablePermintaan from "@/app/components/Fragments/permintaan/TablePermintaan";

import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import { useQueryPersons } from "@/app/utils/hooks/useQuery";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi"; // Tambahkan BiCalendar dan BiSearch

const AddDataPage = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(1);
  const pathname: string = usePathname();

  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  const { data, isLoading, error } = useQueryPersons(page, size);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userData = data.data.persons ?? [];
  const lastVisiblePage = data?.page?.totalPages ?? 1;
  const noAwal = (page - 1) * size + 1;
  const noAkhir =
    userData.length > 0
      ? (page - 1) * size + userData.length
      : (page - 1) * size;
  const totalData = data?.page?.total ?? 0;

  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  return (
    <DashboardLayout hover={pathname}>
      <div className="px-5 py-10 md:py-5">
        {/* Title */}
        <h1 className="mb-5 text-xl font-bold md:text-2xl">
          (AI Automation) <br className="sm:hidden" /> Tambah Data Baru
        </h1>

        {/* Navigasi */}
        <div className="flex items-center w-full max-w-xs space-x-1">
          <Link
            href="/permintaan"
            className="text-sm font-semibold text-tulisan"
          >
            Permintaan
          </Link>
          <BiChevronRight className="text-2xl text-tulisan" />
          <Link
            href="/permintaan/tambahData"
            className="text-sm font-semibold text-ijoToska"
          >
            Tambah Data
          </Link>
          <BiChevronRight className="text-2xl text-tulisan" />
        </div>

        {/* Date, Search, Button Tambah Data */}
        <div>
          {/* Date */}
          <form action="">
            <div className="flex flex-col items-center mt-10 mb-5 md:flex-row md:justify-between gap-y-3">
              {/* Date */}
              <DatePicker />

              <div className="flex flex-col lg:flex-row">
                {/* Search & Button Tambah */}
                <div className="relative inline-block mr-2">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="border text-sm w-[295px] -mr-2 lg:mr-0 lg:w-[300px] py-2.5 rounded-md px-3 pl-10" // Tambahkan padding kiri untuk ikon
                    placeholder="Search NIK, Nama, No Permintaan"
                  />
                  {/* <BiSearch className="absolute text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                  <Image
                    src="/assets/dashboard/permintaan/search.png"
                    alt="search"
                    width={20}
                    height={0}
                    className="absolute text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <Link
                  href={"/permintaan/tambahData/inputTemplate"}
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
          </form>
        </div>

        {/* Table */}
        <TablePermintaan userData={userData} />

        {/* Pagination */}
        <Pagination
          noAwal={noAwal}
          noAkhir={noAkhir}
          totalData={totalData}
          page={page}
          numberPage={numberPage}
          setPage={setPage}
          prevButton={prevButton}
          nextButton={nextButton}
        />
      </div>
    </DashboardLayout>
  );
};

export default AddDataPage;
