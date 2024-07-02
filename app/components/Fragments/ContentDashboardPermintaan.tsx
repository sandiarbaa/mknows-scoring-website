import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const fiturCards = [
  {
    title: "AI Automation",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/automationAi.png",
    bgIcon: "bg-[#ECEAF5]",
    score: 1,
  },
  {
    title: "AI Document Verification",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/docVerif.png",
    bgIcon: "bg-[#D0F9E3]",
    score: 2,
  },
  {
    title: "AI Location & Movement",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/location.png",
    bgIcon: "bg-[#D0E6F5]",
    score: 3,
  },
  {
    title: "AI Capacity & Earning Power",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/earning.png",
    bgIcon: "bg-[#FEF3C7]",
    score: 4,
  },
  {
    title: "AI Capital Strength Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/capital.png",
    bgIcon: "bg-[#D0F9E3]",
    score: 5,
  },
  {
    title: "AI Collateral & Guarantee",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/collateral.png",
    bgIcon: "bg-[#D0E6F5]",
    score: 6,
  },
  {
    title: "AI Condition Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/condition.png",
    bgIcon: "bg-[#FEF3C7]",
    score: 7,
  },
  {
    title: "AI Constraint Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/constraint.png",
    bgIcon: "bg-[#ECEAF5]",
    score: 8,
  },
  {
    title: "AI Legal & Permit Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/legalPermit.png",
    bgIcon: "bg-[#D0E6F5]",
    score: 9,
  },
  {
    title: "AI Credit Need & Purpose",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/credit.png",
    bgIcon: "bg-[#FEF3C7]",
    score: 10,
  },
  {
    title: "AI Digital FootPrint",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/digitalFoot.png",
    bgIcon: "bg-[#ECEAF5]",
    score: 11,
  },
  {
    title: "AI Character Analysis",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/character.png",
    bgIcon: "bg-[#D0F9E3]",
    score: 12,
  },
  {
    title: "AI Identity Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/identitas.png",
    bgIcon: "bg-[#FEF3C7]",
    score: 13,
  },
  {
    title: "AI Character Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/character_scoring.png",
    bgIcon: "bg-[#ECEAF5]",
    score: 14,
  },
  {
    title: "AI Capability Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/capability.png",
    bgIcon: "bg-[#D0F9E3]",
    score: 15,
  },
  {
    title: "AI Credit Scoring",
    jumlahData: "7.685",
    image: "/assets/dashboard/dashboard/creditScoring.png",
    bgIcon: "bg-[#D0E6F5]",
    score: 16,
  },
];

const ContentDashboardPermintaan = () => {
  const [page, setPage] = useState<number>(1);
  const [userData, setUserData] = useState<any[]>([]);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);
  const [showAll, setShowAll] = useState(false);

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
    <div className="w-full my-5 py-5 px-3">
      {/* Add Data */}
      <h1 className="font-bold text-base mb-2">Tambah Data Baru</h1>
      <Link href="#">
        <div className="w-full shadow-md hover:shadow-lg transition-all duration-300 rounded p-5 flex space-x-3 mb-5 items-center">
          <div className="py-2 px-3 rounded bg-[#ECEAF5] inline-block">
            <Image
              src="/assets/dashboard/dashboard/automationAi.png"
              alt="ai-automation"
              width={30}
              height={30}
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm">
              AI Automation (Tambah Data Baru)
            </h3>
            <p className="text-xs text-tulisan">Data Masuk (500)</p>
          </div>
        </div>
      </Link>

      {/* Pilih Fitur AI Scoring */}
      <h1 className="font-bold text-base mb-5">Pilih Fitur AI Skoring</h1>
      <div className="flex justify-between space-x-2 flex-wrap gap-y-5">
        {/* Card */}
        {cardsToShow.map((card, index) => (
          <div
            key={index}
            className="flex space-x-3 items-center shadow px-5 py-6 w-full max-w-[200px] rounded-md relative transition-all duration-300 hover:shadow-lg"
          >
            <div className={`py-2 px-3 rounded ${card.bgIcon} inline-block`}>
              <Image src={card.image} alt={card.title} width={25} height={0} />
            </div>
            <div>
              <h3 className="font-semibold text-xs">{card.title}</h3>
              <p className="text-xs text-tulisan">Data Masuk (500)</p>
            </div>
            <div className="absolute top-2 right-2 bg-[#F5F5F5] text-xs font-bold p-1 rounded-full">
              {card.score}
            </div>
          </div>
        ))}
      </div>

      {/* Button Show All */}
      <div className="flex justify-end mt-4">
        <button className="text-ijoToska" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Tutup" : "Tampilkan Semua"}
        </button>
      </div>

      {/* Pilih nama untuk cek skor */}
      <h1 className="font-bold text-base my-5">Pilih Nama Untuk Cek Skor</h1>
      {/* Table */}
      <table className="table-auto w-full text-sm text-start bg-white">
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
              <td className="font-medium pl-8">{data.nama}</td>
              <td className="text-tulisan text-center">{data.tanggalInput}</td>
              <td className="text-blue-800 font-medium text-center">
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
      </table>

      {/* Pagination */}
      <div className="w-full px-3 pt-5 justify-between flex">
        <div className="text-tulisan font-medium text-sm flex items-center">
          Menampilkan {noAwal} - {noAkhir} dari {totalData} hasil
        </div>

        <div className="flex w-full max-w-xs justify-end">
          <div
            onClick={prevButton}
            className="cursor-pointer flex items-center border p-1 group rounded hover:bg-ijoToska transition-all duration-300"
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
            className="cursor-pointer flex items-center border p-1 group rounded hover:bg-ijoToska transition-all duration-300"
          >
            <BiChevronRight className="text-2xl text-ijoToska group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Button Cek Skoring */}
      <div className="w-full flex justify-end pt-5">
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
