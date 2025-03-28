import { useActionState, useCallback } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Form from "../molecules/Form";
import Select from "../atoms/Select";
import Button from "../atoms/Button";

interface TextInputProps {
  useSearchInput: boolean;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface SelectInputProps {
  useSelectInput: boolean;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
interface PeriodInputProps {
  usePeriodInput: boolean;
  label: string;
  startDate: string;
  endDate: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FilterValues {
  search?: string;
  select?: string;
  startDate?: string;
  endDate?: string;
}
interface IProps {
  className?: string;
  searchInput?: TextInputProps;
  selectInput?: SelectInputProps;
  periodInput?: PeriodInputProps;
  onSubmit?: (submitValue: FilterValues) => void;
}

export default function TableFilter({
  className,
  searchInput,
  selectInput,
  periodInput,
  onSubmit,
}: IProps) {
  const handleApplyFilter = useCallback(() => {
    if (!onSubmit) return;

    const filterValues: FilterValues = {};

    if (searchInput?.useSearchInput) {
      filterValues.search = searchInput.value;
    }
    if (selectInput?.useSelectInput) {
      filterValues.select = selectInput.value;
    }
    if (periodInput?.usePeriodInput) {
      filterValues.startDate = periodInput.startDate;
      filterValues.endDate = periodInput.endDate;
    }

    onSubmit(filterValues);
  }, [onSubmit, searchInput, selectInput, periodInput]);

  const [, formAction] = useActionState(handleApplyFilter, null);

  return (
    <Form
      attributes={{
        className: className as string,
        action: formAction,
      }}
    >
      {searchInput?.useSearchInput && (
        <Label labelType="form-control" leftLabel={searchInput.label}>
          <Input
            attributes={{
              className: "input input-bordered w-full max-w-xs",
              type: "search",
              name: "search",
              placeholder: searchInput.placeholder,
              value: searchInput.value,
              onChange: searchInput.onChange,
            }}
          />
        </Label>
      )}

      {/* Select Input */}
      {selectInput?.useSelectInput && (
        <Label labelType="form-control" leftLabel={selectInput.label}>
          <Select
            attr={{
              className: "select select-bordered w-full max-w-xs",
              name: "selectInput",
              value: selectInput.value,
              onChange: selectInput.onChange,
            }}
          >
            {selectInput.options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.value === "" || opt.value == "0"}
              >
                {opt.label}
              </option>
            ))}
          </Select>
        </Label>
      )}

      {/* Period (Date Range) Input */}
      {periodInput?.usePeriodInput && (
        <div className="flex flex-col gap-2 ">
          <Label labelType="form-control" leftLabel={periodInput.label}>
            <div className="flex gap-2">
              <Input
                attributes={{
                  className: "input input-bordered w-full max-w-xs",
                  type: "date",
                  name: "startDate",
                  value: periodInput.startDate,
                  onChange: periodInput.onChange,
                }}
              />
              <Input
                attributes={{
                  className: "input input-bordered w-full max-w-xs",
                  type: "date",
                  name: "endDate",
                  value: periodInput.endDate,
                  onChange: periodInput.onChange,
                }}
              />
            </div>
          </Label>
        </div>
      )}

      <Button
        attributes={{
          type: "submit",
          className: "btn btn-primary w-max  ml-3",
        }}
      >
        Apply
      </Button>
    </Form>
  );
}
