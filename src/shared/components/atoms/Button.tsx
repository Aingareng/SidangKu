import React, { ForwardedRef } from "react";

interface IProps {
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  ref?: ForwardedRef<HTMLButtonElement>;
}

const Button = ({ attributes, children, ref }: IProps) => {
  return (
    <button ref={ref} {...attributes}>
      {children}
    </button>
  );
};

export default Button;
