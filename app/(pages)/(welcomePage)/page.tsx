import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="bg-primary relative min-h-screen container mx-auto h-[800px] w-full flex justify-center items-center">
      {/* Image Logo */}
      <div className="p-5 absolute top-0 left-0">
        <Image
          src="/assets/login/mknows_logo.png"
          width={500}
          height={200}
          alt="mknows_logo"
          style={{ width: "100px", height: "auto" }}
        />
      </div>

      {/* Image Reactangle */}
      <div>
        <Image
          src="/assets/welcomePage/rectangle-1.png"
          width={300}
          height={300}
          alt="rectangle-1"
          style={{ width: "150px", height: "auto" }}
          className="absolute top-0 right-0"
        />
        <Image
          src="/assets/welcomePage/rectangle-2.png"
          width={300}
          height={300}
          alt="rectangle-1"
          style={{ width: "140px", height: "auto" }}
          className="absolute top-0 right-0"
        />
        <Image
          src="/assets/welcomePage/rectangle-3.png"
          width={300}
          height={300}
          alt="rectangle-1"
          style={{ width: "500px", height: "auto" }}
          className="absolute bottom-0 left-0"
        />
        <Image
          src="/assets/welcomePage/rectangle-4.png"
          width={300}
          height={300}
          alt="rectangle-1"
          style={{ width: "200px", height: "auto" }}
          className="absolute bottom-0 left-0"
        />

        <div className="">
          <Image
            src="/assets/welcomePage/permintaan.png"
            width={600}
            height={600}
            alt="rectangle-1"
            className="absolute bottom-0 left-24 lg:left-[450px] responsive-image-permintaan"
          />
          <Image
            src="/assets/welcomePage/dashboard.png"
            width={700}
            height={700}
            alt="rectangle-1"
            className="absolute bottom-0 left-1 lg:left-[150px] responsive-image-dashboard"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center items-center w-full mb-40 lg:mb-80">
        <h1 className="font-bold text-black text-3xl mb-2 text-center">
          Selamat Datang di <br className="md:hidden" /> M-Knows
        </h1>
        <h1 className="font-bold text-ijoToska text-3xl">AI Credit Skoring</h1>
        <div className="w-[300px] lg:w-[800px] mt-5">
          <p className="text-xs text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <Link
          href="/login"
          className="bg-ijoToska text-white text-center font-semibold w-52 py-2.5 rounded-md hover:bg-tulisan transition duration-300 text-sm mt-5"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
