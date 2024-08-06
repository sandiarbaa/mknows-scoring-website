import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TablePermintaan from "./TablePermintaan";
import { fiturCards } from "@/app/utils/fiturCard";
import Pagination from "../Pagination";
import { useRouter } from "next/navigation";
import { useQueryPersons } from "@/app/utils/hooks/useQuery";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const ContentDashboardPermintaan: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeCardIndices, setActiveCardIndices] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [hideErrorNotif, setHideErrorNotif] = useState<boolean>(true);
  const [nik, setNik] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(2);
  const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
  const [loadingSkoring, setLoadingSkoring] = useState<boolean>(false);
  const router = useRouter();

  const cardsToShow = showAll ? fiturCards : fiturCards.slice(-4);

  const handleCardClick = (index: number): void => {
    setActiveCardIndices((prevActiveCardIndices) => {
      if (prevActiveCardIndices.includes(index)) {
        return prevActiveCardIndices.filter((i) => i !== index);
      } else {
        return [...prevActiveCardIndices, index];
      }
    });
  };

  useEffect(() => {
    const uploadMessage = localStorage.getItem("uploadMessage");
    if (uploadMessage) {
      setMessage(uploadMessage);
      localStorage.removeItem("uploadMessage");
    }
  }, []);

  const handleHideErrorNotif = (): void => {
    setHideErrorNotif(false);
  };

  const { data, isLoading, error } = useQueryPersons(page, size);

  if (isLoading) {
    return <div className="mt-5">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  const userData = data.data.persons ?? [];
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

  const checkboxPerson = (nikPerson: string) => {
    setNik((prevNik) => {
      if (prevNik.includes(nikPerson)) {
        return prevNik.filter((item) => item !== nikPerson);
      } else {
        return [...prevNik, nikPerson];
      }
    });
  };

  const submitCekSkoring = async () => {
    setLoadingSkoring(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/scoring?features=identity",
        {
          arrayOfNIK: nik,
        }
      );
      // console.log(res.data);
      router.push("/laporan");
    } catch (error) {
      console.log(error);
    }
    setLoadingSkoring(false);
  };

  // Periksa jika card Identity telah dipilih berdasarkan state showAll
  const isCard13Selected = showAll
    ? activeCardIndices.includes(12) // Card ke-13 adalah index 12 saat showAll true
    : activeCardIndices.includes(0); // Card Identity adalah index 0 saat showAll false

  // Periksa jika ada user yang dipilih
  const isAnyUserSelected = nik.length > 0;

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
      <TablePermintaan userData={userData} checkboxPerson={checkboxPerson} />

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

      {/* Button Cek Skoring */}
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:justify-between">
        <div className="order-2 lg:order-1">
          {message && (
            <div className="w-full mt-5 rounded-md border border-merahWarning p-5 lg:max-w-[320px]">
              <div className="flex justify-between items-center">
                <h1 className="text-base font-bold">{message}</h1>
                <button onClick={handleHideErrorNotif}>
                  <XMarkIcon className="w-5 h-5 text-merahWarning" />
                </button>
              </div>
              <p className="text-sm">Mohon Pilih Data Kembali</p>
            </div>
          )}
        </div>
        <button
          onClick={submitCekSkoring}
          disabled={!isCard13Selected || !isAnyUserSelected}
          className={`order-1 lg:order-2 mt-4 px-14 font-semibold py-2 rounded text-white ${
            !isCard13Selected || !isAnyUserSelected
              ? "bg-gray-400"
              : "bg-ijoToska"
          } ${
            !isCard13Selected || !isAnyUserSelected
              ? "cursor-not-allowed"
              : "hover:bg-ijoToska"
          } transition-all duration-300`}
        >
          {loadingSkoring ? "Loading..." : "Cek Skoring"}
        </button>
      </div>
    </div>
  );
};

export default ContentDashboardPermintaan;
