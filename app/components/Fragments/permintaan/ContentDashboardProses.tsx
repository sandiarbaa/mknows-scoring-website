import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import TablePermintaanProses from "./TablePermintaanProses";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Link from "next/link";

const ContentDashboardProses: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const size = 2;
    const res = await fetch(
      // `http://localhost:3000/api/permintaanProses?page=${page}`
      `http://localhost:3001/reports?size=${size}&current=${page}`
    ).then((res) => res.json());

    // console.log(res);
    setUserData(res.data.reports);
    setLastVisiblePage(res.page.totalPages);
    setNoAwal((page - 1) * size + 1);
    setNoAkhir(
      res.data.reports.length > 0
        ? (page - 1) * size + res.data.reports.length
        : (page - 1) * size
    );
    setTotalData(res.page.total);
  }, [page]);

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
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-xl font-bold mb-3 lg:mb-0">Permintaan Hari Ini</h1>
        {/* Search & Button Tambah */}
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

      {/* Table */}
      <div className="mt-5">
        <TablePermintaanProses userData={userData} />
      </div>

      {/* Pagination */}
      <section className="flex flex-col items-center justify-center w-full px-3 pt-5 md:flex-row md:justify-between">
        <div className="flex items-center mb-3 text-sm font-medium text-tulisan">
          Menampilkan {noAwal} - {noAkhir} dari {totalData} hasil
        </div>

        <p className="text-sm text-tulisan font-medium text-center">
          Untuk melihat riwayat permintaan sebelumnya{" "}
          <Link href="#" className="text-blue-400 hover:underline">
            klik disini
          </Link>
        </p>
      </section>

      <section className="flex justify-center mt-5">
        <div className="flex justify-center w-full max-w-xs">
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
      </section>
    </section>
  );
};

export default ContentDashboardProses;
