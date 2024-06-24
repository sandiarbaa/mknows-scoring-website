import React from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
const FormShell = ({ children, onSubmit }: FormProps) => {
  return (
    <form action="" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormShell;
