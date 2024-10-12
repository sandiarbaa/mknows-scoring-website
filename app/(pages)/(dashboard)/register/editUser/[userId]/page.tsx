"use client";

import api from "@/app/(pages)/(auth)/login/api";
import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";
import DropDownRegister from "@/app/(pages)/(auth)/register/DropDownRegister";
import FieldRegister from "@/app/components/Fragments/register/FieldRegister";
import InputRegister from "@/app/components/Fragments/register/InputRegister";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const EditUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] =
    useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [KonfirmasipPassword, setKonfirmasiPassword] = useState<string>("");
  const [nik, setNik] = useState<string>("user");
  const [role, setRole] = useState<string>("user");
  const [jenisKelamin, setJenisKelamin] = useState<string>("male");
  const [ktpPhoto, setKtpPhoto] = useState<File>();
  const [selfiePhoto, setSefliePhoto] = useState<File>();
  const pathname = usePathname();
  const params = useParams();
  const userId = params.userId;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleKonfirmasiPassword = () => {
    setShowKonfirmasiPassword(!showKonfirmasiPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Mencegah refresh atau submit default dari form

    const formData = new FormData();
    formData.append("username", username);
    formData.append("nik", nik);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", KonfirmasipPassword);
    formData.append("role", role);
    formData.append("jenis_kelamin", jenisKelamin);
    if (ktpPhoto) formData.append("ktp_photo", ktpPhoto); // Tambah file KTP
    if (selfiePhoto) formData.append("selfie_photo", selfiePhoto); // Tambah file Selfie

    const accessToken = localStorage.getItem("accessToken"); // Ganti dengan userId yang sesuai

    try {
      const response = await api.patch(`/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Ini penting saat menggunakan FormData
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
    }, 3000);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNik(e.target.value);
  };
  const handleJenisKelaminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJenisKelamin(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleKonfirmasiPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKonfirmasiPassword(e.target.value);
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

  return (
    <>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div className="p-8">
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
                Edit User
              </Link>
              <BiChevronRight className="text-2xl text-tulisan" />
            </div>

            {/* Edit User */}
            <form onSubmit={handleSubmit}>
              <div className="text-sm font-semibold flex justify-between py-4">
                <div>Tambah User Baru</div>
                <div>
                  <button
                    type="submit"
                    className="bg-ijoToska active:bg-tulisan text-sm rounded font-semibold text-white py-2 text-center px-10"
                  >
                    Simpan
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-y-5">
                <FieldRegister
                  title="Nama Lengkap Harus Sesuai KTP"
                  name="name"
                  placeholder="Masukkan Nama Lengkap"
                  type="text"
                  lowerText="Nama Sesuai KTP"
                  onChange={handleUsernameChange}
                />
                <FieldRegister
                  title="Nomor Induk Kependudukan"
                  name="NIK"
                  placeholder="Ketik Nomor Induk Kependudukan"
                  type="text"
                  lowerText="Nomor Induk Kependudukan(NIK) Harus Sesuai KTP"
                  onChange={handleNikChange}
                />
                <FieldRegister
                  title="Jenis Kelamin"
                  name="Jenis Kelamin"
                  placeholder="Ketik Jenis Kelamin Anda"
                  type="text"
                  lowerText="Jenis Kelamin Harus Sesuai KTP"
                  onChange={handleJenisKelaminChange}
                />
                <FieldRegister
                  title="Email"
                  name="email"
                  placeholder="Ketik Email"
                  type="email"
                  lowerText="contoh:usercreditscoring@gmail.com"
                  onChange={handleEmailChange}
                />
                <div>
                  <FieldRegister
                    title="Password"
                    name="password"
                    placeholder="Ketik Password"
                    type={showPassword ? "text" : "password"}
                    lowerText="Password harus berisi satu huruf kapital, dan berisikan angka"
                    onChange={handlePasswordChange}
                  />
                  <button
                    className="flex flex-row gap-x-4 pt-1"
                    onClick={togglePassword}
                  >
                    <Image
                      src="/assets/dashboard/register/eye.png"
                      alt="eye"
                      width={20}
                      height={20}
                    />
                    <p className="text-xs text-tulisan pt-0.5">
                      Tampilkan Password
                    </p>
                  </button>
                </div>
                <div>
                  <FieldRegister
                    title="konfirmasi Password"
                    name="password"
                    placeholder="Ketik Konfirmasi Password"
                    type={showKonfirmasiPassword ? "text" : "password"}
                    lowerText="Password harus berisi satu huruf kapital, dan berisikan angka"
                    onChange={handleKonfirmasiPasswordChange}
                  />
                  <button
                    className="flex flex-row gap-x-4 pt-1"
                    onClick={toggleKonfirmasiPassword}
                  >
                    <Image
                      src="/assets/dashboard/register/eye.png"
                      alt="eye"
                      width={20}
                      height={20}
                    />
                    <p className="text-xs text-tulisan pt-0.5">
                      Tampilkan Password
                    </p>
                  </button>
                </div>

                <div>
                  <DropDownRegister setRole={setRole} />
                </div>
              </div>
            </form>

            <div className="flex flex-col gap-y-4 mt-4 w-full">
              <InputRegister
                title="PasFoto"
                onChange={handleKtpPhoto}
                fileName={ktpPhoto}
              />
              <InputRegister
                title="PasSelfie"
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

export default EditUser;
