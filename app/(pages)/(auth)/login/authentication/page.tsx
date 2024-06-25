import LoginLayout from "@/app/components/Layouts/LoginLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <LoginLayout title="Google Authentication">
      <h1 className="text-ijoToska text-center font-bold text-2xl -mt-5">
        Cek Email Anda
      </h1>
      <Image
        src="/assets/login/email_sent.png"
        alt="email_sent"
        width={75}
        height={75}
        className="mx-auto my-8 md:my-5"
      />
      <p className="text-center text-[18px]">
        Kami telah mengirimkan instruksi pemulihan kata sandi ke Email Anda
      </p>
      <p className="text-center text-[16px] mt-8">
        Tidak menerima link pemulihan kata sandi? <br /> Coba dengan{" "}
        <Link href={"/email-lain"} className="text-blue-500 hover:underline">
          Email Lain
        </Link>
      </p>
    </LoginLayout>
  );
};

export default page;
