"use client";
import InputForm from "@/Components/Elements/Input";
import FormForgotPassword from "@/Components/Fragments/FormForgotPassword";
import FormLogin from "@/Components/Fragments/FormLogin";
import FormShell from "@/Components/Fragments/FormShell";
import MainLayout from "@/Components/Layouts/MainLayout";
import Image from "next/image";
import React from "react";

const forgot = () => {
  return (
    <MainLayout title="LUPA KATA SANDI">
      <FormShell>
        <InputForm type="email" textLabel="Email" placeholder="Masukan Email" />
        <button
          type="submit"
          className="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]"
        >
          Kirim
        </button>
      </FormShell>
    </MainLayout>
    // <div className="w-full bg-primary h-screen relative overflow-hidden">
    //   <div className="fixed top-0 left-0 m-5">
    //     <Image
    //       src="/assets/mknows_logo.png"
    //       alt="mknows-logo"
    //       width={100}
    //       height={100}
    //     />
    //   </div>
    //   <div className="container flex flex-col justify-center items-center h-full z-10">
    //     {/* Form */}
    //     <div className="w-full max-w-xs md:max-w-md bg-white shadow px-7 py-10 z-20 border-2 rounded-md">
    //       <h1 className="text-center text-[24px] md:text-[30px] font-bold text-ijoToska mb-10">
    //         LUPA KATA SANDI
    //       </h1>
    //       {/* <FormForgotPassword /> */}
    //       <FormShell>
    //         <InputForm
    //           type="email"
    //           textLabel="Email"
    //           placeholder="Masukan Email"
    //         />
    //         <button
    //           type="submit"
    //           className="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]"
    //         >
    //           Kirim
    //         </button>
    //       </FormShell>
    //     </div>

    //     {/* Title */}
    //     <h1 className="text-ijoToska font-semibold absolute bottom-5">
    //       PT Menara Indonesia
    //     </h1>

    //     {/* Reactangle */}
    //     <div>
    //       <Image
    //         src="/assets/reactangle.png"
    //         alt="reactangle1"
    //         width={350}
    //         height={350}
    //         className="absolute bottom-0 left-52"
    //       />
    //       <Image
    //         src="/assets/reactangle.png"
    //         alt="reactangle2"
    //         width={200}
    //         height={200}
    //         className="absolute -top-28 right-0 rotate-180"
    //       />
    //       <Image
    //         src="/assets/reactangle.png"
    //         alt="reactangle3"
    //         width={200}
    //         height={200}
    //         className="absolute top-0 rotate-180 -right-24"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default forgot;
