import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import TablePermintaanHasil from "./TablePermintaanHasil";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ContentDashboardHasil = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3000/api/permintaanHasil?page=${page}`
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

  const prevButton = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = () => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  // Generate numberPage array based on lastVisiblePage
  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  return (
    <section className="w-full px-3 py-5 my-5">
      {/* Title */}
      <section className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Permintaan hari ini</h1>
        {/* Search & Dropdown */}
        <div className="flex flex-col lg:flex-row mt-5 lg:mt-0 space-y-3 lg:space-y-0 items-center space-x-3">
          {/* Dropdown */}
          <div className="w-48">
            <select
              id="fruits"
              name="fruits"
              className="block text-sm w-full rounded-md border-gray-300 bg-[#F5F5F5] p-2 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="semua">Semua</option>
              <option value="tahun">Tahun</option>
              <option value="bulan">Bulan</option>
              <option value="minggu">Minggu</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative inline-block mr-2">
            <input
              type="text"
              name="search"
              id="search"
              className="border text-sm w-[295px] -mr-2 lg:mr-0 lg:w-[300px] py-2.5 rounded-md px-3 pl-10" // Tambahkan padding kiri untuk ikon
              placeholder="Search NIK, Nama, No Permintaan"
            />
            <Image
              src="/assets/dashboard/permintaan/search.png"
              alt="search"
              width={20}
              height={0}
              className="absolute text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TablePermintaanHasil userData={userData} />
      </section>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-center w-full px-3 pt-5 md:flex-row md:justify-between">
        <div className="flex items-center mb-3 text-sm font-medium text-tulisan">
          Menampilkan {noAwal} - {noAkhir} dari {totalData} hasil
        </div>

        <div className="flex justify-center w-full max-w-xs pb-5 md:self-end md:justify-end">
          <div
            onClick={prevButton}
            className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
          >
            <BiChevronLeft className="text-2xl text-ijoToska group-hover:text-white" />
          </div>
          <ul className="flex mx-5 space-x-2">
            {numberPage.map((item, index) => (
              <li
                key={index}
                onClick={() => setPage(item)}
                className={`cursor-pointer px-3.5 text-sm py-0.5 rounded flex items-center border ${
                  item === page ? "bg-ijoToska text-white" : "text-gray-400"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
          <div
            onClick={nextButton}
            className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
          >
            <BiChevronRight className="text-2xl text-ijoToska group-hover:text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentDashboardHasil;
