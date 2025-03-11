import Menu from "./Menu";
import List from "../atoms/List";
import Button from "../atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getButtonAttributes } from "../../utils/getElementAttributes";

interface IProps {
  itemIndex?: number;
  onAction: (itemId: number, key: string) => void;
}

export default function Dropdown({ itemIndex, onAction }: IProps) {
  let menuPosition = "dropdown-left dropdown-end";

  if (itemIndex === 1) {
    menuPosition = "dropdown-end";
  }

  const buttonDeleteAttr = {
    ...getButtonAttributes({
      type: "button",
      onClick: () => onAction(itemIndex as number, "DESTROY"),
    }),
  };

  const buttonSetHearingAttr = {
    ...getButtonAttributes({
      type: "button",
      onClick: () => onAction(itemIndex as number, "SET_HEARING"),
    }),
  };

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
            "dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",
        }}
      >
        <List>
          <Button attributes={buttonSetHearingAttr}>Tentukan Sidang</Button>
        </List>
        <List>
          <Button attributes={buttonDeleteAttr}>Hapus</Button>
        </List>
      </Menu>
    </div>
  );
}
