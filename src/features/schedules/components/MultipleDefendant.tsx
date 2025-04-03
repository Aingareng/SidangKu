import { ChangeEvent, memo, useEffect, useState } from "react";
import Button from "../../../shared/components/atoms/Button";
import Label from "../../../shared/components/atoms/Label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import Select from "../../../shared/components/atoms/Select";

interface IProps {
  onSendDefendant: (plaintiff: string[]) => void;
  personnals: IPersonnelDataTable[];
}

function MultipleDefendant({ onSendDefendant, personnals }: IProps) {
  const [fieldDefendant, setFieldDefendant] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>(["none"]);

  function handleSelectInputChange(
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) {
    const value = event.target.value;

    setEnteredValue((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  }

  function handleAddField() {
    setFieldDefendant((prev) => [...prev, prev.length + 1]);
    setEnteredValue((prev) => [...prev, "none"]);
  }

  const defendants = personnals.filter((item) => item.role_name === "tergugat");

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "none");

      onSendDefendant(filteredValues);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue, onSendDefendant]);

  return (
    <>
      {fieldDefendant.map((item, index) => (
        <Label
          key={item}
          labelType="form-control"
          leftLabel={`Tergugat ${item}`}
        >
          <Select
            attr={{
              className: "select select-bordered w-full ",
              value: enteredValue[index] || "none",
              onChange: (e) => handleSelectInputChange(e, index),
            }}
          >
            <option value="none" disabled>
              {" "}
              Pilih satu
            </option>
            {defendants.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </Label>
      ))}
      <Button
        attributes={{
          className: "btn btn-primary btn-outline btn-sm",
          onClick: handleAddField,
          disabled: defendants.length === 1,
        }}
      >
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        Tambah
      </Button>
    </>
  );
}

export default memo(MultipleDefendant);
