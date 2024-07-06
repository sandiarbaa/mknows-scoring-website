"use client";
import Pagination from "@/app/components/Fragments/Pagination";
import Table from "@/app/components/Fragments/Table";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiChevronRight } from "react-icons/bi"; // Tambahkan BiCalendar dan BiSearch

const AddDataPage = () => {
  const [page, setPage] = useState<number>(1);
  const [userData, setUserData] = useState<any[]>([]);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const pathname: string = usePathname();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Prev Button Pagination
  const prevButton = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  // Next Button Pagination
  const nextButton = () => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  // Fetch Data API for table
  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3000/api/permintaan?page=${page}`
    ).then((res) => res.json());

    setUserData(res.data);
    setLastVisiblePage(res.pagination.last_visible_page);
    setNoAwal(res.data[0].no);
    setNoAkhir(
      res.data.length > 0 ? res.data[res.data.length - 1].no : noAkhir
    );
    setTotalData(res.data_length);
  }, [page, noAkhir]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData, noAwal]);

  const handleFocus = () => {
    if (dateInputRef.current) {
      dateInputRef.current.type = "date";
    }
    if (placeholderRef.current) {
      placeholderRef.current.style.display = "none";
    }
  };

  const handleBlur = () => {
    if (dateInputRef.current && !dateInputRef.current.value) {
      dateInputRef.current.type = "text";
      if (placeholderRef.current) {
        placeholderRef.current.style.display = "flex";
      }
    }
  };

  // Generate numberPage array based on lastVisiblePage
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
        <div className="">
          {/* Date */}
          <form action="">
            <div className="flex flex-col items-center mt-10 mb-5 md:flex-row md:justify-between gap-y-3">
              {/* Date */}
              <div className="relative">
                <div
                  ref={placeholderRef}
                  className="absolute text-sm left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center space-x-2 pointer-events-none"
                >
                  <span>Dari</span>
                  <Image
                    src="/assets/dashboard/permintaan/calendar-search.png"
                    alt="arrow-down-date"
                    width={20}
                    height={0}
                  />
                  <span>Sampai</span>
                  <Image
                    src="/assets/dashboard/permintaan/calendar-search.png"
                    alt="arrow-down-date"
                    width={20}
                    height={0}
                  />
                  <span>tt/bb/tahun</span>
                  <Image
                    src="/assets/dashboard/permintaan/arrow-down-date.png"
                    alt="arrow-down-date"
                    width={10}
                    height={0}
                  />
                </div>
                <input
                  type="text"
                  name="date"
                  id="date"
                  className="border w-[290px] lg:w-[270px] py-2 rounded-md px-3"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  ref={dateInputRef}
                />
              </div>

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
        <Table userData={userData} />

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
