import {
  ChangeEvent,
  ForwardedRef,
  useActionState,
  useCallback,
  useState,
} from "react";
import {
  ButtonAttributes,
  FormAttributes,
} from "../../../shared/libs/elementAttributes";
import Form from "../../../shared/components/molecules/Form";
import Modal from "../../../shared/components/organisms/Modal";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";
import MultipleAgenda from "./MultipleAgenda";
import { log } from "../../../shared/utils/log";
import MultiplePlaintiff from "./MultiplePlaintiff";
import MultipleDefendant from "./MultipleDefendant";
import MultipleJudges from "./MultipleJudges";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
}

export default function CreateSchedules({ ref }: IProps) {
  log("<CreateSchedules/>", 2);
  ButtonAttributes.type = "submit";

  const [formData, setFormData] = useState<Record<string, unknown>>({});

  function handleTextInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSetAgenda = useCallback((value: string[]) => {
    console.log("🚀 ~ handleSetAgenda ~ value:", value);

    setFormData((prev) => {
      return {
        ...prev,
        agenda: value,
      };
    });
  }, []);

  const handleSetPlaintiff = useCallback((value: string[]) => {
    console.log("🚀 ~ handleSetPlaintiff ~ value:", value);
    setFormData((prev) => {
      return {
        ...prev,
        plaintiff: value,
      };
    });
  }, []);

  const handleSetDefendant = useCallback((value: string[]) => {
    setFormData((prev) => {
      return {
        ...prev,
        defendant: value,
      };
    });
  }, []);

  const handleSetJudges = useCallback((value: string[]) => {
    setFormData((prev) => {
      return {
        ...prev,
        judges: value,
      };
    });
  }, []);

  function handleAddSchedule() {
    console.log(formData);
  }

  const [, formAction] = useActionState(handleAddSchedule, null);

  FormAttributes.action = formAction;

  return (
    <Modal ref={ref}>
      {/* w-8/12  */}
      <div className="grid grid-cols-1 gap-4  w-full ">
        <h1 className="text-2xl font-bold text-center">Tambah Jadwal</h1>
        <Form attributes={FormAttributes}>
          <main className="grid grid-cols-1 gap-3">
            <Label labelType="form-control" leftLabel="Nomor Perkara">
              <Input
                attributes={{
                  type: "text",
                  name: "case-number",
                  placeholder: "Cth : 123/Pdt.G/2025/PN Lbo",
                  className: "input input-bordered w-full",
                  defaultValue: formData["case-number"] as string,
                  onChange: (e) => handleTextInputChange(e),
                }}
              />
            </Label>
            <Label labelType="form-control" leftLabel="Panitera">
              <Input
                attributes={{
                  type: "text",
                  name: "registrar",
                  placeholder: "Masukan Nama Panitera",
                  className: "input input-bordered w-full",
                  defaultValue: formData["registrar"] as string,
                  onChange: (e) => handleTextInputChange(e),
                }}
              />
            </Label>
            <MultipleAgenda onSendAgenda={handleSetAgenda} />
            <MultiplePlaintiff onSendPlaintiff={handleSetPlaintiff} />
            <MultipleDefendant onSendDefendant={handleSetDefendant} />
            <MultipleJudges onSendJudges={handleSetJudges} />
          </main>
          <footer className="flex items-center justify-end">
            <Button attributes={ButtonAttributes}>Tentukan</Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
