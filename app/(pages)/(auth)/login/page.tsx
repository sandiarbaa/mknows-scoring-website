"use client";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Button from "@/app/components/Elements/Button";
import InputCheckbox from "@/app/components/Elements/InputCheckbox";
import LoginLayout from "@/app/components/Layouts/LoginLayout";
import api from "./api";
import ModalAuth from "./modalAuth/ModalAuth";

const LoginPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  const auth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/authentication", {
        email,
        password,
      });
      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data.data;
        const accessToken1 = accessToken;

        localStorage.setItem("accessToken", accessToken);
        document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; max-age=${
          30 * 24 * 60 * 60
        }`;

        setToken(response.data.data.accessToken);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setMsg(error.response.data.message);
      setIsVisible(true);

      // Tambahkan setTimeout untuk reset isVisible ke false setelah durasi
      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Waktu yang sama dengan duration di ModalAuth
    }
  };

  return (
    <div>
      <LoginLayout title="MASUK">
        <ModalAuth duration={5000} isVisible={isVisible} msg={msg} />
        <form onSubmit={auth}>
          {/* Email */}
          <div className="flex flex-col mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-2">
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Checkbox Remember Me */}
          <div className="flex items-center ml-2 mt-5">
            <InputCheckbox
              checkboxValue={checkboxValue}
              setCheckboxValue={setCheckboxValue}
            />
            <span
              className="text-tulisan text-sm ml-1 cursor-pointer"
              onClick={() => setCheckboxValue(!checkboxValue)}
            >
              Ingatkan Saya
            </span>
          </div>

          {/* Link Forgot Password */}
          <Link href="/login/forgot-password">
            <h1 className="text-ijoToska text-sm my-5">Lupa Kata Sandi?</h1>
          </Link>

          <div>
            <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
              Masuk
            </Button>
          </div>
        </form>
      </LoginLayout>
    </div>
  );
};

export default LoginPage;
