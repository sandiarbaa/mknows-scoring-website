import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  classStyle: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, classStyle, isLoading }) => {
  return (
    <button
      type="submit"
      className={`${classStyle} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
