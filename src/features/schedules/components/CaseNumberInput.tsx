import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";

interface IProps {
  errorMessage?: ReactNode;
  initialValue?: string;
  isResetField?: boolean;
}

export default function CaseNumberInput({
  errorMessage,
  initialValue,
  isResetField,
}: IProps) {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue || "");
  function handleTextInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setEnteredValue(value);
  }

  useEffect(() => {
    if (isResetField) {
      setEnteredValue("");
    }
  }, [isResetField]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          case_number: enteredValue || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          case_number: enteredValue || "",
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
      leftLabel="Nomor Perkara"
      bottomLeftLabel={errorMessage}
    >
      <Input
        attributes={{
          type: "text",
          name: "case_number",
          className: `input input-bordered w-full ${errorMessage ? "input-error" : ""}`,
          placeholder: "Cth : 123/Pdt.G/2025/PN Lbo",
          value: enteredValue || "",
          onChange: handleTextInputChange,
        }}
      />
    </Label>
  );
}
