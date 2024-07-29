import React, { useCallback, useEffect, useState } from "react";
import TablePermintaanHasil from "./TablePermintaanHasil";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import Pagination from "../Pagination";

const ContentDashboardHasil: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const size = 2;
    const res = await fetch(
      // `http://localhost:3000/api/permintaanHasil?page=${page}`
      `http://localhost:3001/requests?size=${size}&current=${page}`
    ).then((res) => res.json());

    // console.log(res.data.requests);
    setUserData(res.data.requests);
    setLastVisiblePage(res.page.totalPages);
    setNoAwal((page - 1) * size + 1);
    setNoAkhir(
      res.data.requests.length > 0
        ? (page - 1) * size + res.data.requests.length
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
      <section className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Permintaan Hari Ini</h1>
        {/* Search & Dropdown */}
        <div className="flex flex-col lg:flex-row mt-5 lg:mt-0 space-y-3 lg:space-y-0 items-center space-x-3">
          {/* Dropdown */}
          <Dropdown title="semua" />

          {/* Searchbox */}
          <SearchBox />
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TablePermintaanHasil userData={userData} />
      </section>

      {/* Pagination */}
      <Pagination
        noAwal={noAwal}
        noAkhir={noAkhir}
        totalData={totalData}
        page={page}
        setPage={setPage}
        prevButton={prevButton}
        nextButton={nextButton}
        numberPage={numberPage}
      />
    </section>
  );
};

export default ContentDashboardHasil;
