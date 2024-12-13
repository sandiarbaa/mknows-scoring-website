import React, { useEffect, useState } from "react";

type DropDownRegisterProp = {
  setRole: React.Dispatch<React.SetStateAction<string>>;
  selectedValue?: string;
};

const DropDownRegister = ({ setRole, selectedValue }: DropDownRegisterProp) => {
  const [value, setValue] = useState(selectedValue || "");
  useEffect(() => {
    setRole(value);
  }, [value]);
  return (
    <div className="w-48">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`block text-sm w-[200px] rounded-md border-gray-300 bg-[#F5F5F5] p-2 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default DropDownRegister;
