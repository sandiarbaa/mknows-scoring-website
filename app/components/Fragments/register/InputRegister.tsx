import React, { useState } from "react";
import Image from "next/image";

type InputRegisterProps = {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: File;
};

const InputRegister = ({ title, onChange, fileName }: InputRegisterProps) => {
  return (
    <div className="w-full">
      <div>
        <div>
          <p className="text-sm md:text-base">
            {title}
            <span className="text-red-500">*</span>
          </p>
        </div>
        <div>
          <div className="flex flex-col md:flex-row md:items-center text-xs md:text-sm">
            {/* Tombol Pilih File */}
            <label className="cursor-pointer bg-ijoToska text-white rounded-l py-1.5 px-4 text-xs md:text-sm inline-block">
              Pilih File
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={onChange}
              />
            </label>

            {/* Teks Tidak Ada File yang Dipilih */}
            <span className="flex-grow bg-gray-100 border border-gray-300 text-tulisan py-1.5 px-4 text-xs md:text-sm inline-block">
              {fileName ? fileName.name : "Tidak ada file yang dipilih"}
            </span>

            {/* Kotak Hijau Muda dengan Format Gambar */}
            <span className="bg-green-100 text-green-700 rounded-r py-1.5 px-4 text-xs md:text-sm md:mr-3">
              .jpg, .jpeg, .png
            </span>

            <Image
              src="/assets/dashboard/register/help-hover.png"
              alt="none"
              width={20}
              height={20}
              className="md:w-8 md:h-8"
            />
          </div>

          <div className="flex justify-between mt-2">
            <div className="text-xs md:text-sm text-tulisan">
              *Pastikan Pas foto dapat terlihat dengan jelas dan pencahayaan
              yang baik
            </div>
            <div className="flex flex-row gap-x-1">
              <Image
                src="/assets/dashboard/register/info.png"
                alt="none"
                width={16}
                height={16}
                layout="fixed"
                className="w-3 h-3 md:w-4 md:h-4"
                style={{ objectFit: "contain" }}
              />
              <span className="text-tulisan text-xs md:text-sm">Max 3 MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRegister;
