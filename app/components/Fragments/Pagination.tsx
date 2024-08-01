import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface PaginationProps {
  noAwal: number;
  noAkhir: number;
  totalData: number;
  page: number;
  setPage: (page: number) => void;
  prevButton: () => void;
  nextButton: () => void;
  numberPage: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  noAwal,
  noAkhir,
  totalData,
  page,
  setPage,
  prevButton,
  nextButton,
  numberPage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-3 pt-5 lg:flex-row lg:justify-between">
      <div className="flex items-center mb-3 text-sm font-medium text-tulisan">
        Menampilkan {noAwal} - {noAkhir} dari {totalData} hasil
      </div>

      <div className="flex justify-center w-full max-w-xs pb-5 ">
        <div
          onClick={prevButton}
          className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
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
          className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
        >
          <BiChevronRight className="text-2xl text-ijoToska group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
