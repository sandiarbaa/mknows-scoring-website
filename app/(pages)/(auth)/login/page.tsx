"use client";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

// Component
import Button from "@/app/components/Elements/Button";
import InputCheckbox from "@/app/components/Elements/InputCheckbox";
import FormShell from "@/app/components/Fragments/FormShell";
import LoginLayout from "@/app/components/Layouts/LoginLayout";
import InputForm from "@/app/components/Elements/InputForm";

const LoginPage: React.FC = () => {
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const router = useRouter();

  // handleSubmit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // event.target di-cast sebagai HTMLFormElement untuk memastikan TypeScript tahu properti password ada di elemen tersebut.
    const passwordInput = (event.target as HTMLFormElement).password.value;

    // ini untuk menampilkan pesan error kalau state isPasswordInvalid bernilai true
    if (passwordInput !== "password") {
      setIsPasswordInvalid(true);
    } else {
      setIsPasswordInvalid(false);
      router.push("/dashboard");
    }
  };

  return (
    <LoginLayout title="MASUK">
      <FormShell onSubmit={handleSubmit}>
        {/* Email */}
        <div className="flex flex-col mb-3">
          <InputForm
            type="email"
            textLabel="Email"
            htmlForId="email"
            placeholder="Masukan Email"
            classStyleLabel="font-semibold mb-2 text-[16px]"
            classStyleInput="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
          />
        </div>

        {/* Password*/}
        <div className="flex flex-col mb-2">
          <InputForm
            type="password"
            textLabel="Password"
            htmlForId="password"
            placeholder="Masukan Kata Sandi"
            classStyleLabel="font-semibold mb-2 text-[16px]"
            classStyleInput="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
            inputState={isPasswordInvalid}
            classStyleInputTrue="focus:border-red-500"
          />

          {/* Pesan error ketika password salah */}
          {isPasswordInvalid && (
            <span className="text-red-500 mt-2 text-sm ml-3">
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

        {/* Button Masuk dan Sign with Google */}
        <div>
          <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
            Masuk
          </Button>

          <Button classStyle="w-full flex justify-center space-x-5 bg-white text-tulisan font-medium py-2 rounded-md shadow-md active:bg-[#E5E5E5] active:text-[#A3A3A3]">
            <Image
              src="/assets/login/google-login.png"
              alt="google-logo"
              width={25}
              height={25}
            />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </FormShell>
    </LoginLayout>
  );
};

export default LoginPage;
