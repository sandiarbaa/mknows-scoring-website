import React, { useCallback, useEffect, useState } from "react";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import DatePicker from "../../Elements/DatePicker";
import TableLaporanPermintaan from "./TableLaporanPermintaan";
import Pagination from "../Pagination";

const ContentDashboardLaporanPermintaan: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3000/api/laporanPermintaan?page=${page}`
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
      {/* Header */}
      <section className="flex flex-col items-center lg:flex-row justify-between space-y-3 lg:space-y-0">
        <div className="flex flex-col lg:flex-row items-center space-x-3 space-y-3 lg:space-y-0">
          <Dropdown title="Semua" />
          <div className="">
            <SearchBox />
          </div>
        </div>
        <div className="ml-3">
          <DatePicker />
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TableLaporanPermintaan userData={userData} />
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

export default ContentDashboardLaporanPermintaan;