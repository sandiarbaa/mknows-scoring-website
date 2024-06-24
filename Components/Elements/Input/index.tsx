import React from "react";
import Label from "./Label";
import Input from "./Input";

interface Props {
  type: string;
  textLabel: string;
  placeholder: string;
}
const InputForm = ({ type, textLabel, placeholder }: Props) => {
  return (
    <div className="flex flex-col mb-3">
      <Label type={type} textLabel={textLabel} />
      <Input type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputForm;
