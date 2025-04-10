import { ChangeEvent, memo, ReactNode, useEffect, useState } from "react";
import Button from "../../../shared/components/atoms/Button";
import Label from "../../../shared/components/atoms/Label";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "../../../shared/components/atoms/Select";
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";

interface IProps {
  errorMessage?: ReactNode;
}

function MultiplePlaintiff({ errorMessage }: IProps) {
  const [fieldPlaintiff, setFieldPlaintiff] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([""]);
  const [personnals] = useLocalStorage("personnels", []);

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
    setFieldPlaintiff((prev) => [...prev, prev.length + 1]);
    setEnteredValue((prev) => [...prev, ""]);
  }

  const plaintiffs = personnals.filter(
    (item: IPersonnelDataTable) => item.role_name.toLowerCase() === "penggugat"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "");

      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          plaintiff: filteredValues || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          plaintiff: filteredValues || "",
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  return (
    <>
      {fieldPlaintiff.map((item, index) => (
        <Label
          key={item}
          labelType="form-control"
          leftLabel={`Penggugat ${item}`}
          bottomLeftLabel={errorMessage}
        >
          <Select
            attr={{
              className: "select select-bordered w-full",
              value: enteredValue[index] || "",
              onChange: (e) => handleSelectInputChange(e, index),
            }}
          >
            <option value="" disabled>
              {" "}
              Pilih satu
            </option>
            {plaintiffs.map((item: IPersonnelDataTable, index: number) => (
              <option key={index + 1} value={item.id}>
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
          disabled: plaintiffs.length <= 1,
        }}
      >
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        Tambah
      </Button>
    </>
  );
}

export default memo(MultiplePlaintiff);
