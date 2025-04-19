import { ChangeEvent, memo, ReactNode, useEffect, useState } from "react";
import Button from "../../../shared/components/atoms/Button";
import Label from "../../../shared/components/atoms/Label";
import { Icon } from "@iconify/react/dist/iconify.js";

import Select from "../../../shared/components/atoms/Select";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";
import { IPersonnelDataTable } from "../../personnel/types/personnel";

interface IProps {
  errorMessage?: ReactNode;
  isResetField?: boolean;
  preachedData: IPersonnelDataTable[];
}

function MultiplePreached({
  errorMessage,
  isResetField,
  preachedData,
}: IProps) {
  const [fieldPreached, setFieldPreached] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([""]);
  const [preached, setPreacheds] = useState<IPersonnelDataTable[]>([]);

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
    setFieldPreached((prev) => [...prev, prev.length + 1]);
    setEnteredValue((prev) => [...prev, ""]);
  }

  useEffect(() => {
    if (isResetField) {
      setEnteredValue([]);
      setFieldPreached([1]);
    }
  }, [isResetField]);

  useEffect(() => {
    setPreacheds(() =>
      preachedData.filter(
        (item) => item.role_name.toLowerCase() === "terdakwah"
      )
    );
  }, [preachedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "");

      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          preacheds: filteredValues || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          preacheds: filteredValues || "",
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  return (
    <>
      {fieldPreached.map((item, index) => (
        <Label
          key={item}
          labelType="form-control"
          leftLabel={`Terdakwah ${index + 1}`}
          bottomLeftLabel={errorMessage}
        >
          <Select
            attr={{
              className: "select select-bordered w-full ",
              value: enteredValue[index] || "",
              onChange: (e) => handleSelectInputChange(e, index),
            }}
          >
            <option value="" disabled>
              Pilih satu
            </option>
            {preached.map((item: IPersonnelDataTable) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Label>
      ))}
      <Button
        attributes={{
          type: "button",
          className: "btn btn-primary btn-outline btn-sm",
          onClick: handleAddField,
          disabled: preached.length === 1,
        }}
      >
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        Tambah
      </Button>
    </>
  );
}

export default memo(MultiplePreached);
