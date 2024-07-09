import Image from "next/image";
import React, { useState } from "react";

interface userDataProps {
  no: number;
  tanggalInput: string;
  jenisPermintaan: string;
  jumlahCustomer: string;
  noPermintaan: string;
  tanggalPermintaan: string;
  tanggalSelesai: string;
}

interface expandedRowsDataProps {
  no: string;
  nik: string;
  tanggalPermintaan: string;
  nama: string;
  hasil: string;
}

const expandedRowsData = [
  {
    no: "1",
    nik: "320114573458",
    tanggalPermintaan: "02/08/22 09:23:30",
    nama: "Jamaludin",
    hasil: "Sangat Baik",
  },
  {
    no: "2",
    nik: "320114573458",
    tanggalPermintaan: "02/08/22 09:23:30",
    nama: "Aisyah",
    hasil: "Sangat Baik",
  },
  {
    no: "3",
    nik: "320114573458",
    tanggalPermintaan: "02/08/22 09:23:30",
    nama: "Budi",
    hasil: "Sangat Baik",
  },
  {
    no: "4",
    nik: "320114573458",
    tanggalPermintaan: "02/08/22 09:23:30",
    nama: "Rivaludin",
    hasil: "Sangat Baik",
  },
  {
    no: "5",
    nik: "320114573458",
    tanggalPermintaan: "02/08/22 09:23:30",
    nama: "Irfan Ramadhan",
    hasil: "Sangat Baik",
  },
];

const TablePermintaanHasil = ({ userData }: { userData: userDataProps[] }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (no: number) => {
    if (expandedRows.includes(no)) {
      setExpandedRows(expandedRows.filter((rowNo) => rowNo !== no));
    } else {
      setExpandedRows([...expandedRows, no]);
    }
  };

  return (
    <table className="w-full text-xs bg-white table-auto text-start">
      <thead className="bg-[#F5F8FF] text-tulisan">
        <tr>
          <th className="p-2 text-end" colSpan={2}>
            No
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
          <th>
            Jenis Permintaan
            <Image
              src="/assets/dashboard/permintaan/arrowTable.png"
              alt="arrow-table"
              width={8}
              height={8}
              className="inline-block ml-2"
            />
          </th>
          <th>
            Jumlah Customer
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
          <th>
            Tanggal Selesai
            <Image
              src="/assets/dashboard/permintaan/arrowTable.png"
              alt="arrow-table"
              width={8}
              height={8}
              className="inline-block ml-2"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {userData.map((data: userDataProps, index: number) => (
          <React.Fragment key={index}>
            <tr
              className="border-t border-b cursor-pointer"
              onClick={() => toggleRow(data.no)}
            >
              <td className="p-2 text-center">
                <Image
                  src="/assets/dashboard/permintaan/play.png"
                  alt="play-dropdown"
                  width={20}
                  height={0}
                  className={expandedRows.includes(data.no) ? "rotate-90" : ""}
                />
              </td>
              <td className="p-2 text-center">{data.no}</td>
              <td className="text-center text-tulisan">{data.tanggalInput}</td>
              <td className="text-center text-tulisan">
                {data.jenisPermintaan}
              </td>
              <td className="pl-5 font-medium text-center">
                {data.jumlahCustomer}
              </td>
              <td className="text-center text-tulisan">{data.noPermintaan}</td>
              <td className="text-center text-tulisan">
                {data.tanggalPermintaan}
              </td>
              <td className="text-center">{data.tanggalSelesai}</td>
            </tr>
            {expandedRows.includes(data.no) && (
              <>
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2 bg-[#F5F8FF]">No</th>
                  <th className="bg-[#F5F8FF]">
                    NIK
                    <Image
                      src="/assets/dashboard/permintaan/arrowTable.png"
                      alt="arrow-table"
                      width={8}
                      height={8}
                      className="inline-block ml-2"
                    />
                  </th>
                  <th className="bg-[#F5F8FF]">
                    Tanggal Permintaan
                    <Image
                      src="/assets/dashboard/permintaan/arrowTable.png"
                      alt="arrow-table"
                      width={8}
                      height={8}
                      className="inline-block ml-2"
                    />
                  </th>
                  <th className="bg-[#F5F8FF]">
                    Nama
                    <Image
                      src="/assets/dashboard/permintaan/arrowTable.png"
                      alt="arrow-table"
                      width={8}
                      height={8}
                      className="inline-block ml-2"
                    />
                  </th>
                  <th className="bg-[#F5F8FF]">
                    Hasil
                    <Image
                      src="/assets/dashboard/permintaan/arrowTable.png"
                      alt="arrow-table"
                      width={8}
                      height={8}
                      className="inline-block ml-2"
                    />
                  </th>
                  <th className="bg-[#F5F8FF]">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    Semua
                  </th>
                </tr>
                {/* Body Table */}
                {expandedRowsData.map(
                  (
                    expandedData: expandedRowsDataProps,
                    expandedIndex: number
                  ) => (
                    <tr key={expandedIndex}>
                      <td></td>
                      <td className="text-center">{expandedData.no}</td>
                      <td>{expandedData.nik}</td>
                      <td>{expandedData.tanggalPermintaan}</td>
                      <td>{expandedData.nama}</td>
                      <td>
                        <div className="py-1 bg-[#54B435] rounded font-semibold text-white text-center">
                          {expandedData.hasil}
                        </div>
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          name="checkbox2"
                          id="checkbox2"
                        />
                      </td>
                    </tr>
                  )
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TablePermintaanHasil;
