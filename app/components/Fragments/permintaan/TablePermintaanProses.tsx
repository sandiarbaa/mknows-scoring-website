import Image from "next/image";
import React from "react";

interface userDataProps {
  no: number;
  nik: string;
  nama: string;
  no_permintaan: string;
  createdAt: string;
  kendala_proses: string;
  status: string;
}

const TablePermintaanProses = ({ userData }: { userData: userDataProps[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 min-w-[50px]">No</th>
            <th className="min-w-[120px]">
              Tanggal Input
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
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
              No. Permintaan
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">
              Tanggal Permintaan
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">Kendala Proses</th>
            <th className="min-w-[150px]">Hasil</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data: userDataProps, index: number) => (
            <tr key={index} className="border-t border-b">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="text-center text-tulisan">{data.createdAt}</td>
              <td className="text-center text-tulisan">{data.nik}</td>
              <td className="pl-5 font-medium">{data.nama}</td>
              <td className="text-center text-tulisan">{data.no_permintaan}</td>
              <td className="text-center text-tulisan">{data.createdAt}</td>
              <td className="text-center">{data.kendala_proses}</td>
              <td className="text-center">
                <div
                  className={`${
                    // data.status === "Menunggu" ? "bg-[#F59E0B]" : "bg-[#EE2D24]"
                    data.status === "Selesai" ? "bg-ijoToska" : "bg-[#EE2D24]"
                  } text-white font-medium rounded py-1 px-2`}
                >
                  {data.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePermintaanProses;
