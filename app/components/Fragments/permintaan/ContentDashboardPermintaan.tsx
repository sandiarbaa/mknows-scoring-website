import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

// Component
import TablePermintaan from "./TablePermintaan";

// Data
import { fiturCards } from "@/app/utils/fiturCard";
import Pagination from "../Pagination";
import { useRouter } from "next/navigation";

const ContentDashboardPermintaan: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [userData, setUserData] = useState<any[]>([]);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeCardIndices, setActiveCardIndices] = useState<number[]>([]);
  const router = useRouter();

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
    const size = 1; // Number of data per page
    const res = await fetch(
      `http://localhost:3001/persons?size=${size}&current=${page}`
      // `http://localhost:3001/persons?size=2&current=1`
    ).then((res) => res.json());

    // console.log(res.data.persons);

    setUserData(res.data.persons);
    setLastVisiblePage(res.page.totalPages);
    setNoAwal((page - 1) * size + 1);
    setNoAkhir(
      res.data.persons.length > 0
        ? (page - 1) * size + res.data.persons.length
        : (page - 1) * size
    );

    setTotalData(res.page.total);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  // Generate numberPage array based on lastVisiblePage
  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  const handleCardClick = (index: number): void => {
    setActiveCardIndices((prevActiveCardIndices) => {
      if (prevActiveCardIndices.includes(index)) {
        return prevActiveCardIndices.filter((i) => i !== index);
      } else {
        return [...prevActiveCardIndices, index];
      }
    });
  };

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
            onClick={() => handleCardClick(index)}
            className={`flex space-x-3 px-4 py-2 sm:px-5 sm:py-4 text-xs items-center shadow md:px-5 md:py-5 w-full sm:max-w-[250px] md:max-w-[200px] rounded-md relative transition-all duration-300 hover:shadow-lg ${
              activeCardIndices.includes(index)
                ? "border border-ijoToska shadow shadow-ijoToska hover:shadow-md hover:shadow-ijoToska"
                : ""
            }`}
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
      <TablePermintaan userData={userData} />

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

      {/* Button Cek Skoring */}
      <div className="flex justify-center w-full md:justify-end">
        <button
          onClick={() => router.push("/laporan")}
          className="w-full max-w-[300px] bg-ijoToska text-center text-white p-3 rounded-md font-semibold shadow active:bg-tulisan transition-all duration-300"
        >
          Cek Skoring
        </button>
      </div>
    </div>
  );
};

export default ContentDashboardPermintaan;
