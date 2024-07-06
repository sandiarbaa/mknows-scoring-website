import Image from "next/image";
import React from "react";

interface userDataProps {
  no: number;
  nik: string;
  nama: string;
  tanggalInput: string;
}

const Table = ({ userData }: { userData: userDataProps[] }) => {
  return (
    <table className="w-full text-xs bg-white table-auto text-start">
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
        {userData.map((data: userDataProps, index: number) => (
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
              <input type="checkbox" name="semua" id="semua" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
