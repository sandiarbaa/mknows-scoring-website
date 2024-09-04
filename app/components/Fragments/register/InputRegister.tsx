import Image from "next/image";

type InputRegisterProps = {
  title: string;
};

const InputRegister = ({ title }: InputRegisterProps) => {
  return (
    <div>
      <div>
        <div>
          <p className="text-sm">
            {title}
            <span className="text-red-500">*</span>
          </p>
        </div>
        <div className="flex items-center">
          {/* Tombol Pilih File */}
          <label className="cursor-pointer bg-ijoToska text-white py-1.5 px-4 rounded-l inline-block">
            Pilih File
          </label>

          {/* Teks Tidak Ada File yang Dipilih */}
          <span className="flex-grow bg-gray-100 border border-gray-300 text-gray-700 py-1.5 px-4 inline-block">
            Tidak ada file yang dipilih
          </span>
          {/* Kotak Hijau Muda dengan Format Gambar */}
          <span className="bg-green-100 text-green-700 py-1.5 px-4 rounded-r mr-3">
            .jpg, .jpeg, .png
          </span>
          <Image
            src="/assets/dashboard/register/help-hover.png"
            alt="none"
            width={45}
            height={45}
          />
        </div>
        <div className="flex justify-between">
          <div className="text-xs text-tulisan">
            *Pastikan Pas foto dapat terlihat dengan jelas dan pencahayaan yang
            baik
          </div>
          <div className="flex flex-row">
            <Image
              src="/assets/dashboard/register/info.png"
              alt="none"
              width={20}
              height={20}
            />
            <span className="text-tulisan text-xs">Max 3 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRegister;
