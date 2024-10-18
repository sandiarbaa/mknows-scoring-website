import React, { useEffect, useState } from "react";

type Props = {
  setJenisKelamin: React.Dispatch<React.SetStateAction<string>>;
  selectedValue?: string;
};

const DropDownJenisKelamin = ({ setJenisKelamin, selectedValue }: Props) => {
  const [value, setValue] = useState(selectedValue || "");

  useEffect(() => {
    if (selectedValue !== undefined) {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  useEffect(() => {
    setJenisKelamin(value);
  }, [value, setJenisKelamin]);

  return (
    <div className="w-48">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`block text-sm w-[200px] rounded-md border-gray-300 bg-[#F5F5F5] p-2 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      >
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
    </div>
  );
};

export default DropDownJenisKelamin;
