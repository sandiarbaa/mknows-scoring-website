import Image from "next/image";
import React from "react";

interface userDataProps {
  no: number;
  tanggalInput: string;
  nik: string;
  nama: string;
  noPermintaan: string;
  tanggalPermintaan: string;
  kendalaProses: string;
  hasil: string;
}

const TablePermintaanProses = ({ userData }: { userData: userDataProps[] }) => {
  return (
    <table className="w-full text-xs bg-white table-auto text-start">
      <thead className="bg-[#F5F8FF] text-tulisan">
        <tr>
          <th className="p-2">No</th>
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
            No. Permintaan
            <Image
              src="/assets/dashboard/permintaan/arrowTable.png"
              alt="arrow-table"
              width={8}
              height={8}
              className="inline-block ml-2"
            />
          </th>
          <th>
            Tanggal Permintaan
            <Image
              src="/assets/dashboard/permintaan/arrowTable.png"
              alt="arrow-table"
              width={8}
              height={8}
              className="inline-block ml-2"
            />
          </th>
          <th>Kendala Proses</th>
          <th>Hasil</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((data: userDataProps, index: number) => (
          <tr key={index} className="border-t border-b">
            <td className="p-2 text-center">{data.no}</td>
            <td className="text-center text-tulisan">{data.tanggalInput}</td>
            <td className="text-center text-tulisan">{data.nik}</td>
            <td className="pl-5 font-medium">{data.nama}</td>
            <td className="text-center text-tulisan">{data.noPermintaan}</td>
            <td className="text-center text-tulisan">
              {data.tanggalPermintaan}
            </td>
            <td className="text-center">{data.kendalaProses}</td>
            <td className="text-center">
              <div
                className={`${
                  data.hasil === "Menunggu" ? "bg-[#F59E0B]" : "bg-[#EE2D24]"
                } text-white font-medium rounded py-1 px-2`}
              >
                {data.hasil}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePermintaanProses;
