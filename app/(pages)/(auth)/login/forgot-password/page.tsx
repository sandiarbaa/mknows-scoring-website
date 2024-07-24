"use client";
import InputForm from "@/app/components/Elements/Input";
import FormShell from "@/app/components/Fragments/FormShell";
import LoginLayout from "@/app/components/Layouts/LoginLayout";
import { useRouter } from "next/navigation";
import React from "react";

const forgot = () => {
  const router = useRouter();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push("/login/authentication");
  };
  return (
    <LoginLayout title="LUPA KATA SANDI">
      <FormShell onSubmit={handleSubmit}>
        <InputForm type="email" textLabel="Email" placeholder="Masukan Email" />
        <button
          type="submit"
          className="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]"
        >
          Kirim
        </button>
      </FormShell>
    </LoginLayout>
  );
};

export default forgot;
