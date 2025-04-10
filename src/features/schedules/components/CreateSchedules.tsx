import { ForwardedRef, useState } from "react";
import { ButtonAttributes } from "../../../shared/libs/elementAttributes";
import Form from "../../../shared/components/molecules/Form";
import Modal from "../../../shared/components/organisms/Modal";
import Button from "../../../shared/components/atoms/Button";
import MultipleAgenda from "./MultipleAgenda";
import MultiplePlaintiff from "./MultiplePlaintiff";
import localStorageUtils from "../../../shared/utils/localStorage";
import { ISchedulePayload } from "../types/schedules";
import MultipleDefendant from "./MultipleDefendant";
import MultipleJudges from "./MultipleJudges";
import CaseNumberInput from "./CaseNumberInput";
import PaniteraInput from "./PaniteraInput";
import useSchedules from "../hooks/useSchedules";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
}

interface IValidationErrors {
  case_number?: string;
  plaintiff?: string;
  defendant?: string;
  case_detail?: string;
  judges?: string;
  registrar?: string;
}

export default function CreateSchedules({ ref }: IProps) {
  ButtonAttributes.type = "submit";
  const { createSchedule } = useSchedules();
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>(
    {}
  );

  function validateForm(data: ISchedulePayload): boolean {
    const errors: IValidationErrors = {};

    if (!data.case_number?.trim()) {
      errors.case_number = "Nomor perkara wajib diisi";
    }

    if (!data.plaintiff?.length || data.plaintiff.some((p) => !p.trim())) {
      errors.plaintiff = "Minimal harus ada 1 penggugat";
    }

    if (!data.defendant?.length || data.defendant.some((d) => !d.trim())) {
      errors.defendant = "Minimal harus ada 1 tergugat";
    }

    if (!data.case_detail?.length || data.case_detail.some((c) => !c.trim())) {
      errors.case_detail = "Minimal harus ada 1 detail perkara";
    }

    if (!data.judges?.length || data.judges.some((j) => !j.trim())) {
      errors.judges = "Minimal harus ada 1 hakim";
    }

    if (!data.registrar?.trim()) {
      errors.registrar = "Nama panitera wajib diisi";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleAddSchedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = localStorageUtils.get<ISchedulePayload>("newSchedule");

    if (!data) {
      console.error("No schedule data found in localStorage.");
      return;
    }
    if (!validateForm(data)) {
      return;
    }

    createSchedule(data);
  }

  function ErrorMessageRendered(message: string) {
    return (
      <div className="label">
        <span className="label-text-alt text-error">{message}</span>
      </div>
    );
  }

  return (
    <Modal ref={ref}>
      {/* w-8/12  */}
      <div className="grid grid-cols-1 gap-4  w-full ">
        <h1 className="text-2xl font-bold text-center">Tambah Jadwal</h1>
        <Form attributes={{ onSubmit: (e) => handleAddSchedule(e) }}>
          <main className="grid grid-cols-1 gap-3">
            <CaseNumberInput
              errorMessage={
                validationErrors.case_number &&
                ErrorMessageRendered(validationErrors.case_number)
              }
            />
            <PaniteraInput
              errorMessage={
                validationErrors.registrar &&
                ErrorMessageRendered(validationErrors.registrar)
              }
            />
            <MultipleAgenda
              errorMessage={
                validationErrors.case_detail &&
                ErrorMessageRendered(validationErrors.case_detail)
              }
            />
            <MultiplePlaintiff
              errorMessage={
                validationErrors.plaintiff &&
                ErrorMessageRendered(validationErrors.plaintiff)
              }
            />
            <MultipleDefendant
              errorMessage={
                validationErrors.defendant &&
                ErrorMessageRendered(validationErrors.defendant)
              }
            />
            <MultipleJudges
              errorMessage={
                validationErrors.judges &&
                ErrorMessageRendered(validationErrors.judges)
              }
            />
          </main>
          <footer className="flex items-center justify-end mt-3">
            <Button attributes={ButtonAttributes}>Tentukan</Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
