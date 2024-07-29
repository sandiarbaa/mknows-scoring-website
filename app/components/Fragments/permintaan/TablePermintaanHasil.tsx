import Image from "next/image";
import React, { useState } from "react";

interface userDataProps {
  id: string;
  jenis_permintaan: string;
  jumlah_customer: string;
  created_at: string;
  finished_at: string;
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
    nama: "Irfan Bachdim",
    hasil: "Sangat Baik",
  },
];

const TablePermintaanHasil = ({ userData }: { userData: userDataProps[] }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [checkboxListPermintaan, setCheckboxListPermintaan] = useState<
    boolean[]
  >(new Array(userData.length).fill(false));
  const [checkboxListExpanded, setCheckboxListExpanded] = useState<boolean[]>(
    new Array(expandedRowsData.length).fill(false)
  );
  const [selectAllPermintaan, setSelectAllPermintaan] =
    useState<boolean>(false);
  const [selectAllExpanded, setSelectAllExpanded] = useState<boolean>(false);

  const handleCheckboxListPermintaan = () => {
    const newSelectAll = !selectAllPermintaan;
    setSelectAllPermintaan(newSelectAll);
    setCheckboxListPermintaan(new Array(userData.length).fill(newSelectAll));
  };

  const handleCheckboxListExpanded = () => {
    const newSelectAll = !selectAllExpanded;
    setSelectAllExpanded(newSelectAll);
    setCheckboxListExpanded(
      new Array(expandedRowsData.length).fill(newSelectAll)
    );
  };

  const handleCheckboxChangePermintaan = (index: number) => {
    const newCheckboxList = [...checkboxListPermintaan];
    newCheckboxList[index] = !newCheckboxList[index];
    setCheckboxListPermintaan(newCheckboxList);
    setSelectAllPermintaan(newCheckboxList.every((checkbox) => checkbox));
  };

  const handleCheckboxChangeExpanded = (index: number) => {
    const newCheckboxList = [...checkboxListExpanded];
    newCheckboxList[index] = !newCheckboxList[index];
    setCheckboxListExpanded(newCheckboxList);
    setSelectAllExpanded(newCheckboxList.every((checkbox) => checkbox));
  };

  const toggleRow = (no: number) => {
    if (expandedRows.includes(no)) {
      setExpandedRows(expandedRows.filter((rowNo) => rowNo !== no));
    } else {
      setExpandedRows([...expandedRows, no]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 text-end border-b-[1.8px]" colSpan={2}>
              No
            </th>
            <th className="min-w-[120px] border-b-[1.8px]">
              Tanggal Input
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[125px] border-b-[1.8px]">
              Jenis Permintaan
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[125px] border-b-[1.8px]">
              Jumlah Customer
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[110px] border-b-[1.8px]">
              No. Permintaan
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[120px] border-b-[1.8px]">
              Tanggal Permintaan
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[120px] border-b-[1.8px]">
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
                onClick={() => toggleRow(index)}
              >
                <td className="p-2 text-center border-b-[1.8px]">
                  <Image
                    src="/assets/dashboard/permintaan/play.png"
                    alt="play-dropdown"
                    width={20}
                    height={20}
                    className={expandedRows.includes(index) ? "rotate-90" : ""}
                  />
                </td>
                <td className="p-2 text-center border-b-[1.8px]">
                  {index + 1}
                </td>
                <td className="text-center border-b-[1.8px] text-tulisan">
                  {data.created_at}
                </td>
                <td className="text-center border-b-[1.8px] text-tulisan">
                  {data.jenis_permintaan}
                </td>
                <td className="pl-5 font-medium text-center border-b-[1.8px]">
                  {data.jumlah_customer}
                </td>
                <td className="text-center border-b-[1.8px] text-tulisan">
                  {data.id}
                </td>
                <td className="text-center border-b-[1.8px] text-tulisan">
                  {data.created_at}
                </td>
                <td className="text-center border-b-[1.8px] text-tulisan">
                  {data.finished_at}
                </td>
              </tr>
              {expandedRows.includes(index) && (
                <>
                  <tr className="text-ijoToska">
                    <th className="p-2"></th>
                    <th className="p-2 bg-[#F5F8FF]">No</th>
                    <th className="bg-[#F5F8FF] min-w-[150px]">
                      NIK
                      <Image
                        src="/assets/dashboard/permintaan/arrowTable.png"
                        alt="arrow-table"
                        width={8}
                        height={8}
                        className="inline-block ml-2"
                      />
                    </th>
                    <th className="bg-[#F5F8FF] min-w-[150px]">
                      Tanggal Permintaan
                      <Image
                        src="/assets/dashboard/permintaan/arrowTable.png"
                        alt="arrow-table"
                        width={8}
                        height={8}
                        className="inline-block ml-2"
                      />
                    </th>
                    <th className="bg-[#F5F8FF] min-w-[150px]">
                      Nama
                      <Image
                        src="/assets/dashboard/permintaan/arrowTable.png"
                        alt="arrow-table"
                        width={8}
                        height={8}
                        className="inline-block ml-2"
                      />
                    </th>
                    <th className="bg-[#F5F8FF] min-w-[150px]">
                      Hasil
                      <Image
                        src="/assets/dashboard/permintaan/arrowTable.png"
                        alt="arrow-table"
                        width={8}
                        height={8}
                        className="inline-block ml-2"
                      />
                    </th>

                    <th className="min-w-[100px] bg-[#F5F8FF]">
                      <div className="flex justify-center items-center">
                        <label
                          htmlFor="checkboxListAllExpanded"
                          className={`border px-2.5 py-0.5 w-5 h-5 rounded-[3px] relative mr-1`}
                        >
                          <Image
                            src="/assets/dashboard/permintaan/ceklisList.png"
                            alt="ceklis"
                            width={20}
                            height={20}
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                              selectAllExpanded ? "block" : "hidden"
                            }`}
                          />
                        </label>
                        <input
                          type="checkbox"
                          name="allButtonExpanded"
                          id="checkboxListAllExpanded"
                          className="mr-2 hidden"
                          onClick={handleCheckboxListExpanded}
                          checked={selectAllExpanded}
                        />
                        Semua
                      </div>
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
                        <td className="text-center border-y">
                          {expandedData.no}
                        </td>
                        <td className="text-center border-y">
                          {expandedData.nik}
                        </td>
                        <td className="text-center border-y">
                          {expandedData.tanggalPermintaan}
                        </td>
                        <td className="border-y">{expandedData.nama}</td>
                        <td className="text-center border-y">
                          <div className="py-1 bg-[#54B435] rounded font-semibold text-white text-center">
                            {expandedData.hasil}
                          </div>
                        </td>

                        <td className="text-center border-y">
                          <label
                            htmlFor={`checkboxListExpanded${expandedIndex}`}
                            className={`border px-2.5 py-0.5 rounded-[3px] relative`}
                          >
                            <Image
                              src="/assets/dashboard/permintaan/ceklisList.png"
                              alt="ceklis"
                              width={20}
                              height={20}
                              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                                checkboxListExpanded[expandedIndex]
                                  ? "block"
                                  : "hidden"
                              }`}
                            />
                          </label>
                          <input
                            type="checkbox"
                            name={`checkboxListExpanded${expandedIndex}`}
                            id={`checkboxListExpanded${expandedIndex}`}
                            checked={checkboxListExpanded[expandedIndex]}
                            onChange={() =>
                              handleCheckboxChangeExpanded(expandedIndex)
                            }
                            className="hidden"
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
    </div>
  );
};

export default TablePermintaanHasil;
