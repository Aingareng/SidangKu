import { HTMLAttributes, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  attributes?: HTMLAttributes<HTMLTableSectionElement>;
  hasCheckBox?: boolean;
}

export default function TableHead({
  children,
  attributes,
  hasCheckBox,
}: IProps) {
  const defaultContent = (
    <>
      <th></th>
      <th>Name</th>
      <th>Job</th>
      <th>Favorite Color</th>
    </>
  );

  let headContent = <th>No</th>;

  if (hasCheckBox) {
    headContent = (
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-info" />
        </label>
      </th>
    );
  }

  return (
    <thead {...attributes}>
      <tr>
        {headContent}
        {children ? children : defaultContent}
      </tr>
    </thead>
  );
}
