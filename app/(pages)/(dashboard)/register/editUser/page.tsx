"use client";

import api from "@/app/(pages)/(auth)/login/api";
import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";
import FieldRegister from "@/app/components/Fragments/register/FieldRegister";
import InputRegister from "@/app/components/Fragments/register/InputRegister";
// import ModalSuksess from "@/app/components/Fragments/register/ModalSuksess";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const EditUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] =
    useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "error">("error");
  const [msg, setMsg] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [KonfirmasipPassword, setKonfirmasiPassword] = useState<string>("");
  const [nik, setNik] = useState<string>("user");
  const [role, setRole] = useState<string>("user");
  const pathname = usePathname();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleKonfirmasiPassword = () => {
    setShowKonfirmasiPassword(!showKonfirmasiPassword);
  };
  const Auth = async (e: any) => {
    const accessToken = localStorage.getItem("accessToken");

    e.preventDefault();
    try {
      const response = await api.post(
        "/users",
        {
          username: username,
          nik: nik,
          email: email,
          password: password,
          KonfirmasipPassword: KonfirmasipPassword,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setMsg(response.data.message);
      setIsModalVisible(true);
      setStatus("success");
    } catch (error: any) {
      setMsg(error.response.data.message);
      setIsModalVisible(true);
      setStatus("error");
    }
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
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleKonfirmasiPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKonfirmasiPassword(e.target.value);
  };

  // const handleCloseModal = () => {
  //   setIsModalVisible(false); // Fungsi untuk menutup modal
  // };

  return (
    <>
      <ProtectedRoute>
        <DashboardLayout hover={pathname}>
          <div className="p-8">
            {/* <ModalSuksess
              status={status}
              bgColor="bg-ijoToska"
              msg={msg}
              onClose={isModalVisible}
            /> */}
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
            <form onSubmit={Auth}>
              <div className="text-sm font-semibold flex justify-between py-4">
                <div>Tambah User Baru</div>
                <div>
                  <Link
                    href="#"
                    className="bg-ijoToska active:bg-tulisan text-sm rounded font-semibold text-white py-2 text-center px-10"
                  >
                    Simpan
                  </Link>
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
              </div>
            </form>

            <div className="flex flex-col gap-y-4 mt-4 w-full">
              <InputRegister title="PasFoto" />
              <InputRegister title="PasSelfie" />
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    </>
  );
};

export default EditUser;
