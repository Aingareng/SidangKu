import { ReactNode, SelectHTMLAttributes } from "react";

interface IProps {
  attr: SelectHTMLAttributes<HTMLSelectElement>;
  children: ReactNode;
}

export default function Select({ children, attr }: IProps) {
  const defaultChildren = (
    <>
      <option value="" disabled>
        Chose item
      </option>
      <option value="item-1">item 1</option>
      <option value="item-2">item 2</option>
    </>
  );

  return <select {...attr}>{children ? children : defaultChildren}</select>;
}
