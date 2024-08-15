import React from "react";

const DropDownRegister = () => {
  return (
    <div className="w-48">
      <select
        id="fruits"
        name="fruits"
        className={`block text-sm w-[200px] rounded-md border-gray-300 bg-[#F5F5F5] p-2 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default DropDownRegister;
