"use client";
import InputForm from "@/Components/Elements/Input";
import FormShell from "@/Components/Fragments/FormShell";
import LoginLayout from "@/Components/Layouts/LoginLayout";
import React from "react";

const forgot = () => {
  return (
    <LoginLayout title="LUPA KATA SANDI">
      <FormShell>
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
