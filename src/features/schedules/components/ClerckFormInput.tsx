import {
  ChangeEvent,
  FormEvent,
  ForwardedRef,
  useEffect,
  useState,
} from "react";
import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Select from "../../../shared/components/atoms/Select";
import usePersonnel from "../../personnel/hooks/usePersonnel";
import { IPersonnelDataTable } from "../../personnel/types/personnel";
import Button from "../../../shared/components/atoms/Button";
import useSchedules from "../hooks/useSchedules";
import { useToast } from "../../../shared/hooks/useToast";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
  schedule_id: number;
}

export default function ClerckFormInput({ ref, schedule_id }: IProps) {
  const { personnels } = usePersonnel();
  const { updateClerck } = useSchedules();
  const modalRef = ref as React.RefObject<HTMLDialogElement>;
  const { Toast, showToast } = useToast();

  const clecks = personnels?.filter((person) => +person.role_id === 3);
  const [enteredValue, setEnteredValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const modalElement = modalRef.current;

    function handleClose() {
      setEnteredValue("");
      setErrorMessage(null);
    }

    setErrorMessage(null);

    modalElement.addEventListener("close", handleClose);

    return () => {
      modalElement.removeEventListener("close", handleClose);
    };
  }, [modalRef]);

  async function handleSetClerk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const result = await updateClerck({ schedule_id, user_id: +enteredValue });
    setLoading(false);
    if (result.status !== 201) {
      setErrorMessage(result.message);
      return;
    }

    showToast({
      type: "success",
      message: "Berhasil pilih panitera pengganti",
    });

    setTimeout(() => {
      modalRef.current.close();
    }, 1000);
  }

  function handleSelectInputChange(event: ChangeEvent<HTMLSelectElement>) {
    setEnteredValue(event.target.value);
  }
  return (
    <Modal ref={ref}>
      <Toast />
      <div className="grid grid-cols-1 gap-4  w-8/12">
        <h1 className="text-2xl font-bold text-center">
          Tetapkan Panitera Pengganti
        </h1>
        <Form
          attributes={{
            onSubmit: (e) => handleSetClerk(e),
            className: "grid grid-cols-1 gap-4",
          }}
        >
          <main>
            <Label
              labelType="form-control"
              leftLabel="Panitera Pengganti"
              bottomLeftLabel={
                errorMessage && (
                  <span className="text-red-500 text-sm">{errorMessage}</span>
                )
              }
            >
              <Select
                attr={{
                  className: `select select-bordered w-full ${
                    errorMessage ? "select-error" : ""
                  } `,
                  name: "registrar",
                  value: enteredValue,
                  onChange: (e) => handleSelectInputChange(e),
                  required: true,
                }}
              >
                <option value="" disabled>
                  {" "}
                  Pilih satu
                </option>
                {clecks?.map((item: IPersonnelDataTable, index: number) => (
                  <option key={index + 1} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Label>
          </main>
          <footer className="flex items-center justify-end">
            <Button
              attributes={{
                type: "submit",
                className: "btn btn-active btn-primary",
                disabled: isLoading,
              }}
            >
              {isLoading ? "Mengirim.." : "Tentukan"}
            </Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
