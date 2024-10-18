"use client";

import api from "@/app/(pages)/(auth)/login/api";
import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";
import DropDownRegister from "@/app/(pages)/(auth)/register/DropDownRegister";
import DropDownJenisKelamin from "@/app/components/Fragments/register/DropDownJenisKelamin";
import FieldRegister from "@/app/components/Fragments/register/FieldRegister";
import InputRegister from "@/app/components/Fragments/register/InputRegister";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const TambahUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nik, setNik] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [jenisKelamin, setJenisKelamin] = useState<string>("male");
  const [ktpPhoto, setKtpPhoto] = useState<File>();
  const [selfiePhoto, setSefliePhoto] = useState<File>();
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [nikError, setNikError] = useState<string | null>(null); // State untuk pesan error NIK
  const pathname = usePathname();

  const handleFieldNik = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Validasi: Hanya angka dan maksimal 16 karakter
    if (/^\d*$/.test(value) && value.length <= 16) {
      setNik(value);
      setNikError(null); // Reset error jika input valid
    } else if (value.length > 16) {
      setNikError("NIK harus terdiri dari 16 angka.");
    } else {
      setNikError("NIK hanya boleh berisi angka.");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleKonfirmasiPassword = () => {
    setShowKonfirmasiPassword(!showKonfirmasiPassword);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNik = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNik(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleKonfirmasiPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSelfiePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ambil file pertama dari input
    if (file) {
      setSefliePhoto(file); // Simpan file di state
    }
  };
  const handleKtpPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ambil file pertama dari input
    if (file) {
      setKtpPhoto(file); // Simpan file di state
    }
  };

  const Auth = async (e: any) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (nik.length !== 16) {
      setNikError("NIK harus terdiri dari 16 angka.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("nik", nik);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("role", role);
    formData.append("jenis_kelamin", jenisKelamin);
    if (ktpPhoto) formData.append("ktp_photo", ktpPhoto); // Tambah file KTP
    if (selfiePhoto) formData.append("selfie_photo", selfiePhoto); // Tambah file Selfie

    try {
      const response = await api.post("/users", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("success");
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message);
      setStatus("error");
    }
    setTimeout(() => {
      setMessage(null);
      setStatus(null);
      setNikError("");
    }, 3000);
  };

  return (
    <>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div className="py-6 px-10">
            {message && (
              <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md px-4 py-2 rounded-lg shadow-md text-center ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {message}
              </div>
            )}
            {/* Navigasi */}
            <div className="flex items-center w-full py-3 max-w-xs space-x-1">
              <Link
                href="/register"
                className="text-sm font-semibold text-tulisan"
              >
                Data User
              </Link>
              <BiChevronRight className="text-2xl text-tulisan" />
              <Link
                href="/register/tambahUser"
                className="text-sm font-semibold text-ijoToska"
              >
                Tambah Account
              </Link>
              <BiChevronRight className="text-2xl text-tulisan" />
            </div>
            <div className="text-sm font-semibold flex justify-between py-4">
              <div>Tambah User Baru</div>
              <div>
                <button
                  type="submit"
                  onClick={Auth}
                  className="bg-ijoToska active:bg-tulisan text-sm rounded font-semibold text-white py-2 text-center px-5"
                >
                  Tambah User
                </button>
              </div>
            </div>

            {/* Tambah User */}
            <div className="flex flex-col gap-y-5">
              <FieldRegister
                title="Nama Lengkap Harus Sesuai KTP"
                name="name"
                placeholder="Masukkan Nama Lengkap"
                type="text"
                lowerText="Nama Sesuai KTP"
                onChange={handleUsername}
              />
              <div>
                <FieldRegister
                  title="Nomor Induk Kependudukan"
                  name="NIK"
                  placeholder="Ketik Nomor Induk Kependudukan"
                  type="text"
                  lowerText="Nomor Induk Kependudukan(NIK) Harus Sesuai KTP"
                  onChange={handleNik}
                />
                {nikError && (
                  <p className="text-red-500 text-xs pt-1">{nikError}</p>
                )}
              </div>
              <FieldRegister
                title="Email"
                name="email"
                placeholder="Ketik Email"
                type="email"
                lowerText="contoh:usercreditscoring@gmail.com"
                onChange={handleEmail}
              />
              <div>
                <FieldRegister
                  title="Password"
                  name="password"
                  placeholder="Ketik Password"
                  type={showPassword ? "text" : "password"}
                  lowerText="Password harus berisi satu huruf kapital, dan berisikan angka"
                  onChange={handlePassword}
                />
                <button
                  className="flex flex-row gap-x-4"
                  onClick={togglePassword}
                >
                  <Image
                    src={"/assets/dashboard/register/eye.png"}
                    width={20}
                    height={20}
                    alt="eye"
                  />
                  <p className="text-xs pt-0.5">Tampilkan Password</p>
                </button>
              </div>
              <div>
                <FieldRegister
                  title="konfirmasi Password"
                  name="password"
                  placeholder="Ketik Konfirmasi Password"
                  type={showKonfirmasiPassword ? "text" : "password"}
                  lowerText="Password harus berisi satu huruf kapital, dan berisikan angka"
                  onChange={handleKonfirmasiPassword}
                />
                <button
                  className="flex flex-row gap-x-4"
                  onClick={toggleKonfirmasiPassword}
                >
                  <Image
                    src={"/assets/dashboard/register/eye.png"}
                    alt="eye"
                    width={20}
                    height={20}
                  />
                  <p className="text-xs pt-0.5">Tampilkan Password</p>
                </button>

                <div className="pt-4">
                  <p className="text-sm text-grey-300">
                    Pilih Jenis kelamin Anda
                  </p>
                  <DropDownJenisKelamin setJenisKelamin={setJenisKelamin} />
                </div>

                <div className="pt-4">
                  <p className="text-sm text-grey-300">Pilih Role Anda</p>
                  <DropDownRegister setRole={setRole} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4 mt-4 w-full">
              <InputRegister
                title={"PasFoto"}
                onChange={handleKtpPhoto}
                fileName={ktpPhoto}
              />
              <InputRegister
                title={"PasSelfie"}
                onChange={handleSelfiePhoto}
                fileName={selfiePhoto}
              />
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </>
  );
};

export default TambahUser;
