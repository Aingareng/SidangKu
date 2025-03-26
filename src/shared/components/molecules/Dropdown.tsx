// components/molecules/Dropdown.tsx
import Menu from "./Menu";
import Button from "../atoms/Button";
import { Icon } from "@iconify/react";

interface IProps {
  itemIndex?: number;
  children: React.ReactNode;
  tableLength?: number;
}

export default function Dropdown({ itemIndex, children, tableLength }: IProps) {
  let menuPosition = "dropdown-left dropdown-end";
  if (itemIndex === 1) {
    menuPosition = "dropdown-end";
  }
  if (itemIndex === 1 && tableLength && tableLength === 1) {
    menuPosition = "dropdown-left dropdown-end";
  }

  return (
    <div className={`dropdown ${menuPosition}`}>
      <Button
        attributes={{
          tabIndex: 0,
          className: "btn m-1 btn-outline btn-primary btn-sm px-1",
        }}
      >
        <Icon icon="material-symbols:more-vert" width="24" height="24" />
      </Button>

      <Menu
        attributes={{
          tabIndex: 0,
          className:
            "dropdown-content shadow-md menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",
        }}
      >
        {children}
      </Menu>
    </div>
  );
}
