import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

// Component
import TablePermintaan from "./TablePermintaan";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

// Data
import { fiturCards } from "@/app/utils/fiturCard";

const ContentDashboardPermintaan = () => {
  const [page, setPage] = useState<number>(1);
  const [userData, setUserData] = useState<any[]>([]);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);

  const cardsToShow = showAll ? fiturCards : fiturCards.slice(-4);

  const prevButton = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = () => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

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

  // Generate numberPage array based on lastVisiblePage
  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  return (
    <div className="w-full px-3 py-5 my-5">
      {/* Add Data */}
      <h1 className="mb-2 text-base font-bold">Tambah Data Baru</h1>
      <Link href="/permintaan/tambahData">
        <div className="flex items-center w-full p-5 mb-5 space-x-3 transition-all duration-300 rounded shadow-md hover:shadow-lg">
          <div className="py-2 px-3 rounded bg-[#ECEAF5] inline-block">
            <Image
              src="/assets/dashboard/dashboard/automationAi.png"
              alt="ai-automation"
              width={30}
              height={30}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              AI Automation (Tambah Data Baru)
            </h3>
            <p className="text-xs text-tulisan">Data Masuk (500)</p>
          </div>
        </div>
      </Link>

      {/* Pilih Fitur AI Scoring */}
      <h1 className="mb-5 text-base font-bold">Pilih Fitur AI Skoring</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-0 md:flex md:justify-between md:space-x-2 md:flex-wrap md:gap-y-5 ">
        {/* Card */}
        {cardsToShow.map((card, index) => (
          <Link
            key={index}
            href="#"
            className="flex space-x-3 px-4 py-2 sm:px-5 sm:py-4 text-xs items-center shadow md:px-5 md:py-5 w-full sm:max-w-[250px] md:max-w-[200px] rounded-md relative transition-all duration-300 hover:shadow-lg"
          >
            <div className={`py-2 px-3 rounded ${card.bgIcon} inline-block`}>
              <Image src={card.image} alt={card.title} width={25} height={0} />
            </div>
            <div>
              <h3 className="text-xs font-semibold">{card.title}</h3>
              <p className="text-xs text-tulisan">Data Masuk (500)</p>
            </div>
            <div className="absolute z-10 top-2 right-2 bg-[#F5F5F5] text-xs font-bold p-1 rounded-full">
              {card.score}
            </div>
          </Link>
        ))}
      </div>

      {/* Button Show All */}
      <div className="relative">
        <div className="flex justify-end mt-4 text-sm">
          <button
            className="text-ijoToska hover:text-tulisan"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Tutup" : "Tampilkan Semua"}
          </button>
        </div>
      </div>

      {/* Pilih nama untuk cek skor */}
      <h1 className="my-5 text-base font-bold">Pilih Nama Untuk Cek Skor</h1>
      {/* Table */}
      {/* <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2">No</th>
            <th>
              NIK
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th>
              Nama
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th>
              Tanggal Input
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th>Berkas</th>
            <th>Action</th>
            <th>
              <input
                type="checkbox"
                name="semuaButton"
                id="semuaButton"
                className="mr-2"
              />
              Semua{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={index} className="border-t border-b">
              <td className="p-2 text-center">{data.no}</td>
              <td className="text-center text-tulisan">{data.nik}</td>
              <td className="pl-5 font-medium">{data.nama}</td>
              <td className="text-center text-tulisan">{data.tanggalInput}</td>
              <td className="font-medium text-center text-blue-800">
                Lihat Detail
                <Image
                  src="/assets/dashboard/permintaan/ceklis.png"
                  alt="arrow-table"
                  width={15}
                  height={15}
                  className="inline-block ml-2"
                />
              </td>
              <td className="text-center">
                <Image
                  src="/assets/dashboard/permintaan/edit.png"
                  alt="arrow-table"
                  width={30}
                  height={30}
                  className="inline-block ml-2"
                />
                <Image
                  src="/assets/dashboard/permintaan/delete.png"
                  alt="arrow-table"
                  width={30}
                  height={30}
                  className="inline-block ml-2"
                />
              </td>
              <td className="text-center">
                <input type="checkbox" name="semua" id="semua" />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <TablePermintaan userData={userData} />

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

      {/* Button Cek Skoring */}
      <div className="flex justify-center w-full md:justify-end">
        <Link
          href="#"
          className="w-full max-w-[300px] bg-ijoToska text-center text-white p-3 rounded-md font-semibold shadow active:bg-tulisan transition-all duration-300"
        >
          Cek Skoring
        </Link>
      </div>
    </div>
  );
};

export default ContentDashboardPermintaan;
