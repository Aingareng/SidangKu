import React from "react";

interface IProps {
  attributes?: React.HTMLAttributes<HTMLMenuElement>;
  children: React.ReactNode;
}

export default function Menu({ children, attributes }: IProps) {
  return <menu {...attributes}>{children}</menu>;
}
