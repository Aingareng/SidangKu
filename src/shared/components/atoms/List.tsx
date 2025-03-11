import React from "react";

interface IProps {
  children: React.ReactNode;
  attributes?: React.HTMLAttributes<HTMLLIElement>;
}

export default function List({ attributes, children }: IProps) {
  return <li {...attributes}>{children}</li>;
}
