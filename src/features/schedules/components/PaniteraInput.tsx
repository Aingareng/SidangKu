import { ChangeEvent, ReactNode, useEffect, useState } from "react";
// import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";
import Label from "../../../shared/components/atoms/Label";
import Select from "../../../shared/components/atoms/Select";

interface IProps {
  errorMessage?: ReactNode;
  isResetField?: boolean;
  registrarData: IPersonnelDataTable[];
}

export default function PaniteraInput({
  errorMessage,
  isResetField,
  registrarData,
}: IProps) {
  const [enteredValue, setEnteredValue] = useState<string>("");
  function handleSelectInputChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    setEnteredValue(value);
  }

  const [registrars, setRegistrars] = useState<IPersonnelDataTable[]>([]);

  useEffect(() => {
    if (isResetField) {
      setEnteredValue("");
    }
  }, [isResetField]);

  useEffect(() => {
    setRegistrars(() =>
      registrarData.filter(
        (item: IPersonnelDataTable) =>
          item.role_name.toLowerCase().replace(/\s+/g, "") ===
          "paniterapengganti"
      )
    );
  }, [registrarData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const existKey = localStorageUtils.has("newSchedule");

      if (existKey) {
        const data = localStorageUtils.get<ISchedulePayload>("newSchedule");
        localStorageUtils.set("newSchedule", {
          ...data,
          registrar: enteredValue || "",
        });
      } else {
        localStorageUtils.set("newSchedule", {
          registrar: enteredValue || "",
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
      leftLabel="Panitera Pengganti"
      bottomLeftLabel={errorMessage}
    >
      <Select
        attr={{
          className: "select select-bordered w-full",
          value: enteredValue || "",
          onChange: (e) => handleSelectInputChange(e),
        }}
      >
        <option value="" disabled>
          {" "}
          Pilih satu
        </option>
        {registrars.map((item: IPersonnelDataTable, index: number) => (
          <option key={index + 1} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </Label>
  );
}
