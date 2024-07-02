import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  linkStatus: string;
  permintaan: () => void;
  proses: () => void;
  hasil: () => void;
}

const DashboardPermintaanLayouts = ({
  children,
  linkStatus,
  permintaan,
  proses,
  hasil,
}: Props) => {
  return (
    <div className="p-5">
      <Link
        href="/permintaan"
        className={` font-medium mr-5 relative ${
          linkStatus === "/permintaan"
            ? "text-ijoToska after:w-full after:h-[2px] after:bg-ijoToska after:absolute after:left-0 after:-bottom-5"
            : "text-tulisan"
        }`}
        onClick={permintaan}
      >
        Permintaan
      </Link>
      <Link
        href="/permintaan"
        className="text-tulisan font-medium mr-5"
        onClick={proses}
      >
        Proses
      </Link>
      <Link
        href="/permintaan"
        className="text-tulisan font-medium mr-5"
        onClick={hasil}
      >
        Hasil
      </Link>
      {children}
    </div>
  );
};

export default DashboardPermintaanLayouts;
