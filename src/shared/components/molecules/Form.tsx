import React from "react";

interface IProps {
  attributes?: React.FormHTMLAttributes<HTMLFormElement>;
  children: React.ReactNode;
  [key: string]: unknown;
}

const Form = ({ attributes, children, ...other }: IProps) => {
  return (
    <form {...attributes} {...other}>
      {children}
    </form>
  );
};

export default Form;
