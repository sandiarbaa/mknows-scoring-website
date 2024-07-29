import React, { useCallback, useEffect, useState } from "react";
import TablePermintaanHasil from "./TablePermintaanHasil";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import Pagination from "../Pagination";
import { useQueryRequests } from "@/app/utils/hooks/useQuery";

const ContentDashboardHasil: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(1);

  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  const { data, isLoading, error } = useQueryRequests(page, size);

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userData = data.data.requests ?? [];
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
