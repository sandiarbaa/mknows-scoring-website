"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import api from "@/app/(pages)/(auth)/login/api";
import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";

// Function for handling notifications
const useNotification = (initialState = true, duration = 4000) => {
  const [notifikasi, setNotifikasi] = useState<boolean>(initialState);

  useEffect(() => {
    if (notifikasi) {
      const timeout = setTimeout(() => {
        setNotifikasi(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [notifikasi, duration]);

  return { notifikasi, setNotifikasi };
};

const TambahDataDanInputTemplate = () => {
  const pathname: string = usePathname();
  const router = useRouter();

  const [ktp, setKtp] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { notifikasi, setNotifikasi } = useNotification();

  const [ktpFileName, setKtpFileName] = useState<string>("");
  const [selfieFileName, setSelfieFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (e.target.id === "ktp") {
        setKtp(file);
        setKtpFileName(file.name);
      } else if (e.target.id === "selfie") {
        setSelfie(file);
        setSelfieFileName(file.name);
      }
    }
  };

  const HandleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    const accessToken = localStorage.getItem("accessToken");
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError("");

    const formData = new FormData();
    formData.append("ktp", ktp!);
    formData.append("selfie", selfie!);

    try {
      const response = await api.post("/persons", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.setItem("uploadMessage", response.data.message);
      router.push("/permintaan");
    } catch (error: any) {
      setIsError(true);
      setError(error.response.data.message);
      setNotifikasi(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
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
            className="flex mt-8 font-semibold text-blue-400 w-24"
          >
            <BiChevronLeft className="text-2xl" /> Kembali
          </Link>

          <hr className="my-5 border-b-2 bg-tulisan" />

          <form onSubmit={HandleUpload}>
            <div className="collapse bg-transparent rounded-md">
              <input type="checkbox" />
              <div className="collapse-title text-base font-medium bg-[#F5F5F5] flex justify-between">
                <div>
                  <h1 className="font-bold">AI Identity Scoring</h1>
                </div>
                <div>
                  <Image
                    src="/assets/dashboard/permintaan/arrow-dropdown.png"
                    width={12}
                    height={12}
                    alt="arrow-dropdown"
                    className="mt-2.5 -rotate-180"
                  />
                </div>
              </div>
              <div className="collapse-content bg-transparent h-[350px] lg:h-[400px] pt-5 lg:px-10">
                {/* <p>hello</p> */}
                <UploadCard
                  title1="Kartu Tanda Penduduk (KTP)"
                  text="*Pastikan foto KTP dapat terlihat dengan jelas dan pencahayaan yang baik"
                  bgColor="bg-[#F5F5F5]"
                  ceklisStatus={true}
                  htmlForId="ktp"
                  ktpFileName={ktpFileName}
                  fileNameKTPUploadIcon={ktpFileName}
                  onChange={handleFileChange}
                />

                <UploadCard
                  title1="Foto Selfie Diri"
                  text="*Pastikan wajah Anda dapat terlihat dengan jelas dan pencahayaan yang baik"
                  bgColor="bg-[#F5F5F5]"
                  ceklisStatus={true}
                  htmlForId="selfie"
                  ktpFileName={selfieFileName}
                  fileNameKTPUploadIcon={selfieFileName}
                  onChange={handleFileChange}
                />

                <div className="flex justify-center lg:justify-end">
                  {/* Button Submit Form */}
                  <button
                    type="submit"
                    className={`text-sm font-medium text-white w-[250px] h-[40px] rounded-md inline-block active:bg-tulisan ${
                      isLoading ? "bg-tulisan" : "bg-ijoToska"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Simpan"}
                  </button>
                </div>

                {/* Pesan Error */}
                {isError && (
                  <Notification notifikasi={notifikasi} error={error} />
                )}
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TambahDataDanInputTemplate;

interface UploadCardProps {
  title1: string;
  text: string;
  bgColor: string;
  ceklisStatus: boolean;
  htmlForId: string;
  ktpFileName?: string;
  selfieFileName?: string;
  fileNameKTPUploadIcon?: string;
  fileNameSelfieUploadIcon?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  title1,
  text,
  bgColor,
  ceklisStatus,
  htmlForId,
  ktpFileName,
  onChange,
}) => {
  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-black font-semibold text-sm mb-3">
            {title1} <span className="text-red-500">*</span>
          </h2>
          <div>
            <label
              htmlFor={htmlForId}
              className={`${bgColor} active:bg-tulisan cursor-pointer lg:w-[850px] items-center rounded-md flex overflow-hidden justify-between`}
            >
              <div className="bg-ijoToska text-white py-2 w-16 lg:w-20 text-center relative text-xs">
                Pilih File
              </div>
              <div className="absolute left-24 lg:left-36">
                <p className="text-xs text-start">
                  {ktpFileName
                    ? ktpFileName.substring(0, 10)
                    : "No file selected"}
                </p>
              </div>
              <div className="bg-[#d0f9e3] py-2 w-24 lg:w-32 text-center text-xs">
                .jpg, .jpeg, .png
              </div>
            </label>
            <input
              type="file"
              name={htmlForId}
              id={htmlForId}
              className="hidden"
              onChange={onChange}
            />
            <div
              className={`text-slate-500 mt-3 flex justify-between ${
                ceklisStatus ? "" : "hidden"
              }`}
            >
              <div className="text-xs w-48 lg:w-[450px]">{text}</div>
              <div className="text-end flex gap-x-2 items-center">
                <div>
                  <Image
                    src="/assets/dashboard/permintaan/info.png"
                    width={16}
                    height={16}
                    alt="info"
                  />
                </div>
                <div className="text-xs">Max 1 MB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Notification: React.FC<{ notifikasi: boolean; error: string }> = ({
  notifikasi,
  error,
}) => (
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
