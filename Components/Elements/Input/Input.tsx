import React from "react";

interface Props {
  type: string;
  placeholder: string;
}
const Input = ({ type, placeholder }: Props) => {
  return (
    <input
      type={type}
      id={type}
      placeholder={placeholder}
      className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
      required
      autoComplete="off"
    />
  );
};

export default Input;
