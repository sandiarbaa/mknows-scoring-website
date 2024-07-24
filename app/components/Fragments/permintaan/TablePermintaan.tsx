import Image from "next/image";
import React, { useState } from "react";

interface userDataProps {
  no: number;
  nik: string;
  nama: string;
  createdAt: string;
}

const TablePermintaan = ({ userData }: { userData: userDataProps[] }) => {
  const [checkboxListPermintaan, setCheckboxListPermintaan] = useState<
    boolean[]
  >(new Array(userData.length).fill(false)); // ini array yg panjangnya sesuai dengan panjang userData, semua elemen array nya di isi dengan boolean false
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleCheckboxListPermintaan = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll); // variabel baru untuk menyimpan status selectAll
    setCheckboxListPermintaan(new Array(userData.length).fill(newSelectAll)); // Mengisi ulang array checkboxListPermintaan dengan nilai newSelectAll untuk semua elemen.
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckboxList = [...checkboxListPermintaan];
    newCheckboxList[index] = !newCheckboxList[index];
    setCheckboxListPermintaan(newCheckboxList);
    setSelectAll(newCheckboxList.every((checkbox) => checkbox));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 min-w-[50px]">No</th>
            <th className="min-w-[100px]">
              NIK
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">
              Nama
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">
              Tanggal Input
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[120px]">Berkas</th>
            <th className="min-w-[100px]">Action</th>
            <th className="min-w-[100px] p-2">
              <div className="flex justify-center items-center">
                <label
                  htmlFor="checkboxListAllPermintaan"
                  className={`border px-2.5 py-0.5 w-5 h-5 rounded-[3px] relative mr-1`}
                >
                  <Image
                    src="/assets/dashboard/permintaan/ceklisList.png"
                    alt="ceklis"
                    width={20}
                    height={20}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                      selectAll ? "block" : "hidden"
                    }`}
                  />
                </label>
                <input
                  type="checkbox"
                  name="allButton"
                  id="checkboxListAllPermintaan"
                  className="mr-2 hidden"
                  onClick={handleCheckboxListPermintaan}
                  checked={selectAll}
                />
                Semua
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data: userDataProps, index: number) => (
            <tr key={index} className="border-t border-b">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="text-center text-tulisan">{data.nik}</td>
              <td className="pl-5 font-medium">{data.nama}</td>
              <td className="text-center text-tulisan">{data.createdAt}</td>
              <td className="font-medium text-center text-blue-800">
                Lihat Detail
                <Image
                  src="/assets/dashboard/permintaan/ceklis.png"
                  alt="arrow-table"
                  width={15}
                  height={0}
                  className="inline-block ml-2"
                />
              </td>
              <td className="text-center">
                <Image
                  src="/assets/dashboard/permintaan/edit.png"
                  alt="arrow-table"
                  width={25}
                  height={25}
                  className="inline-block ml-2"
                />
                <Image
                  src="/assets/dashboard/permintaan/delete.png"
                  alt="arrow-table"
                  width={25}
                  height={25}
                  className="inline-block ml-2"
                />
              </td>
              <td className="text-center">
                <label
                  htmlFor={`checkboxList${index}`}
                  className={`border px-2.5 py-0.5 rounded-[3px] relative`}
                >
                  <Image
                    src="/assets/dashboard/permintaan/ceklisList.png"
                    alt="ceklis"
                    width={20}
                    height={20}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                      checkboxListPermintaan[index] ? "block" : "hidden"
                    }`}
                  />
                </label>
                <input
                  type="checkbox"
                  name={`checkboxList${index}`}
                  id={`checkboxList${index}`}
                  checked={checkboxListPermintaan[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="hidden"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePermintaan;

// LOGIKA KETIKA USER SUDAH MENYELEKSI 2 FITUR

// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// interface userDataProps {
//   no: number;
//   nik: string;
//   nama: string;
//   createdAt: string;
// }

// const TablePermintaan = ({
//   userData,
//   onSelectedUsersChange,
// }: {
//   userData: userDataProps[];
//   onSelectedUsersChange: (selectedUsers: boolean[]) => void;
// }) => {
//   const [checkboxListPermintaan, setCheckboxListPermintaan] = useState<
//     boolean[]
//   >(new Array(userData.length).fill(false));
//   const [selectAll, setSelectAll] = useState<boolean>(false);

//   useEffect(() => {
//     onSelectedUsersChange(checkboxListPermintaan);
//   }, [checkboxListPermintaan, onSelectedUsersChange]);

//   const handleCheckboxListPermintaan = () => {
//     const newSelectAll = !selectAll;
//     setSelectAll(newSelectAll);
//     const newCheckboxList = new Array(userData.length).fill(newSelectAll);
//     setCheckboxListPermintaan(newCheckboxList);
//   };

//   const handleCheckboxChange = (index: number) => {
//     const newCheckboxList = [...checkboxListPermintaan];
//     newCheckboxList[index] = !newCheckboxList[index];
//     setCheckboxListPermintaan(newCheckboxList);
//     setSelectAll(newCheckboxList.every((checkbox) => checkbox));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-xs bg-white table-auto text-start">
//         <thead className="bg-[#F5F8FF] text-tulisan">
//           <tr>
//             <th className="px-5 py-3">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 accent-ijoToska"
//                 checked={selectAll}
//                 onChange={handleCheckboxListPermintaan}
//               />
//             </th>
//             <th className="px-5 py-3">NIK</th>
//             <th className="px-5 py-3">Nama</th>
//             <th className="px-5 py-3">Tanggal Upload</th>
//             <th className="px-5 py-3">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userData.map((user: userDataProps, index: number) => (
//             <tr key={index} className="border-b last:border-b-0">
//               <td className="px-5 py-6">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 accent-ijoToska"
//                   checked={checkboxListPermintaan[index]}
//                   onChange={() => handleCheckboxChange(index)}
//                 />
//               </td>
//               <td className="px-5 py-6">{user.nik}</td>
//               <td className="px-5 py-6">{user.nama}</td>
//               <td className="px-5 py-6">{user.createdAt}</td>
//               <td className="px-5 py-6">
//                 <button className="px-4 py-2 text-white rounded-md bg-ijoToska hover:bg-tulisan">
//                   Detail
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TablePermintaan;
