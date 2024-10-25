import Image from "next/image";
import React, { useEffect, useState } from "react";

interface UseNotifikasiProps {
  error: string;
}

const useNotifikasi = ({ error }: UseNotifikasiProps) => {
  const [notifikasi, setNotifikasi] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifikasi(false);
    }, 4000);

    return () => clearTimeout(timer); // Bersihkan timer ketika komponen di-unmount
  }, []);
  // setTimeout(() => {
  //   setNotifikasi(false);
  // }, 4000);

  return (
    <div
      className={`h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-full bg-black/30 p-0.5 flex justify-center items-center ${
        notifikasi ? "" : "hidden"
      }`}
    >
      <div className="bg-white w-64 h-40 flex flex-col justify-center items-center rounded-md">
        <Image
          src="/assets/dashboard/permintaan/error-notifikasi.png"
          alt="error-notifikasi"
          width={40}
          height={40}
        />
        <p className="text-black text-sm font-medium mt-5">
          {error ? error : "Terjadi kesalahan saat mengunggah data"}
        </p>
      </div>
    </div>
  );
};

export default useNotifikasi;
