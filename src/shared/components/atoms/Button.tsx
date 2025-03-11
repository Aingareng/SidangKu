import React from "react";

interface IProps {
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button = ({ attributes, children }: IProps) => {
  return <button {...attributes}>{children}</button>;
};

export default Button;
