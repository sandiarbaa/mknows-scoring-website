import React from "react";

interface Props {
  type: string;
  htmlForId: string;
  placeholder: string;
  classStyleInput: string;
  inputState?: boolean;
  classStyleInputTrue?: string;
}
const Input = ({
  type,
  htmlForId,
  placeholder,
  classStyleInput,
  inputState,
  classStyleInputTrue,
}: Props) => {
  return (
    <input
      type={type}
      id={htmlForId}
      placeholder={placeholder}
      // className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
      className={`${classStyleInput} ${inputState ? classStyleInputTrue : ""}`}
      required
      autoComplete="off"
      autoFocus
    />
  );
};

export default Input;
