"use client";
import FormShell from "@/Components/Fragments/FormShell";
import LoginLayout from "@/Components/Layouts/LoginLayout";
import Image from "next/image";
import React, { useState } from "react";
import { PiExclamationMarkFill } from "react-icons/pi";

const LoginPage = () => {
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const passwordInput = event.target.password.value;

    if (passwordInput !== "correct_password") {
      // Ganti dengan logika validasi password Anda
      setIsPasswordInvalid(true);
    } else {
      setIsPasswordInvalid(false);
      // Lakukan sesuatu jika login berhasil, misalnya mengarahkan pengguna ke halaman lain
    }
  };
  return (
    <LoginLayout title="MASUK">
      <FormShell onSubmit={handleSubmit}>
        {/* input-label */}
        <div className="flex flex-col mb-3">
          <label htmlFor="email" className="mb-2 text-[16px] font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Masukan Email"
            className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
            required
            autoComplete="off"
          />
        </div>
        {/* input-label */}
        <div className="flex flex-col mb-2">
          <label htmlFor="password" className="mb-2 text-[16px] font-semibold">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Masukan Password"
            className={`px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan ${
              isPasswordInvalid ? "border-red-500" : ""
            }`}
            required
          />
          {isPasswordInvalid && (
            <span className="text-red-500 mt-2 text-sm ml-3">
              {/* <PiExclamationMarkFill className="inline mr-1" /> */}
              <Image
                src="/assets/login/password-wrong-icon.png"
                alt="error"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              Kata sandi salah
            </span>
          )}
        </div>
        <div className="flex items-center ml-2 mt-5">
          <input type="checkbox" id="remember" className="w-4 h-4 mr-3" />
          <label htmlFor="remember" className="text-sm text-tulisan">
            Ingatkan Saya
          </label>
        </div>
        <h1 className="text-ijoToska text-sm my-5">Lupa Kata Sandi?</h1>
        <div>
          <button
            type="submit"
            className="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]"
          >
            Masuk
          </button>
          <button
            type="button"
            className="w-full flex justify-center space-x-5 bg-white text-tulisan font-medium py-2 rounded-md shadow-md active:bg-[#E5E5E5] active:text-[#A3A3A3]"
          >
            <Image
              src="/assets/login/google-login.png"
              alt="google-logo"
              width={25}
              height={25}
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </FormShell>
    </LoginLayout>
  );
};

export default LoginPage;
