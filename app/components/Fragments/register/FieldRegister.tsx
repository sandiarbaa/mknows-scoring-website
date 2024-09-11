import React from "react";

type FieldRegisterProps = {
  title: string;
  type: string;
  name: string;
  placeholder: string;
  lowerText: string;
};

const FieldRegister = ({
  title,
  name,
  type,
  placeholder,
  lowerText,
}: FieldRegisterProps) => {
  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-0.5">
          <p className="text-sm text-grey-300">{title}</p>
          <input
            type={type}
            name={name}
            id="name"
            className="border text-sm w-full py-2.5 rounded-md px-3"
            placeholder={placeholder}
          />
          <p className="text-xs text-ijoToska">{lowerText}</p>
        </div>
      </div>
    </div>
  );
};

export default FieldRegister;
