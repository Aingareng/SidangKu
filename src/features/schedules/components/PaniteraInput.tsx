import { ChangeEvent, useEffect, useState } from "react";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";
import Label from "../../../shared/components/atoms/Label";
import Select from "../../../shared/components/atoms/Select";

export default function PaniteraInput() {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [personnals] = useLocalStorage("personnels", []);
  function handleSelectInputChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    setEnteredValue(value);
  }

  const registrars = personnals.filter(
    (item: IPersonnelDataTable) =>
      item.role_name.toLowerCase() === "panitera" ||
      item.role_name.toLowerCase() === "panitera pengganti"
  );

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
    <Label labelType="form-control" leftLabel="Panitera">
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
          <option key={index + 1} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
    </Label>
  );
}
