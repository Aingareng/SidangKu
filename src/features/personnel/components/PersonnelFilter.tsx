import { ChangeEvent, useState } from "react";
import TableFilter, {
  FilterValues,
} from "../../../shared/components/organisms/TableFilter";

interface IProps {
  filterResults: (result: FilterValues) => void;
}

export default function PersonnelFilter({ filterResults }: IProps) {
  const [enteredValues, setEnteredValues] = useState<FilterValues>({
    search: "",
    select: "",
  });

  function handleSubmitFilter(filterValues: FilterValues) {
    filterResults(filterValues);
  }
  return (
    <TableFilter
      className="grid grid-cols-3 gap-2 items-end"
      onSubmit={handleSubmitFilter}
      searchInput={{
        useSearchInput: true,
        label: "Cari Pihak",
        placeholder: "Cth : John Doe",
        value: enteredValues.search as string,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          setEnteredValues((prev) => {
            return {
              ...prev,
              search: event.target.value,
            };
          });
        },
      }}
      selectInput={{
        useSelectInput: true,
        label: "Jabatan",
        options: [
          { label: "Pilih Jabaran/Peran", value: "" },
          { label: "Hakim", value: "1" },
          { label: "Panitera", value: "2" },
          { label: "Panitera Pengganti", value: "3" },
          { label: "Jaksa", value: "4" },
          { label: "Pengacara", value: "5" },
          { label: "Penggugat", value: "6" },
          { label: "Tergugat", value: "7" },
          { label: "Saksi", value: "8" },
        ],
        value: enteredValues.select as string,
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {
          setEnteredValues((prev) => {
            return {
              ...prev,
              select: event.target.value == "0" ? "" : event.target.value,
            };
          });
        },
      }}
    />
  );
}
