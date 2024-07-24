import Image from "next/image";
import React, { useState } from "react";

interface userDataProps {
  no: number;
  tanggalInput: number;
  jenisPermintaan: number;
  jumlahCustomer: number;
  noPermintaan: number;
  tanggalPermintaan: number;
  tanggalSelesai: number;
}

interface expandedRowsDataProps {
  no: string;
  noPermintaan: string;
  tanggalPermintaan: string;
  jenisPermintaan: string;
}

const expandedRowsData: expandedRowsDataProps[] = [
  {
    no: "1",
    noPermintaan: "0007821",
    tanggalPermintaan: "02/08/22 09:23:30",
    jenisPermintaan: "AI Identity Scoring",
  },
  {
    no: "2",
    noPermintaan: "0007821",
    tanggalPermintaan: "02/08/22 09:23:30",
    jenisPermintaan: "AI Character Scoring",
  },
  {
    no: "3",
    noPermintaan: "0007821",
    tanggalPermintaan: "02/08/22 09:23:30",
    jenisPermintaan: "AI Capability Scoring",
  },
  {
    no: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "02/08/22 09:23:30",
    jenisPermintaan: "AI Credit Scoring",
  },
  {
    no: "5",
    noPermintaan: "0007821",
    tanggalPermintaan: "02/08/22 09:23:30",
    jenisPermintaan: "AI Identity Scoring",
  },
];

const TableLaporanPermintaan = ({
  userData,
}: {
  userData: userDataProps[];
}) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectAllExpanded, setSelectAllExpanded] = useState<boolean>(false);
  const [checkboxListExpanded, setCheckboxListExpanded] = useState<boolean[]>(
    new Array(expandedRowsData.length).fill(false)
  );

  const handleCheckboxListExpanded = () => {
    const newSelectAll = !selectAllExpanded;
    setSelectAllExpanded(newSelectAll);
    setCheckboxListExpanded(
      new Array(expandedRowsData.length).fill(newSelectAll)
    );
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
    <div className="bg-blue-500 overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 text-end" colSpan={2}>
              No
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
            <th className="min-w-[150px]">
              Jenis Permintaan
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">
              Jumlah Customer
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
            <th className="min-w-[150px]">
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
                    className={
                      expandedRows.includes(data.no) ? "rotate-90" : ""
                    }
                  />
                </td>
                <td className="p-2 text-center">{data.no}</td>
                <td className="text-center text-tulisan">
                  {data.tanggalInput}
                </td>
                <td className="text-center text-tulisan">
                  {data.jenisPermintaan}
                </td>
                <td className="text-center text-tulisan">
                  {data.jumlahCustomer}
                </td>
                <td className="text-center text-tulisan">
                  {data.noPermintaan}
                </td>
                <td className="text-center text-tulisan">
                  {data.tanggalPermintaan}
                </td>
                <td className="text-center text-tulisan">
                  {data.tanggalSelesai}
                </td>
              </tr>
              {expandedRows.includes(data.no) && (
                <tr>
                  <td colSpan={8} className="p-0">
                    <table className="w-full text-xs bg-white table-auto text-start">
                      <thead className=" text-tulisan">
                        <tr className="px-20 text-ijoToska">
                          <th className="p-2"></th>
                          <th className="p-2 bg-[#F5F8FF]">No</th>
                          <th className="bg-[#F5F8FF]">NIK</th>
                          <th className="bg-[#F5F8FF]">Tanggal Permintaan</th>
                          <th className="bg-[#F5F8FF]">Nama</th>
                          <th className="bg-[#F5F8FF]">Hasil</th>
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
                          {/* <th className="min-w-[100px] p-2 bg-[#F5F8FF]">
                            <div className="flex justify-center items-center">
                              <label htmlFor="checkboxListAllLaporanUser">
                                ceklis
                              </label>
                              <input
                                type="checkbox"
                                name="semuaButton"
                                id="checkboxListAllLaporanUser"
                                className="mr-2"
                                // onClick={handleCheckboxListLaporan}
                                // checked={checkboxListLaporan}
                              />
                              Semua
                            </div>
                          </th> */}
                          <th className="p-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {expandedRowsData.map(
                          (
                            expandedData: expandedRowsDataProps,
                            expandedIndex: number
                          ) => (
                            <tr key={expandedIndex}>
                              <td></td>
                              <td className="text-center py-2 border-y">
                                {expandedData.no}
                              </td>
                              <td className="text-center border-y">
                                {expandedData.noPermintaan}
                              </td>
                              <td className="border-y text-center">
                                {expandedData.tanggalPermintaan}
                              </td>
                              <td className="border-y">
                                {expandedData.jenisPermintaan}
                              </td>
                              <td className="border-y">
                                <div className="py-1 bg-[#54B435] w-24 rounded font-semibold text-white text-center mx-auto">
                                  Sangat Baik
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
                              {/* <td className="text-center border-y">
                                <input
                                  type="checkbox"
                                  name="checkboxUser"
                                  id="checkboxUser"
                                />
                              </td> */}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLaporanPermintaan;
