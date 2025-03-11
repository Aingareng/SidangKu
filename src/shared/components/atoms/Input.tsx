import React from "react";

interface IProps {
  attributes: React.InputHTMLAttributes<HTMLInputElement>;
  chidlren?: React.ReactNode;
}

const Input = ({ attributes, chidlren }: IProps) => {
  return (
    <>
      {chidlren}
      <input {...attributes} />
    </>
  );
};

export default Input;
