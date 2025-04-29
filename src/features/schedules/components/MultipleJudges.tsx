import { ChangeEvent, memo, ReactNode, useEffect, useState } from "react";
import Button from "../../../shared/components/atoms/Button";

import Label from "../../../shared/components/atoms/Label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import Select from "../../../shared/components/atoms/Select";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";

interface IProps {
  errorMessage?: ReactNode;
  isResetField?: boolean;
  judgeData: IPersonnelDataTable[];
}

function MultipleJudges({ errorMessage, isResetField, judgeData }: IProps) {
  const [fieldJudges, setFieldJudges] = useState([1]);
  const [enteredValue, setEnteredValue] = useState<string[]>([""]);
  const [judges, setJudges] = useState<IPersonnelDataTable[]>([]);

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
    setFieldJudges((prev) => [...prev, prev.length + 1]);
    setEnteredValue((prev) => [...prev, ""]);
  }

  useEffect(() => {
    if (isResetField) {
      setEnteredValue([]);
      setFieldJudges([1]);
    }
  }, [isResetField]);

  useEffect(() => {
    setJudges(() =>
      judgeData.filter((item) => item.role_name.toLowerCase() === "hakim")
    );
  }, [judgeData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredValues = enteredValue.filter((value) => value !== "");

      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          judges: filteredValues || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          judges: filteredValues || "",
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  return (
    <>
      {fieldJudges.map((item, index) => (
        <Label
          key={item}
          labelType="form-control"
          leftLabel={`Hakim ${index + 1}`}
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
              {" "}
              Pilih satu
            </option>
            {judges.map((item: IPersonnelDataTable) => (
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
          disabled: judges.length === 1,
        }}
      >
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
        Tambah
      </Button>
    </>
  );
}

export default memo(MultipleJudges);
