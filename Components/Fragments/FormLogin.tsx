import Image from "next/image";
import React, { useState } from "react";
import InputForm from "../Elements/Input";

interface Props {
  handleSubmit?: (event: any) => void;
}
const FormLogin = ({ handleSubmit }: Props = {}) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputForm type="email" textLabel="Email" placeholder="Masukan Email" />
      <InputForm
        type="password"
        textLabel="Password"
        placeholder="Masukan Kata Sandi"
      />
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
          type="submit"
          className="w-full flex justify-center space-x-5 bg-white text-tulisan font-medium py-2 rounded-md shadow-md active:bg-[#E5E5E5] active:text-[#A3A3A3]"
        >
          <Image
            src="/assets/google-login.png"
            alt="google-logo"
            width={25}
            height={25}
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
