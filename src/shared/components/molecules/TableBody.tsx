import { HTMLAttributes, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  attributes?: HTMLAttributes<HTMLTableSectionElement>;
}

export default function TableBody({ children, attributes }: IProps) {
  const defaultTableBody = (
    <tr>
      <th>1</th>
      <td>Row 1</td>
      <td>Row 1</td>
      <td>Row 1</td>
      <td>Row 1</td>
    </tr>
  );
  return (
    <tbody {...attributes}>{children ? children : defaultTableBody}</tbody>
  );
}
