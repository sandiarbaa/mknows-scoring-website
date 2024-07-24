"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const TambahDataDanInputTemplate = () => {
  const pathname: string = usePathname();
  const router = useRouter();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/permintaan");
  };

  return (
    <DashboardLayout hover={pathname}>
      <div className="px-5 py-10 md:py-5">
        {/* Navigasi */}
        <div className="flex flex-wrap items-center w-full max-w-lg space-x-1">
          <Link
            href="/permintaan"
            className="text-sm font-semibold text-tulisan"
          >
            Permintaan
          </Link>
          <BiChevronRight className="text-2xl text-tulisan" />
          <Link
            href="/permintaan/tambahData"
            className="text-sm font-semibold text-tulisan"
          >
            Tambah Data
          </Link>
          <BiChevronRight className="text-2xl text-tulisan" />
          <Link
            href="/permintaan/tambahData/inputTemplate"
            className="text-sm font-semibold text-ijoToska"
          >
            Tambah Data Dan Input Template
          </Link>
        </div>

        {/* Title & Button Upload */}
        <div className="flex flex-col gap-y-5 md:gap-y-0 items-center justify-center mt-5 md:flex-row md:justify-between">
          <h1 className="text-xl font-bold md:mr-3 lg:mr-0 lg:text-2xl">
            Tambah Data Dan Input Template
          </h1>
          {/* Button Upload */}
          <div className="flex flex-col md:flex-row gap-3">
            <Link
              href="#"
              className="bg-ijoToska active:bg-tulisan text-sm rounded font-semibold text-white py-2 text-center px-5"
            >
              Unduh Template
            </Link>
            <Link
              href="#"
              className="border-2 active:border-tulisan active:text-tulisan border-ijoToska text-sm py-2 rounded text-ijoToska px-5 font-semibold"
            >
              Unggah Template
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/permintaan/tambahData"
          className="flex mt-8 font-semibold text-blue-400"
        >
          <BiChevronLeft className="text-2xl" /> Kembali
        </Link>

        <hr className="my-5 border-b-2 bg-tulisan" />

        <form onSubmit={handleFormSubmit}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            {/* Foto KTP */}
            <UploadCard
              title1="Foto KTP"
              title2="Unggah Foto KTP"
              text="*Pastikan KTP terlihat jelas dengan pencahayaan yang baik"
              bgColor="bg-[#B4FFD7]"
              borderColor="border-ijoToska"
              ceklisStatus={true}
            />
            {/* Foto Selfie Diri */}
            <UploadCard
              title1="Foto Selfie Diri"
              title2="Unggah Selfie / Swafoto"
              text="*Pastikan wajah terlihat jelas, pencahayaan yang baik dan sesuai dengan KTP"
              bgColor="bg-[#B4FFD7]"
              borderColor="border-ijoToska"
              ceklisStatus={true}
            />
            {/* Selfie Dengan KTP */}
            <UploadCard
              title1="Selfie Dengan KTP"
              title2="Foto Selfie Diri Unggah Selfie / Swafoto"
              text="*Selfie dengan memegang KTP dengan jarak tidak kurang dari 30cm"
              bgColor="bg-[#F8F8F8]"
              borderColor="border-slate-500"
              ceklisStatus={false}
            />
            <p className="text-xs font-medium text-red-500">
              *Kolom tidak boleh kosong!
            </p>
          </div>
          <button
            type="submit"
            className="text-sm font-semibold text-white bg-ijoToska w-full lg:w-1/2 mt-5 py-3 lg:py-4 rounded-md active:bg-tulisan"
          >
            Tambah Data Baru
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default TambahDataDanInputTemplate;

const UploadCard = ({
  title1,
  title2,
  text,
  bgColor,
  borderColor,
  ceklisStatus,
}: {
  title1: string;
  title2: string;
  text: string;
  bgColor: string;
  borderColor: string;
  ceklisStatus: boolean;
}) => {
  return (
    <>
      {/* Upload KTP */}
      <div className="mb-5">
        <label
          htmlFor="ktp"
          className={`${bgColor} active:bg-tulisan px-5 cursor-pointer w-full inline-block py-5 border-dashed border-2 ${borderColor} rounded-md`}
        >
          <div className="flex space-x-3">
            <div className="bg-[#EDEDED] rounded-md">
              <Image
                src="/assets/dashboard/permintaan/upload.png"
                alt="upload-KTP"
                width={50}
                height={0}
                className="scale-50"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">{title1}</p>
              <p className="text-xs">{title2}</p>
            </div>
          </div>
        </label>
        <input type="file" name="ktp" id="ktp" className="hidden" />
        <p
          className={`text-blue-400 text-xs mt-2 ${
            ceklisStatus ? "" : "hidden"
          }`}
        >
          {text}
        </p>
        <p className={`text-blue-400 text-xs ${ceklisStatus ? "" : "hidden"}`}>
          *Format file (.Jpg, .Png)
        </p>
      </div>
      {/* Image Status Upload */}
      <div className="flex lg:px-5 h-5 items-center space-x-2 -mt-3 mb-8 lg:mt-0">
        <div className={`${ceklisStatus ? "" : "hidden"}`}>
          <Image
            src="/assets/dashboard/permintaan/ceklis.png"
            alt="ceklis-upload"
            width={25}
            height={0}
          />
        </div>
        <p className={`text-xs ${ceklisStatus ? "" : "hidden"}`}>
          11IMG-20190724-WA0009.Jpg
        </p>

        <div>
          <p
            className={`text-blue-400 text-xs mt-7 ${
              ceklisStatus ? "hidden" : ""
            }`}
          >
            {text}
          </p>
          <p
            className={`text-blue-400 text-xs ${ceklisStatus ? "hidden" : ""}`}
          >
            *Format file (.Jpg, .Png)
          </p>
        </div>
      </div>
    </>
  );
};
