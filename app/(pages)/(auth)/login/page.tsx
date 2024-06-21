// import Image from "next/image";
// import React from "react";

// const LoginPage = () => {
//   return (
//     <div className="w-full bg-primary h-screen relative overflow-hidden">
//       <div className="fixed top-0 left-0 m-5">
//         <Image
//           src="/assets/mknows_logo.png"
//           alt="mknows-logo"
//           width={100}
//           height={100}
//         />
//       </div>
//       <div className="container flex flex-col justify-center items-center h-full z-10">
//         {/* Form */}
//         <div className="w-full max-w-md bg-white shadow px-7 py-10 z-20 border-2 rounded-md">
//           <h1 className="text-center text-[30px] font-bold text-ijoToska">
//             MASUK
//           </h1>
//           {/* input-label */}
//           <form action="">
//             <div className="flex flex-col mb-3">
//               <label htmlFor="email" className="mb-2 text-[16px] font-semibold">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="Masukan Email"
//                 className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
//                 required
//               />
//             </div>
//             {/* input-label */}
//             <div className="flex flex-col mb-2">
//               <label
//                 htmlFor="password"
//                 className="mb-2 text-[16px] font-semibold"
//               >
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="Masukan Password"
//                 className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
//                 required
//               />
//             </div>
//             <div className="flex items-center ml-2">
//               <input type="checkbox" className="w-4 h-4 mr-3" />
//               <label htmlFor="remember" className="text-sm text-tulisan">
//                 Ingatkan Saya
//               </label>
//             </div>
//             <h1 className="text-ijoToska text-sm my-5">Lupa Kata Sandi?</h1>
//             <div>
//               <button className="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
//                 Masuk
//               </button>
//               <button className="w-full flex justify-center space-x-5 bg-white text-tulisan font-medium py-2 rounded-md shadow-md">
//                 <Image
//                   src="/assets/google-login.png"
//                   alt="google-logo"
//                   width={25}
//                   height={25}
//                 />
//                 <span>Sign in with Google</span>
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Title */}
//         <h1 className="text-ijoToska font-semibold absolute bottom-5">
//           PT Menara Indonesia
//         </h1>

//         {/* Reactangle */}
//         <div>
//           <Image
//             src="/assets/reactangle.png"
//             alt="reactangle1"
//             width={350}
//             height={350}
//             className="absolute bottom-0 left-52"
//           />
//           <Image
//             src="/assets/reactangle.png"
//             alt="reactangle2"
//             width={200}
//             height={200}
//             className="absolute -top-28 right-0 rotate-180"
//           />
//           <Image
//             src="/assets/reactangle.png"
//             alt="reactangle3"
//             width={200}
//             height={200}
//             className="absolute top-0 rotate-180 -right-24"
//           />
//         </div>
//       </div>
//     </div>
//   );
//   // #F7FCFB
// };

// export default LoginPage;

"use client";
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
    <div className="w-full bg-primary h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 m-5">
        <Image
          src="/assets/mknows_logo.png"
          alt="mknows-logo"
          width={100}
          height={100}
        />
      </div>
      <div className="container flex flex-col justify-center items-center h-full z-10">
        {/* Form */}
        <div className="w-full max-w-md bg-white shadow px-7 py-10 z-20 border-2 rounded-md">
          <h1 className="text-center text-[30px] font-bold text-ijoToska">
            MASUK
          </h1>
          <form onSubmit={handleSubmit}>
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
              />
            </div>
            {/* input-label */}
            <div className="flex flex-col mb-2">
              <label
                htmlFor="password"
                className="mb-2 text-[16px] font-semibold"
              >
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
                <span className="text-red-500 mt-1 text-sm ml-3">
                  <PiExclamationMarkFill className="inline mr-1" />
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
                className="w-full flex justify-center space-x-5 bg-white text-tulisan font-medium py-2 rounded-md shadow-md"
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
        </div>

        {/* Title */}
        <h1 className="text-ijoToska font-semibold absolute bottom-5">
          PT Menara Indonesia
        </h1>

        {/* Reactangle */}
        <div>
          <Image
            src="/assets/reactangle.png"
            alt="reactangle1"
            width={350}
            height={350}
            className="absolute bottom-0 left-52"
          />
          <Image
            src="/assets/reactangle.png"
            alt="reactangle2"
            width={200}
            height={200}
            className="absolute -top-28 right-0 rotate-180"
          />
          <Image
            src="/assets/reactangle.png"
            alt="reactangle3"
            width={200}
            height={200}
            className="absolute top-0 rotate-180 -right-24"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
