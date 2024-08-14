import React, { useCallback, useEffect, useState } from "react";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import DatePicker from "../../Elements/DatePicker";
import TableLaporanPermintaan from "./TableLaporanPermintaan";
import Pagination from "../Pagination";
import { useQueryRequests } from "@/app/utils/hooks/useQuery";

const ContentDashboardLaporanPermintaan: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(2);

  // button prev - pagination
  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  // button next - pagination
  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  // react query - request
  const { data, isLoading, error } = useQueryRequests(page, size);
  if (isLoading) {
    return <div className="mt-5">Loading...</div>;
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
      {userData.length > 0 && (
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
      )}
    </section>
  );
};

export default ContentDashboardLaporanPermintaan;
