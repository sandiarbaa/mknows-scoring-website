import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Component
import TablePermintaan from "./TablePermintaan";

// Data
import { fiturCards } from "@/app/utils/fiturCard";
import Pagination from "../Pagination";
import { useRouter } from "next/navigation";
import { useQueryPersons } from "@/app/utils/hooks/useQuery";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const ContentDashboardPermintaan: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false); // Mengatur apakah semua kartu fitur akan ditampilkan atau tidak.
  const [activeCardIndices, setActiveCardIndices] = useState<number[]>([]); // Menyimpan indeks kartu fitur yang aktif.
  const [message, setMessage] = useState<string | null>(null); // Menyimpan pesan notifikasi.
  const [hideErrorNotif, setHideErrorNotif] = useState<boolean>(true); // Menyembunyikan notifikasi kesalahan setelah add person.
  const [nik, setNik] = useState<string[]>([]); // Menyimpan NIK yang dipilih.
  const [page, setPage] = useState<number>(1); // Mengatur halaman pagination.
  const [size] = useState<number>(2); // Ukuran data per halaman.
  const [checkedStatus, setCheckedStatus] = useState<boolean>(false); // Mengatur status checkbox
  const [loadingSkoring, setLoadingSkoring] = useState<boolean>(false); // Mengatur status loading untuk button cek skoring
  const router = useRouter();

  // untuk membuka / menutup semua fitur
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

  // mengambil uploadMessage dari localstorage, kemudian di tampilkan di successMessage notif
  useEffect(() => {
    const uploadMessage = localStorage.getItem("uploadMessage");
    if (uploadMessage) {
      setMessage(uploadMessage);
      localStorage.removeItem("uploadMessage"); // Hapus pesan dari localStorage setelah diambil
    }
  }, []);

  // untuk menghilangkan notif sukses setelah berhasil add data person
  const handleHideErrorNotif = (): void => {
    setHideErrorNotif(false);
  };

  // react query persons
  const { data, isLoading, error } = useQueryPersons(page, size);

  if (isLoading) {
    return <div className="mt-5">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // button previous
  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  // button next
  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  // kebutuhan state
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

  // Menambah atau menghapus NIK dari daftar nik saat checkbox diklik.
  const checkboxPerson = (nikPerson: string) => {
    setNik((prevNik) => {
      // Jika sudah ada, fungsi akan menghapus NIK yg baru tersebut dari daftar.
      if (prevNik.includes(nikPerson)) {
        return prevNik.filter((item) => item !== nikPerson);
      }
      // Jika belum ada, fungsi akan menambahkan NIK tersebut ke dalam daftar.
      else {
        return [...prevNik, nikPerson];
      }
    });
  };

  // Mengirimkan NIK yang dipilih ke API untuk cek skoring
  const submitCekSkoring = async () => {
    setLoadingSkoring(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/scoring?features=identity",
        {
          arrayOfNIK: nik,
        }
      );
      console.log(res.data);
      router.push("/laporan");
    } catch (error) {
      console.log(error);
    }
    setLoadingSkoring(false);
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
            <div
              // className={`h-full w-full mt-5 lg:w-8/12 bg-red-500 rounded-md p-0.5 ${
              className={`h-10 w-72 mt-5 lg:mt-0 lg:w-72 bg-green-500 rounded-md p-0.5 ${
                hideErrorNotif ? "" : "hidden"
              }`}
            >
              <div className="bg-white w-[95%] float-left h-full rounded flex items-center justify-between pl-2 pr-2">
                <XMarkIcon
                  className={`w-6 cursor-pointer`}
                  onClick={handleHideErrorNotif}
                />
                <p className="text-green-500 font-medium text-sm mr-5">
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={submitCekSkoring}
          // disabled={true}
          className={`${
            userData.length > 0 ? "bg-ijoToska" : "bg-tulisan"
          } w-full max-w-[300px] mt-5 order-1 lg:order-2 text-center text-white p-3 rounded-md font-semibold shadow active:bg-tulisan transition-all duration-300`}
        >
          {loadingSkoring ? "Loading..." : "Cek Skoring"}
        </button>
      </div>
    </div>
  );
};

export default ContentDashboardPermintaan;

// FITUR CARD CLICK CODE
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// // Component
// import TablePermintaan from "./TablePermintaan";

// // Data
// import { fiturCards } from "@/app/utils/fiturCard";
// import Pagination from "../Pagination";
// import { useRouter } from "next/navigation";
// import { useQueryPersons } from "@/app/utils/hooks/useQuery";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import axios from "axios";

// const ContentDashboardPermintaan: React.FC = () => {
//   const [showAll, setShowAll] = useState<boolean>(false); // Mengatur apakah semua kartu fitur akan ditampilkan atau tidak.
//   const [activeCardIndices, setActiveCardIndices] = useState<number[]>([]); // Menyimpan indeks kartu fitur yang aktif.
//   const [message, setMessage] = useState<string | null>(null); // Menyimpan pesan notifikasi.
//   const [hideErrorNotif, setHideErrorNotif] = useState<boolean>(true); // Menyembunyikan notifikasi kesalahan setelah add person.
//   const [nik, setNik] = useState<string[]>([]); // Menyimpan NIK yang dipilih.
//   const [page, setPage] = useState<number>(1); // Mengatur halaman pagination.
//   const [size] = useState<number>(2); // Ukuran data per halaman.
//   const [checkedStatus, setCheckedStatus] = useState<boolean>(false); // Mengatur status checkbox
//   const [loadingSkoring, setLoadingSkoring] = useState<boolean>(false); // Mengatur status loading untuk button cek skoring
//   const router = useRouter();

//   // untuk membuka / menutup semua fitur
//   const cardsToShow = showAll ? fiturCards : fiturCards.slice(-4);

//   const handleCardClick = async (index: number): Promise<void> => {
//     setActiveCardIndices((prevActiveCardIndices) => {
//       if (prevActiveCardIndices.includes(index)) {
//         return prevActiveCardIndices.filter((i) => i !== index);
//       } else {
//         return [...prevActiveCardIndices, index];
//       }
//     });

//     // Kirim request ke API jika card ke-13 diklik
//     if (index === 12) {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/scoring?features=identity"
//         );
//         console.log(res.data);
//         // Lakukan sesuatu dengan response jika diperlukan
//       } catch (error) {
//         console.error("Error sending request to API:", error);
//       }
//     }
//   };

//   // mengambil uploadMessage dari localstorage, kemudian di tampilkan di successMessage notif
//   useEffect(() => {
//     const uploadMessage = localStorage.getItem("uploadMessage");
//     if (uploadMessage) {
//       setMessage(uploadMessage);
//       localStorage.removeItem("uploadMessage"); // Hapus pesan dari localStorage setelah diambil
//     }
//   }, []);

//   // untuk menghilangkan notif sukses setelah berhasil add data person
//   const handleHideErrorNotif = (): void => {
//     setHideErrorNotif(false);
//   };

//   // react query persons
//   const { data, isLoading, error } = useQueryPersons(page, size);

//   if (isLoading) {
//     return <div className="mt-5">Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   // button previous
//   const prevButton = (): void => {
//     if (page <= 1) return;
//     setPage(page - 1);
//   };

//   // button next
//   const nextButton = (): void => {
//     if (page >= lastVisiblePage) return;
//     setPage(page + 1);
//   };

//   // kebutuhan state
//   const userData = data.data.persons ?? [];
//   const lastVisiblePage = data?.page?.totalPages ?? 1;
//   const noAwal = (page - 1) * size + 1;
//   const noAkhir =
//     userData.length > 0
//       ? (page - 1) * size + userData.length
//       : (page - 1) * size;
//   const totalData = data?.page?.total ?? 0;

//   const numberPage = Array.from(
//     { length: lastVisiblePage },
//     (_, index) => index + 1
//   );

//   // Menambah atau menghapus NIK dari daftar nik saat checkbox diklik.
//   const checkboxPerson = (nikPerson: string) => {
//     setNik((prevNik) => {
//       // Jika sudah ada, fungsi akan menghapus NIK yg baru tersebut dari daftar.
//       if (prevNik.includes(nikPerson)) {
//         return prevNik.filter((item) => item !== nikPerson);
//       }
//       // Jika belum ada, fungsi akan menambahkan NIK tersebut ke dalam daftar.
//       else {
//         return [...prevNik, nikPerson];
//       }
//     });
//   };

//   // Mengirimkan NIK yang dipilih ke API untuk cek skoring
//   const submitCekSkoring = async () => {
//     setLoadingSkoring(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:3001/scoring?features=identity",
//         {
//           arrayOfNIK: nik,
//         }
//       );
//       console.log(res.data);
//       router.push("/laporan");
//     } catch (error) {
//       console.log(error);
//     }
//     setLoadingSkoring(false);
//   };

//   return (
//     <div className="w-full px-3 py-5 my-5">
//       {/* Add Data */}
//       <h1 className="mb-2 text-base font-bold">Tambah Data Baru</h1>
//       <Link href="/permintaan/tambahData">
//         <div className="flex items-center w-full p-5 mb-5 space-x-3 transition-all duration-300 rounded shadow-md hover:shadow-lg">
//           <div className="py-2 px-3 rounded bg-[#ECEAF5] inline-block">
//             <Image
//               src="/assets/dashboard/dashboard/automationAi.png"
//               alt="ai-automation"
//               width={30}
//               height={30}
//             />
//           </div>

//           <div>
//             <h3 className="text-sm font-semibold">
//               AI Automation (Tambah Data Baru)
//             </h3>
//             <p className="text-xs text-tulisan">Data Masuk (500)</p>
//           </div>
//         </div>
//       </Link>

//       {/* Pilih Fitur AI Scoring */}
//       <h1 className="mb-5 text-base font-bold">Pilih Fitur AI Skoring</h1>
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-0 md:flex md:justify-between md:space-x-2 md:flex-wrap md:gap-y-5 ">
//         {/* Card */}
//         {cardsToShow.map((card, index) => (
//           <Link
//             key={index}
//             href="#"
//             onClick={() => handleCardClick(index)}
//             className={`flex space-x-3 px-4 py-2 sm:px-5 sm:py-4 text-xs items-center shadow md:px-5 md:py-5 w-full sm:max-w-[250px] md:max-w-[200px] rounded-md relative transition-all duration-300 hover:shadow-lg ${
//               activeCardIndices.includes(index)
//                 ? "border border-ijoToska shadow shadow-ijoToska hover:shadow-md hover:shadow-ijoToska"
//                 : ""
//             }`}
//           >
//             <div className={`py-2 px-3 rounded ${card.bgIcon} inline-block`}>
//               <Image src={card.image} alt={card.title} width={25} height={0} />
//             </div>
//             <div>
//               <h3 className="text-xs font-semibold">{card.title}</h3>
//               <p className="text-xs text-tulisan">Data Masuk (500)</p>
//             </div>
//             <div className="absolute z-10 top-2 right-2 bg-[#F5F5F5] text-xs font-bold p-1 rounded-full">
//               {card.score}
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Button Show All */}
//       <div className="relative">
//         <div className="flex justify-end mt-4 text-sm">
//           <button
//             className="text-ijoToska hover:text-tulisan"
//             onClick={() => setShowAll(!showAll)}
//           >
//             {showAll ? "Tutup" : "Tampilkan Semua"}
//           </button>
//         </div>
//       </div>

//       {/* Pilih nama untuk cek skor */}
//       <h1 className="my-5 text-base font-bold">Pilih Nama Untuk Cek Skor</h1>

//       {/* Table */}
//       <TablePermintaan userData={userData} checkboxPerson={checkboxPerson} />

//       {/* Pagination */}
//       {totalData > size && (
//         // <Pagination
//         //   currentPage={page}
//         //   totalPages={lastVisiblePage}
//         //   prevButton={prevButton}
//         //   nextButton={nextButton}
//         //   numberPage={numberPage}
//         // />
//         <Pagination
//           noAwal={noAwal}
//           noAkhir={noAkhir}
//           totalData={totalData}
//           page={page}
//           setPage={setPage}
//           prevButton={prevButton}
//           nextButton={nextButton}
//           numberPage={numberPage}
//         />
//       )}

//       {/* Button Submit untuk cek skoring */}
//       <div className="relative">
//         <div className="flex justify-end mt-4 text-sm">
//           <button
//             className={`${
//               loadingSkoring
//                 ? "bg-gray-400"
//                 : "bg-ijoToska hover:bg-ijoToska-dark"
//             } text-white px-4 py-2 rounded`}
//             onClick={submitCekSkoring}
//             disabled={loadingSkoring}
//           >
//             {loadingSkoring ? "Memuat..." : "Cek Skoring"}
//           </button>
//         </div>
//       </div>

//       {/* Notif */}
//       {message && hideErrorNotif && (
//         <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
//           {message}
//           <button
//             className="ml-2 text-xs font-bold"
//             onClick={handleHideErrorNotif}
//           >
//             X
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContentDashboardPermintaan;

// SECOND CODE
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import TablePermintaan from "./TablePermintaan";
// import { fiturCards } from "@/app/utils/fiturCard";
// import Pagination from "../Pagination";
// import { useRouter } from "next/navigation";
// import { useQueryPersons } from "@/app/utils/hooks/useQuery";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import axios from "axios";

// const ContentDashboardPermintaan: React.FC = () => {
//   const [showAll, setShowAll] = useState<boolean>(false);
//   const [activeCardIndices, setActiveCardIndices] = useState<number[]>([]);
//   const [message, setMessage] = useState<string | null>(null);
//   const [hideErrorNotif, setHideErrorNotif] = useState<boolean>(true);
//   const [nik, setNik] = useState<string[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [size] = useState<number>(4);
//   const router = useRouter();
//   const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
//   const [loadingSkoring, setLoadingSkoring] = useState<boolean>(false);

//   const cardsToShow = showAll ? fiturCards : fiturCards.slice(-4);

//   const handleCardClick = (index: number): void => {
//     setActiveCardIndices((prevActiveCardIndices) => {
//       if (prevActiveCardIndices.includes(index)) {
//         return prevActiveCardIndices.filter((i) => i !== index);
//       } else {
//         return [...prevActiveCardIndices, index];
//       }
//     });
//   };

//   useEffect(() => {
//     const uploadMessage = localStorage.getItem("uploadMessage");
//     if (uploadMessage) {
//       setMessage(uploadMessage);
//       localStorage.removeItem("uploadMessage");
//     }
//   }, []);

//   const handleHideErrorNotif = (): void => {
//     setHideErrorNotif(false);
//   };

//   const { data, isLoading, error } = useQueryPersons(page, size);

//   if (isLoading) {
//     return <div className="mt-5">Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const prevButton = (): void => {
//     if (page <= 1) return;
//     setPage(page - 1);
//   };

//   const nextButton = (): void => {
//     if (page >= lastVisiblePage) return;
//     setPage(page + 1);
//   };

//   const userData = data.data.persons ?? [];
//   const lastVisiblePage = data?.page?.totalPages ?? 1;
//   const noAwal = (page - 1) * size + 1;
//   const noAkhir =
//     userData.length > 0
//       ? (page - 1) * size + userData.length
//       : (page - 1) * size;
//   const totalData = data?.page?.total ?? 0;

//   const numberPage = Array.from(
//     { length: lastVisiblePage },
//     (_, index) => index + 1
//   );

//   const checkboxPerson = (nikPerson: string) => {
//     setNik((prevNik) => {
//       if (prevNik.includes(nikPerson)) {
//         return prevNik.filter((item) => item !== nikPerson);
//       } else {
//         return [...prevNik, nikPerson];
//       }
//     });
//   };

//   const checkboxAllPersons = (allNiks: string[]) => {
//     setNik(allNiks);
//   };

//   const submitCekSkoring = async () => {
//     setLoadingSkoring(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:3001/scoring?features=identity",
//         {
//           arrayOfNIK: nik,
//         }
//       );
//       console.log(res.data);
//       router.push("/laporan");
//     } catch (error) {
//       console.log(error);
//     }
//     setLoadingSkoring(false);
//   };

//   return (
//     <div className="w-full px-3 py-5 my-5">
//       <h1 className="mb-2 text-base font-bold">Tambah Data Baru</h1>
//       <Link href="/permintaan/tambahData">
//         <div className="flex items-center w-full p-5 mb-5 space-x-3 transition-all duration-300 rounded shadow-md hover:shadow-lg">
//           <div className="py-2 px-3 rounded bg-[#ECEAF5] inline-block">
//             <Image
//               src="/assets/dashboard/dashboard/automationAi.png"
//               alt="ai-automation"
//               width={30}
//               height={30}
//             />
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold">
//               AI Automation (Tambah Data Baru)
//             </h3>
//             <p className="text-xs text-tulisan">Data Masuk (500)</p>
//           </div>
//         </div>
//       </Link>
//       <h1 className="mb-5 text-base font-bold">Pilih Fitur AI Skoring</h1>
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-0 md:flex md:justify-between md:space-x-2 md:flex-wrap md:gap-y-5 ">
//         {cardsToShow.map((card, index) => (
//           <Link
//             key={index}
//             href="#"
//             onClick={() => handleCardClick(index)}
//             className={`flex space-x-3 px-4 py-2 sm:px-5 sm:py-4 text-xs items-center shadow md:px-5 md:py-5 w-full sm:max-w-[250px] md:max-w-[200px] rounded-md relative transition-all duration-300 hover:shadow-lg ${
//               activeCardIndices.includes(index)
//                 ? "border border-ijoToska shadow shadow-ijoToska hover:shadow-md hover:shadow-ijoToska"
//                 : ""
//             }`}
//           >
//             <div className={`py-2 px-3 rounded ${card.bgIcon} inline-block`}>
//               <Image src={card.image} alt={card.title} width={25} height={0} />
//             </div>
//             <div>
//               <h3 className="text-xs font-semibold">{card.title}</h3>
//               <p className="text-xs text-tulisan">Data Masuk (500)</p>
//             </div>
//             <div className="absolute z-10 top-2 right-2 bg-[#F5F5F5] text-xs font-bold p-1 rounded-full">
//               {card.score}
//             </div>
//           </Link>
//         ))}
//       </div>
//       <div className="relative">
//         <div className="flex justify-end mt-4 text-sm">
//           <button
//             className="text-ijoToska hover:text-tulisan"
//             onClick={() => setShowAll(!showAll)}
//           >
//             {showAll ? "Tutup" : "Tampilkan Semua"}
//           </button>
//         </div>
//       </div>
//       <h1 className="my-5 text-base font-bold">Pilih Nama Untuk Cek Skor</h1>
//       <TablePermintaan
//         userData={userData}
//         checkboxPerson={checkboxPerson}
//         checkboxAllPersons={checkboxAllPersons}
//       />
//       <Pagination
//         noAwal={noAwal}
//         noAkhir={noAkhir}
//         totalData={totalData}
//         page={page}
//         setPage={setPage}
//         prevButton={prevButton}
//         nextButton={nextButton}
//         numberPage={numberPage}
//       />
//       <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:justify-between">
//         <div className="order-2 lg:order-1">
//           {message && (
//             <div
//               className={`h-10 w-72 mt-5 lg:mt-0 lg:w-72 bg-green-500 rounded-md p-0.5 ${
//                 hideErrorNotif ? "" : "hidden"
//               }`}
//             >
//               <div className="bg-white w-[95%] float-left h-full rounded flex items-center justify-between pl-2 pr-2">
//                 <XMarkIcon
//                   className={`w-6 cursor-pointer`}
//                   onClick={handleHideErrorNotif}
//                 />
//                 <p className="text-green-500 font-medium text-sm mr-5">
//                   {message}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={submitCekSkoring}
//           className="w-full max-w-[300px] order-1 lg:order-2 bg-ijoToska text-center text-white p-3 rounded-md font-semibold shadow active:bg-tulisan transition-all duration-300"
//         >
//           {loadingSkoring ? "Loading..." : "Cek Skoring"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContentDashboardPermintaan;
