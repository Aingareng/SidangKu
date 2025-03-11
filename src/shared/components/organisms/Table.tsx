import { HTMLAttributes, ReactNode } from "react";
import TableHead from "../molecules/TableHead";
import {
  TableBodyAttributes,
  TableHeadAttributes,
} from "../../libs/elementAttributes";
import TableBody from "../molecules/TableBody";

interface IProps {
  tableHead: ReactNode;
  children: ReactNode;
  attributes?: HTMLAttributes<HTMLTableElement>;
}

export default function Table({ tableHead, children, attributes }: IProps) {
  TableHeadAttributes.className = "bg-primary *:text-white";

  const defaultTableHead = (
    <tr>
      <th></th>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
      <th>Column 4</th>
    </tr>
  );

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
    <table {...attributes}>
      {/* head */}
      <TableHead attributes={TableHeadAttributes}>
        {tableHead ? tableHead : defaultTableHead}
      </TableHead>
      <TableBody attributes={TableBodyAttributes}>
        {/* row 1 */}

        {children ? children : defaultTableBody}
      </TableBody>
    </table>
  );
}
