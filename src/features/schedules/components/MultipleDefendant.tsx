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
  defendantData: IPersonnelDataTable[];
}

function MultipleDefendant({
  errorMessage,
  isResetField,
  defendantData,
}: IProps) {
  const [fieldDefendant, setFieldDefendant] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([""]);
  const [defendants, setDefendants] = useState<IPersonnelDataTable[]>([]);

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
    setEnteredValue((prev) => [...prev, ""]);
  }

  useEffect(() => {
    if (isResetField) {
      setEnteredValue([]);
      setFieldDefendant([1]);
    }
  }, [isResetField]);

  useEffect(() => {
    setDefendants(() =>
      defendantData.filter(
        (item) => item.role_name.toLowerCase() === "tergugat"
      )
    );
  }, [defendantData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "");

      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          defendants: filteredValues || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          defendants: filteredValues || "",
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  return (
    <>
      {fieldDefendant.map((item, index) => (
        <Label
          key={item}
          labelType="form-control"
          leftLabel={`Tergugat ${index + 1}`}
          bottomLeftLabel={errorMessage}
        >
          <Select
            attr={{
              className: `select select-bordered w-full ${
                errorMessage ? "select-error" : ""
              }`,
              value: enteredValue[index] || "",
              onChange: (e) => handleSelectInputChange(e, index),
            }}
          >
            <option value="" disabled>
              Pilih satu
            </option>
            {defendants.map((item: IPersonnelDataTable) => (
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
