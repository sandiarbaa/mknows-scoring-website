import React from "react";

interface Props {
  type: string;
  textLabel: string;
}
const Label = ({ type, textLabel }: Props) => {
  return (
    <label htmlFor={type} className="mb-2 text-[16px] font-semibold">
      {textLabel} <span className="text-red-500">*</span>
    </label>
  );
};

export default Label;
