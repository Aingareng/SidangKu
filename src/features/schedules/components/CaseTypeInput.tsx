import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";
import Label from "../../../shared/components/atoms/Label";
import Select from "../../../shared/components/atoms/Select";

interface IProps {
  errorMessage?: ReactNode;
  isResetField?: boolean;
  onSendValue: (value: "perdata" | "pidana") => void;
}

export default function CaseTypeInput({
  errorMessage,
  isResetField,
  onSendValue,
}: IProps) {
  const [enteredValue, setEnteredValue] = useState<string>("perdata");
  function handleSelectInputChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    setEnteredValue(value);
  }

  // const [registrars, setRegistrars] = useState<IPersonnelDataTable[]>([]);

  useEffect(() => {
    if (isResetField) {
      setEnteredValue("");
    }
  }, [isResetField]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const existKey = localStorageUtils.has("newSchedule");

      onSendValue(enteredValue as "perdata" | "pidana");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          case_type: enteredValue || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          case_type: enteredValue || "",
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredValue]);

  return (
    <Label
      labelType="form-control"
      leftLabel="Tipe Perkara"
      bottomLeftLabel={errorMessage}
    >
      <Select
        attr={{
          className: `select select-bordered w-full ${
            errorMessage ? "select-error" : ""
          }`,
          name: "case_type",
          value: enteredValue || "",
          onChange: (e) => handleSelectInputChange(e),
        }}
      >
        {/* <option value="" disabled>
          {" "}
          Pilih satu
        </option> */}
        <option value="perdata">Perdata</option>
        <option value="pidana">Pidana</option>
      </Select>
    </Label>
  );
}
