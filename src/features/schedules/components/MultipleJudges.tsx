import { ChangeEvent, memo, useEffect, useState } from "react";
import Button from "../../../shared/components/atoms/Button";
import Input from "../../../shared/components/atoms/Input";
import Label from "../../../shared/components/atoms/Label";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  onSendJudges: (plaintiff: string[]) => void;
}

function MultipleJudges({ onSendJudges }: IProps) {
  const [fieldJudges, setFieldJudges] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([]);

  function handleTextInputChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const value = event.target.value;

    setEnteredValue((prev) => {
      const newValues = [...prev];
      newValues[index] = value; // Simpan hanya nilai input
      return newValues;
    });
  }

  function handleAddField() {
    setFieldJudges((prev) => [...prev, prev.length + 1]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onSendJudges(enteredValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue, onSendJudges]);

  return (
    <>
      {fieldJudges.map((item, index) => (
        <Label key={item} labelType="form-control" leftLabel={`Hakim ${item}`}>
          <Input
            attributes={{
              type: "text",
              className: "input input-bordered w-full",
              placeholder: "Masukan Nama Hakim",
              value: enteredValue[index] || "", // Pastikan tidak undefined
              onChange: (e) => handleTextInputChange(e, index),
            }}
          />
        </Label>
      ))}
      <Button
        attributes={{
          className: "btn btn-primary btn-outline btn-sm",
          onClick: handleAddField,
        }}
      >
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        Tambah
      </Button>
    </>
  );
}

export default memo(MultipleJudges);
