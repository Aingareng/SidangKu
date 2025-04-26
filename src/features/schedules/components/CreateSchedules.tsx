import { ForwardedRef, useCallback, useState } from "react";
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
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import CaseTypeInput from "./CaseTypeInput";
import MultiplePreached from "./MultiplePreached";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  onClose?: () => void;
  personnelData: IPersonnelDataTable[];
  onSendingStatus?: (statusCode: number | undefined) => void;
}

interface IValidationErrors {
  case_number?: string;
  plaintiff?: string;
  defendant?: string;
  case_detail?: string;
  judges?: string;
  registrar?: string;
  case_type?: string;
  preached?: string;
}

export default function CreateSchedules({
  ref,
  onClose,
  personnelData,
  onSendingStatus,
}: IProps) {
  const { createSchedule } = useSchedules();
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>(
    {}
  );
  const [sendingStatus, setSendingStatus] = useState({
    isPending: false,
    isError: false,
  });

  const [resetFormValue, setResetFormValue] = useState<{
    case_number: boolean;
    registrar: boolean;
    multipleAgenda: boolean;
    multiplePlaintiff: boolean;
    multipleJudge: boolean;
    multipleDefendant: boolean;
    case_type: boolean;
    multiplePreached: boolean;
  }>();
  const [isPerdataCase, setIsPerdatacase] = useState<boolean>(false);

  function validateForm(data: ISchedulePayload): boolean {
    const errors: IValidationErrors = {};

    if (!data.case_number?.trim()) {
      errors.case_number = "Nomor perkara wajib diisi";
    }

    if (!data.case_type.trim()) {
      errors.case_type = "Tipe perkara wajib diisi";
    }

    if (!isPerdataCase) {
      if (!data.preacheds.length || data.preacheds.some((p) => !p.trim())) {
        errors.preached = "Minimal harus ada 1 Terdakwah";
      }
    } else {
      if (!data.plaintiffs?.length || data.plaintiffs.some((p) => !p.trim())) {
        errors.plaintiff = "Minimal harus ada 1 penggugat";
      }

      if (!data.defendants?.length || data.defendants.some((d) => !d.trim())) {
        errors.defendant = "Minimal harus ada 1 tergugat";
      }
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

  async function handleAddSchedule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = localStorageUtils.get<ISchedulePayload>("newSchedule");

    if (!data) {
      console.error("No schedule data found in localStorage.");
      return;
    }
    if (!validateForm(data)) {
      return;
    }

    setSendingStatus((prev) => ({ ...prev, isPending: true }));

    const result = await createSchedule(data);

    if (result?.status === 201) {
      onSendingStatus?.(result.status);
      setSendingStatus((prev) => ({ ...prev, isPending: false }));
      resetForm();
      onClose?.();
    } else {
      onSendingStatus?.(result?.status as number);
      resetForm();
      onClose?.();
      setSendingStatus(() => ({ isError: true, isPending: false }));
    }

    setTimeout(() => {
      onSendingStatus?.(undefined);
      setIsPerdatacase(true);
    }, 3000);
  }

  function ErrorMessageRendered(message: string) {
    return (
      <div className="label">
        <span className="label-text-alt text-error">{message}</span>
      </div>
    );
  }

  function resetForm() {
    setResetFormValue({
      case_number: true,
      registrar: true,
      multipleAgenda: true,
      multipleDefendant: true,
      multipleJudge: true,
      multiplePlaintiff: true,
      case_type: true,
      multiplePreached: true,
    });
  }

  const handleCaseTypeInput = useCallback((value: "perdata" | "pidana") => {
    if (value === "perdata") {
      setIsPerdatacase(true);
    } else {
      setIsPerdatacase(false);
    }
  }, []);

  return (
    <Modal ref={ref}>
      {/* w-8/12  */}
      <div className="grid grid-cols-1 gap-4  w-full ">
        <h1 className="text-2xl font-bold text-center">Tambah Jadwal</h1>
        <Form attributes={{ onSubmit: (e) => handleAddSchedule(e) }}>
          <main className="grid grid-cols-1 gap-3">
            <CaseNumberInput
              isResetField={resetFormValue?.case_number}
              errorMessage={
                validationErrors.case_number &&
                ErrorMessageRendered(validationErrors.case_number)
              }
            />
            <CaseTypeInput
              isResetField={resetFormValue?.case_type}
              errorMessage={
                validationErrors.case_type &&
                ErrorMessageRendered(validationErrors.case_type)
              }
              onSendValue={handleCaseTypeInput}
            />
            <PaniteraInput
              registrarData={personnelData}
              isResetField={resetFormValue?.registrar}
              errorMessage={
                validationErrors.registrar &&
                ErrorMessageRendered(validationErrors.registrar)
              }
            />
            <MultipleAgenda
              isResetField={resetFormValue?.multipleAgenda}
              errorMessage={
                validationErrors.case_detail &&
                ErrorMessageRendered(validationErrors.case_detail)
              }
            />
            {!isPerdataCase && (
              <MultiplePreached
                preachedData={personnelData}
                isResetField={resetFormValue?.multiplePreached}
                errorMessage={
                  validationErrors.preached &&
                  ErrorMessageRendered(validationErrors.preached)
                }
              />
            )}
            {isPerdataCase && (
              <>
                <MultiplePlaintiff
                  plaintiffData={personnelData}
                  isResetField={resetFormValue?.multiplePlaintiff}
                  errorMessage={
                    validationErrors.plaintiff &&
                    ErrorMessageRendered(validationErrors.plaintiff)
                  }
                />
                <MultipleDefendant
                  defendantData={personnelData}
                  isResetField={resetFormValue?.multipleDefendant}
                  errorMessage={
                    validationErrors.defendant &&
                    ErrorMessageRendered(validationErrors.defendant)
                  }
                />
              </>
            )}
            <MultipleJudges
              judgeData={personnelData}
              isResetField={resetFormValue?.multipleJudge}
              errorMessage={
                validationErrors.judges &&
                ErrorMessageRendered(validationErrors.judges)
              }
            />
          </main>
          <footer className="flex items-center justify-end mt-3">
            <Button
              attributes={{
                type: "submit",
                className: "btn btn-primary",
                disabled: sendingStatus.isPending,
              }}
            >
              {sendingStatus.isPending ? "Sedang mengirim..." : "Tentukan"}
            </Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
