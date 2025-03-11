import { HTMLAttributes } from "react";

interface IProps {
  children: React.ReactNode;
  label: string | React.ReactNode;
  attributes?: HTMLAttributes<HTMLDetailsElement>;
}

export default function Submenu({
  label = "Parent",
  children,
  attributes,
}: IProps) {
  return (
    <details {...attributes}>
      <summary>{label}</summary>
      {children}
    </details>
  );
}
