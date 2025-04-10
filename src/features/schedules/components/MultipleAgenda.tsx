import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../shared/components/atoms/Button";
import Input from "../../../shared/components/atoms/Input";
import Label from "../../../shared/components/atoms/Label";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
// import { ISchedulePayload } from "../types/schedules";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";

function MultipleAgenda() {
  const [fieldAgenda, setFieldAgenda] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([]);
  // const [, setValue] = useLocalStorage("newSchedule");

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

  // const handleAddField = useCallback(() => {
  //   setFieldAgenda((prev) => [...prev, prev.length + 1]);
  // }, []);

  function handleAddField() {
    setFieldAgenda((prev) => [...prev, prev.length + 1]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "");
      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          case_detail: filteredValues || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          case_detail: filteredValues || "",
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  return (
    <>
      {fieldAgenda.map((item, index) => (
        <Label key={item} labelType="form-control" leftLabel={`Agenda ${item}`}>
          <Input
            attributes={{
              type: "text",
              className: "input input-bordered w-full",
              placeholder: "Masukan Agenda",
              value: enteredValue[index] || "",
              onChange: (e) => handleTextInputChange(e, index),
            }}
          />
        </Label>
      ))}
      <Button
        attributes={{
          type: "button",
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

export default MultipleAgenda;
