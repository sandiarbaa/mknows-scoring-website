import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import TablePermintaanProses from "./TablePermintaanProses";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { useQueryReports } from "@/app/utils/hooks/useQuery";
import { axiosInstance } from "@/app/utils/lib/axios";

interface UsersProsesDataProps {
  nik: string;
  nama: string;
  tanggalInput: string;
}

interface ContentDashboardProsesProps {
  usersProsesData: UsersProsesDataProps[];
}
const ContentDashboardProses: React.FC<ContentDashboardProsesProps> = ({
  usersProsesData,
}) => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState();
  const [total, setTotal] = useState();

  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axiosInstance.get(
        `/reports?size=${size}&current=${page}`
      );
      // console.log("Fetched data:", response.data);
      setData(response.data.data.reports);
      setTotalPage(response.data.page.totalPage);
      setTotal(response.data.page.total);
    } catch (error) {
      console.error("Error fetching persons:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, size]);
  
  // console.log(data);

  if (isLoading) {
    return <div className="mt-5">Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  const userData = data ?? [];
  const lastVisiblePage = totalPage ?? 1;
  const noAwal = (page - 1) * size + 1;
  const noAkhir =
    userData.length > 0
      ? (page - 1) * size + userData.length
      : (page - 1) * size;
  const totalData = total ?? 0;

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
        <TablePermintaanProses
          // userData={userData}
          usersProsesData={usersProsesData}
        />
      </div>

      {/* Pagination */}
      {usersProsesData.length > 0 && (
        <>
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
        </>
      )}
    </section>
  );
};

export default ContentDashboardProses;
