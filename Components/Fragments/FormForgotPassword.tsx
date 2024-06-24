import React, { useState } from "react";
import InputForm from "../Elements/Input";

const FormForgotPassword = () => {
  // const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   const passwordInput = event.target.password.value;

  //   if (passwordInput !== "correct_password") {
  //     // Ganti dengan logika validasi password Anda
  //     setIsPasswordInvalid(true);
  //   } else {
  //     setIsPasswordInvalid(false);
  //     // Lakukan sesuatu jika login berhasil, misalnya mengarahkan pengguna ke halaman lain
  //   }
  // };

  return (
    <form>
      <InputForm type="email" textLabel="Email" placeholder="Masukan Email" />

      <button
        type="submit"
        className="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]"
      >
        Kirim
      </button>
    </form>
  );
};

export default FormForgotPassword;
